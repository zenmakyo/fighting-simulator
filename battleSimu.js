/**
 * 画面から戦闘に必要な全データを読み取る
 */
function fetchBattleContext() {
    // 1. 敵データの読み取り
    const enemy = {
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
