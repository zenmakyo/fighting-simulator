/**
 * アビリティの効果を直接計算し、ステータスを書き換える
 */
const AbilityLogic = {
    apply: function(attacker, enemy) {
        const name = attacker.ability.name;
        const rand = Math.random();
        
        // ターン毎のリセット
        attacker.tempAtkModifier = 1.0;
        attacker.isSkipAttack = false;

        switch (name) {
            case "粉砕":
                if (rand < 0.2) { // 確率もここに直書き
                    attacker.tempAtkModifier = 1.4;
                    enemy.currentDef = Math.floor(enemy.currentDef * 0.8);
                }
                break;

            case "強打":
                if (rand < 0.3) attacker.tempAtkModifier = 2.5;
                break;

            case "ハイテンション":
                if (rand < 0.4) {
                    attacker.currentAtk = Math.floor(attacker.currentAtk * 1.1);
                }
                break;

            case "一心不乱":
                // スタミナが減るほど強いなどの複雑な計算もここなら書きやすい
                const staRatio = attacker.currentSta / attacker.maxSta;
                attacker.tempAtkModifier = staRatio < 0.2 ? 3.0 : 1.5;
                break;
                
            default:
                break;
        }
    }
};
