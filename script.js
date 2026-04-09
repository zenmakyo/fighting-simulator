// 1. データベース（ここを自由に追加・編集してください）
const enemyData = [
    { name: "Lv.200:闇黒龍", attr: "龍", sta: 202100, atk: 9000, def: 5000, ability: "高揚" },
    { name: "Lv.150:叛逆の断罪者", attr: "魔", sta: 87000, atk: 7500, def: 3200, ability: "強打" },
    { name: "Lv.135:盲鬼ト浮鬼", attr: "獣", sta: 69000, atk: 7360, def: 3000, ability: "強打"},
    { name: "Lv.120:砂漠の亡者", attr: "魔", sta: 55000, atk: 7250, def: 2880, ability: "高揚"},
    { name: "Lv.115:終焉の指揮者", attr: "魔", sta: 48300, atk: 6420, def: 2640, ability: "強打"},
    { name: "Lv.109:ポセイドン", attr: "霊", sta: 43000, atk: 6000, def: 2350, ability: "強打"},
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


//3.自分の幻獣ステータスとリストの設定
// 詳細エリアの開閉
function toggleDetail(num) {
    const detail = document.getElementById(`detail-${num}`);
    if (detail.style.display === "none") {
        detail.style.display = "block";
    } else {
        detail.style.display = "none";
    }
}

// 浮き上がるリストを表示する共通関数
function openFloatingList(title, items, callback) {
    const overlay = document.getElementById('floating-list-overlay');
    const listTitle = document.getElementById('list-title');
    const listItems = document.getElementById('list-items');

    listTitle.textContent = title;
    listItems.innerHTML = ''; // リストを一旦空に

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.onclick = () => {
            callback(item);
            closeList();
        };
        listItems.appendChild(li);
    });

    overlay.style.display = 'flex';
}

// リストを閉じる
function closeList() {
    document.getElementById('floating-list-overlay').style.display = 'none';
}

// --- 各ボタンの動作例 ---

// 保存先リストを開く
function openSaveTargetList(num) {
    const targets = ["保存スロット1 (未設定)", "保存スロット2 (未設定)", "保存スロット3 (未設定)"];
    openFloatingList(`幻獣${num}の保存先を選択`, targets, (selected) => {
        alert(`${num}番のデータを「${selected}」に保存しました（仮）`);
    });
}

// 強化値リストを開く
function openPlusList(type, num) {
    const levels = Array.from({length: 21}, (_, i) => `+${i}`);
    openFloatingList(`${type === 'weapon' ? '武器' : '防具'}強化値`, levels, (val) => {
        document.getElementById(`plus-${type}-${num}`).textContent = val;
    });
}


// 武器・防具・アビリティリストの表示
// 各ユニットの状態保持（初期値は未装備）
let currentPhantomState = {
    1: { weapon: null, armor: null },
    2: { weapon: null, armor: null },
    3: { weapon: null, armor: null },
    4: { weapon: null, armor: null }
};

/**
 * 1. HTMLのonclickから呼ばれる入り口
 */
function openSearchList(type, num) {
    let listData = [];
    let title = "";
    let targetId = "";

    // data.js のリストを参照
    if (type === 'weapon') {
        listData = weaponList;
        title = "武器を選択";
        targetId = `select-weapon-${num}`;
    } else if (type === 'armor') {
        listData = armorList;
        title = "防具を選択";
        targetId = `select-armor-${num}`;
    } else if (type === 'w-ability' || type === 'a-ability') {
        listData = abilityList;
        title = "アビリティを選択";
        targetId = (type === 'w-ability') ? `select-w-abi-${num}` : `select-a-abi-${num}`;
    }

    // 名前だけの配列（「未装備」除外）を作ってポップアップに渡す
    const namesOnly = listData
        .filter(item => item.name !== "未装備" && item.name !== "未選択")
        .map(item => item.name);

    openFloatingList(title, namesOnly, (selectedName) => {
        // 表示を更新
        document.getElementById(targetId).textContent = selectedName;

        // 選んだデータを内部状態に保存
        const selectedData = listData.find(item => item.name === selectedName);
        if (type === 'weapon') currentPhantomState[num].weapon = selectedData;
        if (type === 'armor') currentPhantomState[num].armor = selectedData;

        // ★ここで後ほど作成する計算関数を動かす
        // updateAtkDisplay(num); 
    });
}

/**
 * 2. 検索・スクロール機能付きポップアップの本体
 */
function openFloatingList(title, items, callback) {
    const overlay = document.getElementById('floating-list-overlay');
    const listTitle = document.getElementById('list-title');
    const listItems = document.getElementById('list-items');
    const searchInput = document.getElementById('list-search');

    listTitle.textContent = title;
    searchInput.value = ''; // 検索窓リセット
    searchInput.placeholder = "検索可能です";

    const render = (filteredItems) => {
        listItems.innerHTML = '';
        filteredItems.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            li.onclick = () => {
                callback(name);
                closeList();
            };
            listItems.appendChild(li);
        });
    };

    // 初期表示
    render(items);

    // 検索イベント
    searchInput.oninput = () => {
        const word = searchInput.value.toLowerCase();
        const filtered = items.filter(name => name.toLowerCase().includes(word));
        render(filtered);
    };

    overlay.style.display = 'flex';
}

function closeList() {
    document.getElementById('floating-list-overlay').style.display = 'none';
}
