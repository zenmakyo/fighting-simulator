/**
 * アビリティ仕様定義
 * 各アビリティの基礎発動率と、発動時の処理のみを記述
 */
const ABILITY_SPECS = {
    "疾風": {
        baseRate: 0.17,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 1.7;
            enemy.tempAtkModifier = 0.5;
        }
    },
    
    "猛突": {
        baseRate: 0.28,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 1.7;
            attacker.damageTakenModifier = 0.7;
        }
    },
    
    "強打": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 1.3;
        }
    },
    
    "粉砕": {
        baseRate: 0.17,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 1.4;
            enemy.currentDef = Math.ceil(enemy.currentDef * 0.8);
        }
    },
    
    "高揚": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            attacker.currentAtk = Math.ceil(attacker.currentAtk * 1.1);
        }
    }
};
