/**
 * アビリティ仕様定義
 * 各アビリティの基礎発動率と、発動時の処理のみを記述
 */
const ABILITY_SPECS = {
    "粉砕": {
        baseRate: 0.15,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 1.4;
            enemy.currentDef = Math.floor(enemy.currentDef * 0.8);
        }
    },
    "強打": {
        baseRate: 0.35,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 2.5;
        }
    },
    "高揚": {
        baseRate: 0.40,
        execute: (attacker, enemy) => {
            attacker.currentAtk = Math.floor(attacker.currentAtk * 1.1);
        }
    }
};
