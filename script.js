// 1. データベース（ここを自由に追加・編集してください）
const enemyData = [
    { name: "闇黒龍", attr: "龍", sta: 202100, atk: 9000, def: 5000, ability: "高揚" },
    { name: "叛逆の断罪者", attr: "魔", sta: 87030, atk: 7500, def: 3200, ability: "強打" },
    // ここに同じ形式でどんどん追加できます
];

window.onload = function() {
    const input = document.getElementById('targetInput');
    const suggestions = document.getElementById('targetSuggestions');

    // --- A. 入力欄をクリックした時に全リストを表示 ---
    input.addEventListener('focus', function() {
        showSuggestions(enemyData);
    });

    // --- B. 文字を入力した時に部分一致で絞り込む ---
    input.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filtered = enemyData.filter(enemy => 
            enemy.name.toLowerCase().includes(query)
        );
        showSuggestions(filtered);
    });

    // --- C. リストを表示する共通処理 ---
    function showSuggestions(list) {
        suggestions.innerHTML = ''; // 一旦クリア
        
        if (list.length === 0) {
            suggestions.style.display = 'none';
            return;
        }

        list.forEach(enemy => {
            const div = document.createElement('div');
            div.textContent = enemy.name;
            div.style.padding = '10px'; // 簡易的なデザイン
            div.style.cursor = 'pointer';

            // 候補をクリックした時の処理
            div.onclick = function() {
                input.value = enemy.name;
                suggestions.style.display = 'none';
                applyEnemyStats(enemy); // ステータス反映へ
            };
            suggestions.appendChild(div);
        });
        suggestions.style.display = 'block';
    }

    // --- D. 欄外をクリックしたらリストを閉じる ---
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
};

// --- E. 選択したモンスターのステータスを各入力欄に反映 ---
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
