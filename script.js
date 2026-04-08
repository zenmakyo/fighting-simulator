// 1. データベース（ここを自由に追加・編集してください）
const enemyData = [
    { name: "闇黒龍", attr: "龍", sta: 202100, atk: 9000, def: 5000, ability: "高揚" },
    { name: "叛逆の断罪者", attr: "魔", sta: 87030, atk: 7500, def: 3200, ability: "強打" },
    // ここに同じ形式でどんどん追加できます
];

// 2. 討伐幻獣名の箱
// A. メニューの開閉（ボタンを押したとき）
function toggleSearchMenu() {
    const menu = document.getElementById('targetMenu');
    const input = document.getElementById('targetInput');
    
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
        input.value = ''; // テキストボックスを空にする
        filterList();     // 全リストを表示する
        input.focus();    // すぐに入力できる状態にする
    }
}

// B. リストの絞り込み（文字を打ったとき）
function filterList() {
    const query = document.getElementById('targetInput').value.toLowerCase();
    const suggestions = document.getElementById('targetSuggestions');
    suggestions.innerHTML = '';

    // enemyDataから部分一致で抽出
    const filtered = enemyData.filter(enemy => 
        enemy.name.toLowerCase().includes(query)
    );

    filtered.forEach(enemy => {
        const div = document.createElement('div');
        div.textContent = enemy.name;
        
        div.onclick = function() {
            // 選択した名前をボタンに反映
            document.getElementById('targetSelectBtn').textContent = enemy.name;
            // 属性ボックス等にステータスを反映（既存の関数）
            applyEnemyStats(enemy);
            // メニューを閉じる
            document.getElementById('targetMenu').style.display = 'none';
        };
        suggestions.appendChild(div);
    });
}

// C. 欄外をクリックしたら閉じる処理（一番下などに追加）
document.addEventListener('mousedown', function(e) {
    const wrapper = document.querySelector('.inputWrapper');
    const menu = document.getElementById('targetMenu');
    if (wrapper && !wrapper.contains(e.target)) {
        menu.style.display = 'none';
    }
});

// D. 選択したモンスターのステータスを各入力欄に反映
function applyEnemyStats(data) {
    document.getElementById('e-attribute').value = data.attr;
    document.getElementById('e-sta').value = data.sta;
    document.getElementById('e-atk').value = data.atk;
    document.getElementById('e-def').value = data.def;
    document.getElementById('e-ability').value = data.ability;
}

// 【既存の関数】箱の出し入れ用
function toggleEnemyBox() {
    const box = document.getElementById('enemy-status-box');
    box.style.display = (box.style.display === "none" || box.style.display === "") ? "block" : "none";
}

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
