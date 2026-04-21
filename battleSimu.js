/**
 * 画面から戦闘に必要な全データを読み取る
 */
function fetchBattleContext() {
    // 1. 敵データの読み取り
    const enemy = {
        name: document.getElementById("targetSelectBtn").textContent.trim(),
        element: document.getElementById("e-attribute").value,
        sta: parseInt(document.getElementById("e-sta").value) || 0,
        atk: parseInt(document.getElementById("e-atk").value) || 0,
        def: parseInt(document.getElementById("e-def").value) || 0,
        ability: document.getElementById("e-ability").value
    };

    // 2. 参加幻獣データの読み取り
    const participants = [];
    for (let i = 1; i <= 4; i++) {
        const isJoined = document.getElementById(`join-${i}`).checked;
        if (!isJoined) continue;

        // 計算済みステータス(res-系)をテキストから取得
        participants.push({
            id: i,
            name: document.getElementById(`input-name-${i}`).value || `幻獣${i}`,
            element: document.getElementById(`res-element-${i}`).textContent,
            sta: parseInt(document.getElementById(`res-sta-${i}`).textContent) || 0,
            atk: parseInt(document.getElementById(`res-atk-${i}`).textContent) || 0,
            def: parseInt(document.getElementById(`res-def-${i}`).textContent) || 0,
            luck: parseInt(document.getElementById(`res-luck-${i}`).textContent) || 0,
            
            // 武器情報（アビリティ判定用）
            weaponName: document.getElementById(`select-weapon-${i}`).textContent.trim(),
            weaponPlus: parseInt(document.getElementById(`plus-weapon-${i}`).value) || 0,
            weaponAbi: document.getElementById(`select-w-abi-${i}`).textContent.trim()
        });
    }

    if (participants.length === 0) {
        alert("参加幻獣にチェックを入れてください");
        return null;
    }

    return { enemy, participants };
}

/**
 * シミュレーション実行メイン（1回 / 100回 / 1000回 共通）
 */
function startSimulation(count) {
    const context = fetchBattleContext();
    if (!context) return;

    if (count === 1) {
        // 1回討伐ロジック（ログ詳細表示）
        executeSingleBattle(context);
    } else {
        // 複数回討伐ロジック（統計のみ）
        executeMultiBattle(context, count);
    }
}

function executeSingleBattle(context) {
    console.log("戦闘開始データ:", context);
    // ここにこの後「ダメージ計算」「アビリティ発動」のロジックを書いていきます
}

/**
 * 戦闘用のフィールド（状態）を作成する
 */
function createBattleField(context) {
    return {
        //  味方チームの構築
        allies: context.participants.map(p => {
            
            //  アビリティ定義の紐付け
            const abiDef = WEAPON_ABILITY_DEFS[p.weaponAbi] || WEAPON_ABILITY_DEFS["なし"];
            
            return {
                id: p.id,
                element: p.element,

                //  変動ステータスと固定ステータスの保持
                currentSta: p.sta,  // 戦闘中に減っていく現在のスタミナ
                maxSta: p.sta,      // 最大スタミナ
                currentAtk: p.atk,  // バフで増減する現在のアタック
                baseAtk: p.atk,     // 元のアタック
                currentDef: p.def,  // 増減するディフェンス
                baseDef: p.def,     // 元のディフェンス
                luck: p.luck,

                // ④ アビリティ情報のパッケージ化
                ability: {
                    name: p.weaponAbi,
                    power: abiDef.power,
                    type: abiDef.type
                },

                // ⑤ 生存フラグ
                isAlive: true
            };
        }),

        // ⑥ 敵の状態構築
        enemy: {
            element: context.enemy.element,
            currentSta: context.enemy.sta,
            maxSta: context.enemy.sta,
            atk: context.enemy.atk,
            def: context.enemy.def,
            isAlive: true
        },

        // ⑦ 進行管理データ
        turn: 1,
        logs: []
    };
}
