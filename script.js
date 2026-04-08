// 1. 敵のデータベース（0番目を闇黒龍にしています）
const enemyData = [
    { name: "Lv200: 闇黒龍", attr: "龍", sta: 202100, atk: 9000, def: 5000, ability: "高揚" },
    { name: "Lv150: 叛逆の断罪者", attr: "魔", sta: 87030, atk: 7500, def: 3200, ability: "強打" }
];

window.onload = function() {
    const select = document.getElementById('enemy-select');
    
    // プルダウンの生成
    enemyData.forEach((enemy, index) => {
        const option = document.createElement('option');
        option.value = index; 
        option.text = enemy.name;
        select.appendChild(option);
    });

    // --- ここから追加：デフォルト設定 ---
    select.value = "0";      // 0番目（闇黒龍）を選択状態にする
    updateEnemyStats();      // 数値を反映させる関数を今すぐ実行する
    // ---------------------------------
};

function updateEnemyStats() {
    const select = document.getElementById('enemy-select');
    const selectedIndex = select.value;
    if (selectedIndex === "") return;

    const data = enemyData[selectedIndex];

    document.getElementById('e-attribute').value = data.attr;
    document.getElementById('e-sta').value = data.sta; 
    document.getElementById('e-atk').value = data.atk;
    document.getElementById('e-def').value = data.def;
    document.getElementById('e-ability').value = data.ability;
}
