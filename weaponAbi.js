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

    "突風": {
        baseRate: 0.28,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 1.0;
            attacker.damageTakenModifier = 0.5;
        }
    },

    "凍結": {
        baseRate: 0.28,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 1.0;
            attacker.damageTakenModifier = 0.7;
        }
    },

    "紅舞": {
        baseRate: 0.17,
        execute: (attacker, enemy, field) => {
            attacker.tempAtkModifier = 2.0;
            field.allies.forEach(ally => {
            if (ally.isAlive) {
                ally.currentAtk = Math.ceil(ally.currentAtk * 1.08);
            }
        });
        }
    },

    "高揚": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            attacker.currentAtk = Math.ceil(attacker.currentAtk * 1.1);
        }
    },

    "盟旗": {
        baseRate: 0.28,
        execute: (attacker, enemy, field) => {
            attacker.tempAtkModifier = 0;
            field.allies.forEach(ally => {
            if (ally.isAlive) {
                ally.currentAtk = Math.ceil(ally.currentAtk * 1.1);
            }
        });
        }
    },

    "不乱": {
        baseRate: 0.17,
        execute: (attacker, enemy) => {
            const hpRate = attacker.currentSta / attacker.maxSta;
            if (hpRate > 0.6) {
                attacker.tempAtkModifier = 2.0;
              } else if (hpRate <= 0.1) {
                attacker.tempAtkModifier = 3.0;
              } else {
                const modifier = 3.0 - ((hpRate - 0.1) * 2);
                attacker.tempAtkModifier = Math.round(modifier * 10) / 10;
              }
         }
    },

    "渾身": {
        baseRate: 0.3,
        execute: (attacker, enemy) => {
            const hpPercent = Math.floor((attacker.currentSta / attacker.maxSta) * 100);
            if (hpPercent >= 100) {
                attacker.tempAtkModifier = 2.5;
            } else if (hpPercent <= 50) {
                attacker.tempAtkModifier = 2.0;
            } else {
            const modifier = 2.0 + (hpPercent - 50) * 0.01;
                attacker.tempAtkModifier = Math.round(modifier * 100) / 100;
            }
        }
    },

    "大撃": {
        baseRate: 0.17,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 2.0;
        }
    },

    "五月雨": {
        baseRate: 0.28,
        execute: (attacker, enemy) => {
            attacker.tempAtkModifier = 1.6;
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

    "一斉": {
        baseRate: 0.17,
        execute: (attacker) => {
            attacker.isIsseiActivated = true;
        }
    },

    "破茶": {
        baseRate: 0.17,
        execute: (attacker, enemy, field) => {
            const ignoreList = ["破茶"];
            const availableAbis = Object.keys(ABILITY_SPECS).filter(name => !ignoreList.includes(name));
            const randomAbiName = availableAbis[Math.floor(Math.random() * availableAbis.length)];
            if (ABILITY_SPECS[randomAbiName]) {
                ABILITY_SPECS[randomAbiName].execute(attacker, enemy, field);
                attacker.lastRandomAbi = randomAbiName;
            }
        }
    },

    "天晴": {
        baseRate: 0.12,
        execute: (attacker, enemy, field) => {
            const plus = attacker.weaponPlus;
            // データが揃うまではグレードを10として扱う
            const grade = 10; 
            
            const key = `${grade}-${plus}`;
            const healAmount = TENSEI_HEAL_TABLE[key] || 0;

            field.allies.forEach(ally => {
                // 1. 復活処理
                if (!ally.isAlive) {
                    ally.isAlive = true;
                    ally.currentSta = 1;
                }

                // 2. 攻撃バフ（生存者全員、復活したばかりの者も含む）
                if (ally.isAlive) {
                    ally.currentAtk = Math.ceil(ally.currentAtk * 1.06);

                    // 3. 回復処理
                    ally.currentSta = Math.min(ally.maxSta, ally.currentSta + healAmount);
                }
            });
        }
    },

    "福音": {
        baseRate: 0.17,
        execute: (attacker, enemy, field) => {
            const grade = attacker.weaponGrade;
            const plus = attacker.weaponPlus;
            const key = `${grade}-${plus}`;
            const healAmount = HUKUIN_HEAL_TABLE[key] || 0;

            field.allies.forEach(ally => {
                if (!ally.isAlive) {
                    ally.isAlive = true;
                    ally.currentSta = 1 + healAmount;
                } else {
                    ally.currentSta = Math.min(ally.maxSta, ally.currentSta + healAmount);
                }
            });
        }
    },

    "爽活": {
       baseRate: 0.17,
        execute: (attacker, enemy, field) => {
            field.allies.forEach(ally => {
                if (!ally.isAlive) {
                    ally.isAlive = true;
                    ally.currentSta = 1;
                } else {
                    const healAmount = Math.floor(ally.maxSta * 0.2);
                    ally.currentSta = Math.min(ally.maxSta, ally.currentSta + healAmount);
                }
            });
        }
    },

    "癒唄": {
       baseRate: 0.17,
        execute: (attacker, enemy, field) => {
            field.allies.forEach(ally => {
                if (ally.isAlive) {
                    const healAmount = Math.floor(ally.maxSta * 0.3);
                    ally.currentSta = Math.min(ally.maxSta, ally.currentSta + healAmount);
                }
            });
        }
    },

    "回復": {
       baseRate: 0.37,
        execute: (attacker, enemy, field) => {
            field.allies.forEach(ally => {
                if (ally.isAlive) {
                    const healAmount = Math.floor(ally.maxSta * 0.15);
                    ally.currentSta = Math.min(ally.maxSta, ally.currentSta + healAmount);
                }
            });
        }
    },

    "和属": {
        baseRate: 0.17,
        execute: (attacker) => {
            attacker.isWazokuActivated = true;
        }
    },

    "獣属": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            const isMatch = (attacker.element === "獣");
            const isAdv = (enemy.element === "魔");

            if (isMatch && isAdv) attacker.tempAtkModifier = 1.68;
            else if (isMatch) attacker.tempAtkModifier = 1.44;
            else attacker.tempAtkModifier = 1.2;
        }
    },

    "魔属": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            const isMatch = (attacker.element === "魔");
            const isAdv = (enemy.element === "霊");

            if (isMatch && isAdv) attacker.tempAtkModifier = 1.68;
            else if (isMatch) attacker.tempAtkModifier = 1.44;
            else attacker.tempAtkModifier = 1.2;
        }
    },

    "霊属": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            const isMatch = (attacker.element === "霊");
            const isAdv = (enemy.element === "獣");

            if (isMatch && isAdv) attacker.tempAtkModifier = 1.68;
            else if (isMatch) attacker.tempAtkModifier = 1.44;
            else attacker.tempAtkModifier = 1.2;
        }
    },

    "無属": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            const isMatch = (attacker.element === "無");
            const isAdv = (enemy.element === "地");

            if (isMatch && isAdv) attacker.tempAtkModifier = 1.68;
            else if (isMatch) attacker.tempAtkModifier = 1.44;
            else attacker.tempAtkModifier = 1.2;
        }
    },

    "地属": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            const isMatch = (attacker.element === "地");
            const isAdv = (enemy.element === "龍");

            if (isMatch && isAdv) attacker.tempAtkModifier = 1.68;
            else if (isMatch) attacker.tempAtkModifier = 1.44;
            else attacker.tempAtkModifier = 1.2;
        }
    },

    "龍属": {
        baseRate: 0.37,
        execute: (attacker, enemy) => {
            const isMatch = (attacker.element === "龍");
            const isAdv = (enemy.element === "無");

            if (isMatch && isAdv) attacker.tempAtkModifier = 1.68;
            else if (isMatch) attacker.tempAtkModifier = 1.44;
            else attacker.tempAtkModifier = 1.2;
        }
    }
};

