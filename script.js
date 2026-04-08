// 1. 敵のデータベース（0番目を闇黒龍にしています）
const enemyData = [
    { name: "Lv200: 闇黒龍", attr: "龍", sta: 202100, atk: 9000, def: 5000, ability: "高揚" },
    { name: "Lv150: 叛逆の断罪者", attr: "魔", sta: 87030, atk: 7500, def: 3200, ability: "強打" }
];


window.onload = function() {
    const select = document.getElementById('enemy-select');
    enemyData.forEach((enemy, index) => {
        const option = document.createElement('option');
        option.value = index; 
        option.text = enemy.name;
        select.appendChild(option);
    });
    // デフォルト設定
    select.value = "0";
    updateEnemyStats();
};

// 【追加】ボタンを押した時に箱を出し入れする関数
function toggleEnemyBox() {
    const box = document.getElementById('enemy-status-box');
    if (box.style.display === "none") {
        box.style.display = "block"; // 表示
    } else {
        box.style.display = "none";  // 非表示
    }
}

function updateEnemyStats() {
    const select = document.getElementById('enemy-select');
    const data = enemyData[select.value];
    if (!data) return;

    document.getElementById('e-attribute').value = data.attr;
    document.getElementById('e-sta').value = data.sta; 
    document.getElementById('e-atk').value = data.atk;
    document.getElementById('e-def').value = data.def;
    document.getElementById('e-ability').value = data.ability;
}
