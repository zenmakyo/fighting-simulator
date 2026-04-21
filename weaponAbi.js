// 武器アビリティの倍率・発動率設定
const WEAPON_ABILITY_DEFS = {
    "粉砕": { rate: 1.0, power: 1.5, memo: "常に発動、ダメージ1.5倍" },
    "強打": { rate: 0.3, power: 2.5, memo: "30%で発動、ダメージ2.5倍" },
    "五月雨": { minHits: 2, maxHits: 5, power: 0.6, memo: "2〜5回攻撃、1発0.6倍" },
    "大撃": { rate: 0.1, power: 4.0, memo: "10%で発動、特大ダメージ" },
    // ...他のアビリティもここに追加
};

/**
 * 武器アビリティの効果を計算する関数
 * @param {string} abiName - アビリティ名
 * @returns {Object} 倍率や回数
 */
function getWeaponAbilityEffect(abiName) {
    return WEAPON_ABILITY_DEFS[abiName] || { rate: 1.0, power: 1.0 };
}
