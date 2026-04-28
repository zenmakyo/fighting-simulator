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

        const wName = document.getElementById(`select-weapon-${i}`).textContent.trim();
        const wData = weaponList.find(w => w.name === wName) || { grade: 0, ability: "なし" };

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
            weaponName: wName,
            weaponGrade: wData.grade,
            weaponBaseAbi: wData.ability,
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
    if (typeof updateTotalStats === "function") {
        updateTotalStats(); 
    } else {
        console.warn("updateTotalStats関数が見つかりません。ステータス計算ロジックを確認してください。");
    }
    
    const context = fetchBattleContext();
    if (!context) return;

    const logContainer = document.getElementById("battle-log");
    let lastBattleWin = false; 

    for (let i = 0; i < count; i++) {
        const isLastRun = (i === count - 1);
        if (isLastRun) {
            logContainer.innerHTML = ""; 
        }

        // 複数回実行時も、毎回ランダム性を出したい場合はここでも再計算が必要
        // 1000回中、毎回「浪漫」の数値を変えたいならループ内でupdateTotalStats()とfetchBattleContext()を回す
        let currentContext = context;
        if (count > 1) {
            updateTotalStats();
            currentContext = fetchBattleContext();
        }

        const result = executeSingleBattle(currentContext, isLastRun); 
        
        if (result.win) {
            totalWins++;
        } else {
            totalLosses++;
        }
        totalTurns += result.turns;
        allTurnHistory.push(result.turns);
        
        lastBattleWin = result.win;
    }

    updateStatsUI(lastBattleWin);
}


/**
 * 戦闘用のフィールド（状態）を作成する
 */