const HUKUIN_HEAL_TABLE = {
    // grade1
    "1-0": 400, "1-1": 410, "1-2": 420, "1-3": 440, "1-4": 470, "1-5": 520,
    "1-6": 580, "1-7": 670, "1-8": 770, "1-9": 890, "1-10": 1040,
    "1-11": 1210, "1-12": 1410, "1-13": 1630, "1-14": 1880, "1-15": 2160,
    "1-16": 2470, "1-17": 2800, "1-18": 3170, "1-19": 3570, "1-20": 4000,
    // grade5
    "5-0": 1200, "5-1": 1210, "5-2": 1240, "5-3": 1300, "5-4": 1400, "5-5": 1540,
    "5-6": 1740, "5-7": 1990, "5-8": 2300, "5-9": 2670, "5-10": 3110,
    "5-11": 3630, "5-12": 4220, "5-13": 4880, "5-14": 5630, "5-15": 6470,
    "5-16": 7390, "5-17": 8400, "5-18": 9500, "5-19": 10710, "5-20": 12000,
    // grade7
    "7-0": 1600, "7-1": 1610, "7-2": 1650, "7-3": 1730, "7-4": 1860, "7-5": 2050,
    "7-6": 2310, "7-7": 2650, "7-8": 3060, "7-9": 3560, "7-10": 4150,
    "7-11": 4840, "7-12": 5620, "7-13": 6510, "7-14": 7510, "7-15": 8620,
    "7-16": 9850, "7-17": 11200, "7-18": 12670, "7-19": 14270, "7-20": 16000,
    // grade8
    "8-0": 1800, "8-1": 1810, "8-2": 1860, "8-3": 1950, "8-4": 2090, "8-5": 2310,
    "8-6": 2600, "8-7": 2980, "8-8": 3440, "8-9": 4010, "8-10": 4670,
    "8-11": 5440, "8-12": 6320, "8-13": 7320, "8-14": 8450, "8-15": 9700,
    "8-16": 11080, "8-17": 12600, "8-18": 14250, "8-19": 16060, "8-20": 18000,
    // grade9
    "9-0": 2000, "9-1": 2020, "9-2": 2060, "9-3": 2160, "9-4": 2330, "9-5": 2570,
    "9-6": 2890, "9-7": 3310, "9-8": 3830, "9-9": 4450, "9-10": 5190,
    "9-11": 6040, "9-12": 7020, "9-13": 8140, "9-14": 9380, "9-15": 10770,
    "9-16": 12310, "9-17": 14000, "9-18": 15840, "9-19": 17840, "9-20": 20000,
    // grade10
    "10-0": 2200, "10-1": 2220, "10-2": 2270, "10-3": 2380, "10-4": 2560, "10-5": 2820,
    "10-6": 3180, "10-7": 3640, "10-8": 4210, "10-9": 4890, "10-10": 5710,
    "10-11": 6650, "10-12": 7730, "10-13": 8950, "10-14": 10320, "10-15": 11850,
    "10-16": 13540, "10-17": 15390, "10-18": 17420, "10-19": 19620, "10-20": 22000
};

const TENSEI_HEAL_TABLE = {
    "10-0": 2000, "10-1": 2010, "10-2": 2020, "10-3": 2070, "10-4": 2150, "10-5": 2290,
    "10-6": 2490, "10-7": 2780, "10-8": 3160, "10-9": 3650, "10-10": 4250, 
    "10-11": 5000, "10-12": 5890, "10-13": 6950, "10-14": 8180, "10-15": 9600, 
    "10-16": 11220, "10-17": 13060, "10-18": 15130, "10-19": 17440, "10-20": 20000
};
