/**
 * 1回討伐のメイン実行関数
 */
function runSingleBattle() {
    // ① ステータス読み取りフェーズ
    const context = fetchBattleContext(); 
    if (!context) return;

    let log = []; // 戦闘ログ格納用
    let turn = 1;
    let enemySta = context.enemy.sta;
    
    // ② ターンループ（どちらかのSTAが0になるか20ターンまで）
    while (turn <= 20 && enemySta > 0 && isAnyAllyAlive(context.participants)) {
        log.push(`--- ターン ${turn} ---`);
        
        context.participants.forEach(ally => {
            if (ally.currentSta <= 0) return;

            // ③ ダメージ計算（武器アビリティJSから倍率を取得して計算）
            const damage = calculateDamage(ally, context.enemy);
            enemySta -= damage;
            log.push(`${ally.name}の攻撃！ ${damage}のダメージ（敵残りHP: ${Math.max(0, enemySta)}）`);
        });

        turn++;
    }

    // ④ 結果表示
    showBattleResult(enemySta <= 0, log);
}