function createBattleField(context) {
    return {
        //  味方チームの構築
        allies: context.participants.map(p => {
            
            //  アビリティ定義の紐付け
            const abiList = [p.weaponBaseAbi, p.weaponAbi]
                .filter(name => name && name !== "なし") // "なし"を除外
                .map(name => {
                    const spec = ABILITY_SPECS[name] || { baseRate: 0, execute: () => {} };
                    return {
                        name: name,
                        baseRate: spec.baseRate,
                        execute: spec.execute
            };
        });
            return {
                id: p.id,
                name: p.name,
                element: p.element,

                //  変動ステータスと固定ステータスの保持
                currentSta: p.sta,  // 戦闘中に減っていく現在のスタミナ
                maxSta: p.sta,      // 最大スタミナ
                currentAtk: p.atk,  // バフで増減する現在のアタック
                baseAtk: p.atk,     // 元のアタック
                currentDef: p.def,  // 増減するディフェンス
                baseDef: p.def,     // 元のディフェンス
                luck: p.luck,

                weaponPlus: p.weaponPlus,
                weaponGrade: p.weaponGrade,

                // ④ アビリティ情報のパッケージ化
                abilities: abiList,

                // ⑤ 生存フラグ
                isAlive: true,

                // 攻撃ごとにリセットする補正用プロパティ
                tempAtkModifier: 1.0,
                damageTakenModifier: 1.0,
                isIsseiActivated: false, // 一斉などのフラグ用
                isWazokuActivated: false // 和属などのフラグ用
            };
        }),

        // ⑥ 敵の状態構築
        enemy: {
            name: context.enemy.name,
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

/**
 * 最終的な発動確率を算出する
 * @param {number} baseRate - 武器アビリティの基礎発動率 (例: 0.15)
 * @param {Object} attacker - 幻獣（攻撃者）のデータ
 * @returns {number} 0.0〜1.0 の確率
 */
function calcFinalRate(baseRate, attacker) {
    // 1. Luck加算：luck × 0.05% (上限25%)
    let luckAdd = (attacker.luck * 0.05) / 100;
    if (luckAdd > 0.25) luckAdd = 0.25;

    // 2. 強化値加算：10未満は0%、10〜20は[7+(強化値-10)×1.8]%
    let plusAdd = 0;
    const plus = Math.min(attacker.weaponPlus, 20); // max 20
    if (plus >= 10) {
        plusAdd = (7 + (plus - 10) * 1.8) / 100;
    }

    // 3. 武器グレード加算：グレード(1~10) × 1.2%
    const gradeAdd = (attacker.weaponGrade * 1.2) / 100;

    // 合計
    return baseRate + luckAdd + plusAdd + gradeAdd;
}

/**
 * 1回分の戦闘シミュレーションを実行
 */
function executeSingleBattle(context) {
    const field = createBattleField(context);
    
    // 1. 最大ターンの決定
    let maxTurn = 16;
    if (field.allies.length === 3) maxTurn = 18;
    if (field.allies.length === 4) maxTurn = 20;

    // 2. メインループ（ターン進行）
    while (field.turn <= maxTurn && field.enemy.isAlive) {
        // 各幻獣が順番に攻撃
        for (let i = 0; i < field.allies.length; i++) {
            const attacker = field.allies[i];

            // 生きていない場合はスキップ
            if (!attacker.isAlive) continue;

            // このアクションの情報を一時保存するオブジェクト
            let logData = {
                allyAbi: null,
                enemyAbi: null,
                damageToEnemy: 0,
                damageToAlly: 0
            };

            // --- ここから 1ユニットの行動ステップ ---
            
            // ステップA: アビリティ発動判定
            logData.allyAbi = resolveAbilities(attacker, field.enemy, field);
            
            // ステップB: 行動分岐
            if (attacker.isIsseiActivated) {
                // 【一斉】
                logData.damageToEnemy = calculateIsseiDamage(field);
                attacker.isIsseiActivated = false; // フラグ消費

            } else if (attacker.isWazokuActivated) {
                // 【和属】
                logData.damageToEnemy = calculateWazokuDamage(attacker, field.enemy, field);
                attacker.isWazokuActivated = false; // フラグ消費

            } else {
                // 【通常攻撃】（一斉・和属以外のアビリティ効果、または不発時）
                logData.damageToEnemy = calculateDamage(attacker, field.enemy, field);
            }
            
            // ステップC: 敵の攻撃
            if (field.enemy.isAlive) {
            // 敵アビリティ判定
            const abiSpec = ENEMY_ABILITY_SPECS[field.enemy.ability];
            if (abiSpec && Math.random() < abiSpec.rate) {
                logData.enemyAbi = field.enemy.ability; // 発動したアビ名を保存
            }
    
            // 判定結果（logData.enemyAbi）を渡して計算
            logData.damageToAlly = calculateTakenDamage(field.enemy, attacker, field, logData.enemyAbi);
        }

            // ログ出力が有効な場合のみDOM操作を行う
            if (isLogEnabled) {
                appendActionLog(field.turn, attacker, field.enemy, logData);
            }

            if (!field.enemy.isAlive) break;
        }
        if (!field.enemy.isAlive) break;
        field.turn++;
    }

    return {
        win: !field.enemy.isAlive,
        turns: Math.min(field.turn, maxTurn)
    };
}

/**
 * アビリティの発動判定と実行
 */
function resolveAbilities(attacker, enemy, field) {
    // 1. 初期化：毎攻撃ごとにリセット
    attacker.tempAtkModifier = 1.0; 
    attacker.damageTakenModifier = 1.0; 
    enemy.tempAtkModifier = 1.0; 

    // 2. フィールド作成時に用意した abiList をループ
    for (const abi of attacker.abilities) {
        // 発動率を計算（abi.baseRate を使用）
        const finalRate = calcFinalRate(abi.baseRate, attacker);

        // 判定
        if (Math.random() < finalRate) {
            // 発動！
            abi.execute(attacker, enemy, field);
            
            return abi.name; // 1つ発動したら終了
        }
    }
    return null;
}

/**
 * 与ダメージ計算
 */
function calculateDamage(attacker, enemy, field) {
    // 1. 基礎ダメージ算出
    let damage = attacker.currentAtk - enemy.def;
    if (damage < 1) damage = 1;

    // 2. 属性相性補正
    const elementMod = ELEMENT_MODIFIERS[attacker.element]?.[enemy.element] || 1.0;
    damage = Math.ceil(damage * elementMod);

    // 3. アビリティ倍率補正
    // resolveAbilities でセットされた倍率を掛ける
    damage = Math.ceil(damage * attacker.tempAtkModifier);

    // 4. 101パターンの乱数補正 (1.000 〜 1.100)
    const randomMod = 1.0 + (Math.floor(Math.random() * 101) / 1000);
    damage = Math.ceil(damage * randomMod);

    // 5. 最終ダメージの適用
    enemy.currentSta -= damage;
    if (enemy.currentSta < 0) enemy.currentSta = 0;

    // 討伐判定
    if (enemy.currentSta <= 0) {
        enemy.isAlive = false;
    }

    return damage;
}

const ELEMENT_MODIFIERS = {
    "獣": { "獣": 1.0, "霊": 0.7, "魔": 1.4, "無": 1.0, "龍": 1.0, "地": 1.0 },
    "霊": { "獣": 1.4, "霊": 1.0, "魔": 0.7, "無": 1.0, "龍": 1.0, "地": 1.0 },
    "魔": { "獣": 0.7, "霊": 1.4, "魔": 1.0, "無": 1.0, "龍": 1.0, "地": 1.0 },
    "無": { "獣": 1.0, "霊": 1.0, "魔": 1.0, "無": 1.0, "龍": 0.7, "地": 1.4 },
    "龍": { "獣": 1.0, "霊": 1.0, "魔": 1.0, "無": 1.4, "龍": 1.0, "地": 0.7 },
    "地": { "獣": 1.0, "霊": 1.0, "魔": 1.0, "無": 0.7, "龍": 1.4, "地": 1.0 }
};

/**
 * 一斉攻撃のダメージ計算
 */
function calculateIsseiDamage(field) {
    let totalBaseDamage = 0;

    // 生存している味方全員の基礎ダメージを合算
    field.allies.forEach(ally => {
        if (!ally.isAlive) return;

        // (攻撃力 - 敵防御) ※0以下なら0
        let base = ally.currentAtk - field.enemy.def;
        if (base < 0) base = 0;

        // 属性相性補正
        const elementMod = ELEMENT_MODIFIERS[ally.element]?.[field.enemy.element] || 1.0;
        
        // 各幻獣の項で属性補正を掛けて合算
        totalBaseDamage += Math.ceil(base * elementMod);
    });

    // 最後に一括で乱数補正 (1.000 〜 1.100)
    const randomMod = 1.0 + (Math.floor(Math.random() * 101) / 1000);
    const finalDamage = Math.ceil(totalBaseDamage * randomMod);

    // ダメージ適用
    field.enemy.currentSta -= finalDamage;
    if (field.enemy.currentSta < 0) field.enemy.currentSta = 0;

    if (field.enemy.currentSta <= 0) {
        field.enemy.isAlive = false;
    }

    return finalDamage;
}

/**
 * 和属攻撃のダメージ計算
 */
function calculateWazokuDamage(attacker, enemy, field) {
    // 1. 基礎ダメージ: (自分の攻撃力 - 敵防御) ※0以下なら0
    let base = attacker.currentAtk - enemy.def;
    if (base < 0) base = 0;

    // 2. 各属性相性の掛け算 (生存している全幻獣分)
    let partyElementMultiplier = 1.0;
    field.allies.forEach(ally => {
        if (ally.isAlive) {
            const mod = ELEMENT_MODIFIERS[ally.element]?.[enemy.element] || 1.0;
            partyElementMultiplier *= mod;
        }
    });

    // 3. 和属発動幻獣（自分）の属性相性をもう一度掛ける
    const selfElementMod = ELEMENT_MODIFIERS[attacker.element]?.[enemy.element] || 1.0;

    // 4. 武器アビリティ倍率 (1.2固定)
    const weaponAbiMod = 1.2;

    // 5. 乱数補正 (1.000 〜 1.100)
    const randomMod = 1.0 + (Math.floor(Math.random() * 101) / 1000);

    // 全要素を乗算
    // 式：(A - D) × 1.2 × (全属性積) × 自分の属性相性 × 乱数
    let finalDamage = base * weaponAbiMod * partyElementMultiplier * selfElementMod * randomMod;
    
    // 小数点切り上げ
    finalDamage = Math.ceil(finalDamage);

    // ダメージ適用
    enemy.currentSta -= finalDamage;
    if (enemy.currentSta < 0) enemy.currentSta = 0;

    if (enemy.currentSta <= 0) {
        enemy.isAlive = false;
    }

    return finalDamage;
}

const ENEMY_ABILITY_SPECS = {
    "強打": {
        rate: 0.38,
        execute: (enemy, attacker) => {
            enemy.tempAtkModifier = 1.3;
        }
    },
    "高揚": {
        rate: 0.38,
        execute: (enemy) => {
            enemy.atk = Math.ceil(enemy.atk * 1.1);
        }
    },
    "粉砕": {
        rate: 0.18,
        execute: (enemy, attacker) => {
            attacker.currentDef = Math.floor(attacker.currentDef * 0.8);
        }
    }
};

/**
 * 被ダメージ計算（敵から味方への攻撃）
 */
function calculateTakenDamage(enemy, attacker, field, activatedAbiName) {
    // 敵の補正をリセット
    enemy.tempAtkModifier = 1.0; 

    // メインループで判定されたアビリティがあれば実行
    if (activatedAbiName) {
        const abiSpec = ENEMY_ABILITY_SPECS[activatedAbiName];
        if (abiSpec && abiSpec.execute) {
            abiSpec.execute(enemy, attacker);
        }
    }

    // 1. 基礎ダメージ: (敵ATK - 味方DEF)
    let base = enemy.atk - attacker.currentDef;
    if (base < 1) base = 1;

    // 2. 属性相性補正（敵 -> 味方）
    const elementMod = ELEMENT_MODIFIERS[enemy.element]?.[attacker.element] || 1.0;

    // 3. 101パターンの乱数補正 (1.000 〜 1.100)
    const randomMod = 1.0 + (Math.floor(Math.random() * 101) / 1000);

    // 4. 防御減衰補正: (1 - 味方DEF / 100,000)
    const defMitigation = 1 - (attacker.currentDef / 100000);

    // 全要素を乗算
    // 式：(基礎) × 敵アビ倍率 × 属性相性 × 乱数 × 防御減衰 × 味方の被ダメ軽減
    let damage = base * enemy.tempAtkModifier * elementMod * randomMod * defMitigation;
    
    // 味方側のアビリティによる軽減（猛突、突風など）
    damage *= attacker.damageTakenModifier;

    const finalDamage = Math.ceil(damage);

    // ダメージ適用
    attacker.currentSta -= finalDamage;
    if (attacker.currentSta < 0) attacker.currentSta = 0;

    // 生存判定
    if (attacker.currentSta <= 0) {
        attacker.isAlive = false;
    }

    return finalDamage;
}

/**
 * 1アクション分のログカードを生成して画面に追加
 */
function appendActionLog(turn, attacker, enemy, logData) {
    const logContainer = document.getElementById("battle-log");

    // 箱全体の枠組み
    const actionBox = document.createElement("div");
    actionBox.className = "action-box";
    actionBox.style = "display: flex; border-bottom: 1px solid #444; margin-bottom: 10px;";

    // 左側：ターン数
    const turnCol = document.createElement("div");
    turnCol.style = "width: 40px; border-right: 1px solid #444; padding: 5px; text-align: center; font-weight: bold;";
    turnCol.textContent = turn;

    // 右側：ログ詳細
    const contentCol = document.createElement("div");
    contentCol.style = "flex: 1; padding: 5px;";

    // --- 味方の攻撃セクション ---
    let offenseHtml = "";
    if (logData.allyAbi) offenseHtml += `<div>${attacker.name} の [${logData.allyAbi}] が発動！</div>`;
    offenseHtml += `<div>${attacker.name} の攻撃！</div>`;
    offenseHtml += `<div>${enemy.name} に ${logData.damageToEnemy} のダメージ！</div>`;
    offenseHtml += `<div style="text-align: right;">${enemy.name} の Stamina [ ${enemy.currentSta} / ${enemy.maxSta} ]</div>`;
    
    // --- 区切り線 ---
    const separator = `<div style="border-top: 1px dashed #666; margin: 5px 0;"></div>`;

    // --- 敵の反撃セクション ---
    let defenseHtml = "";
    if (enemy.isAlive) {
        if (logData.enemyAbi) defenseHtml += `<div>${enemy.name} の [${logData.enemyAbi}] が発動！</div>`;
        defenseHtml += `<div>${enemy.name} の攻撃！</div>`;
        defenseHtml += `<div>${attacker.name} に ${logData.damageToAlly} のダメージ！</div>`;
        defenseHtml += `<div style="text-align: right;">${attacker.name} の Stamina [ ${attacker.currentSta} / ${attacker.maxSta} ]</div>`;
    }

    contentCol.innerHTML = offenseHtml + separator + defenseHtml;
    
    actionBox.appendChild(turnCol);
    actionBox.appendChild(contentCol);
    logContainer.appendChild(actionBox);

    // 倒れた場合のログ（箱の外に出す）
    if (!enemy.isAlive) {
        appendDeathLog(`${enemy.name} は倒れた！`);
    } else if (!attacker.isAlive) {
        appendDeathLog(`${attacker.name} は倒れた！`);
    }
}

function appendDeathLog(message) {
    const logContainer = document.getElementById("battle-log");
    const deathDiv = document.createElement("div");
    deathDiv.style = "padding: 5px; color: #ff4444; border-bottom: 2px solid #800; font-weight: bold;";
    deathDiv.textContent = message;
    logContainer.appendChild(deathDiv);
}

// 累計データを保持する変数（リセットボタンを押すまで維持）
let totalWins = 0;
let totalLosses = 0;
let totalTurns = 0;
let allTurnHistory = [];

function startSimulation(count) {
    const logContainer = document.getElementById("battle-log");
    let lastBattleWin = false; // 最後の1回の勝敗を保持

    for (let i = 0; i < count; i++) {
        // ログ出力を制御：1回討伐、または複数回討伐の「最後の1回」だけログを表示
        const isLastRun = (i === count - 1);
        
        if (isLastRun) {
            logContainer.innerHTML = ""; // ログをクリアして上書き準備
        }

        // バトル実行（isLastRunがtrueの時だけappendActionLogが動くように設計）
        const result = executeSingleBattle(isLastRun); 
        
        // データの蓄積
        if (result.win) {
            totalWins++;
        } else {
            totalLosses++;
        }
        totalTurns += result.turns;
        allTurnHistory.push(result.turns);
        
        lastBattleWin = result.win; // 最後の回の勝敗を記録
    }

    // 画面表示を更新
    updateStatsUI(lastBattleWin);
}

function updateStatsUI(lastWin) {
    const totalCount = totalWins + totalLosses;
    const winRate = ((totalWins / totalCount) * 100).toFixed(1);
    
    const maxTurns = Math.max(...allTurnHistory);
    const minTurns = Math.min(...allTurnHistory);
    const avgTurns = (totalTurns / totalCount).toFixed(1);

    // 1. 戦績と統計の更新
    document.getElementById("win-loss-count").textContent = `${totalWins} 勝 - ${totalLosses} 敗`;
    document.getElementById("win-rate").textContent = winRate;
    document.getElementById("max-turns").textContent = maxTurns;
    document.getElementById("min-turns").textContent = minTurns;
    document.getElementById("avg-turns").textContent = avgTurns;

    // 2. 「結果」欄の更新（最後のバトルの勝敗を表示）
    const resultCell = document.getElementById("battle-result");
    if (lastWin) {
        resultCell.textContent = "勝利";
        resultCell.style.color = "#ff4d4d"; // 勝利っぽい色に（CSSに合わせて調整してください）
    } else {
        resultCell.textContent = "敗北";
        resultCell.style.color = "#4d94ff"; // 敗北っぽい色に
    }
}

// リセットボタンの処理
document.getElementById("reset-stats-btn").onclick = function() {
    totalWins = 0;
    totalLosses = 0;
    totalTurns = 0;
    allTurnHistory = [];
    
    // 表示を初期状態に戻す
    document.getElementById("win-loss-count").textContent = "- 勝 - 敗";
    document.getElementById("win-rate").textContent = "-";
    document.getElementById("max-turns").textContent = "-";
    document.getElementById("min-turns").textContent = "-";
    document.getElementById("avg-turns").textContent = "-";
    document.getElementById("battle-result").textContent = "-";
    document.getElementById("battle-result").style.color = ""; // 色もリセット
    document.getElementById("battle-log").innerHTML = "";      // ログも消去
};
