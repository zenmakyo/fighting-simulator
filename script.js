// 1. データベース
const enemyData = [
    { name: "Lv.200:闇黒龍", attr: "龍", sta: 202100, atk: 9000, def: 5000, ability: "高揚" },
    { name: "Lv.150:叛逆の断罪者", attr: "魔", sta: 87000, atk: 7500, def: 3200, ability: "強打" },
    { name: "Lv.135:盲鬼ト浮鬼", attr: "獣", sta: 69000, atk: 7360, def: 3000, ability: "強打"},
    { name: "Lv.120:砂漠の亡者", attr: "魔", sta: 55000, atk: 7250, def: 2880, ability: "高揚"},
    { name: "Lv.115:終焉の指揮者", attr: "魔", sta: 48300, atk: 6420, def: 2640, ability: "強打"},
    { name: "Lv.109:ポセイドン", attr: "霊", sta: 43000, atk: 6000, def: 2350, ability: "強打"},
];

// 状態保持
let currentPhantomState = {
    1: { weapon: null, armor: null },
    2: { weapon: null, armor: null },
    3: { weapon: null, armor: null },
    4: { weapon: null, armor: null }
};

// --- 共通のドロップダウン表示関数（これを全員で使う） ---
function openUnifiedList(event, title, items, callback, showSearch = true) {
    const menu = document.getElementById('dropdown-menu');
    const searchInput = document.getElementById('dropdown-search');
    const listItems = document.getElementById('dropdown-items');

    // 位置設定
    const rect = event.currentTarget.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    // 検索窓の出し分け
    searchInput.style.display = showSearch ? 'block' : 'none';
    searchInput.value = '';

    const render = (query = "") => {
        listItems.innerHTML = '';
        const filtered = items.filter(name => 
            name.toLowerCase().includes(query.toLowerCase())
        );

        filtered.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            li.onclick = (e) => {
                e.stopPropagation(); // 伝播防止
                callback(name);      // 選んだ時の処理
                menu.style.display = 'none'; // ★確実に閉じる
            };
            listItems.appendChild(li);
        });
    };

    render();
    searchInput.oninput = (e) => render(e.target.value);
    menu.style.display = 'block';
    if(showSearch) searchInput.focus();
}

// --- 各ボタンからの呼び出し ---

// 武器・防具・アビリティ用
function openSearchList(type, num, event) {
    let listData = (type === 'weapon') ? weaponList : (type === 'armor' ? armorList : abilityList);
    let targetId = (type === 'weapon') ? `select-weapon-${num}` : 
                   (type === 'armor') ? `select-armor-${num}` : 
                   (type === 'w-ability') ? `select-w-abi-${num}` : `select-a-abi-${num}`;

    const names = listData.filter(i => i.name !== "未装備").map(i => i.name);

    openUnifiedList(event, "", names, (selectedName) => {
        document.getElementById(targetId).textContent = selectedName;
        const data = listData.find(i => i.name === selectedName);
        if (type === 'weapon') currentPhantomState[num].weapon = data;
        if (type === 'armor') currentPhantomState[num].armor = data;
    });
}

// 強化値用（eventを引数に追加してください）
function openPlusList(type, num, event) {
    const levels = Array.from({length: 21}, (_, i) => `+${i}`);
    openUnifiedList(event, "", levels, (val) => {
        document.getElementById(`plus-${type}-${num}`).textContent = val;
    }, false); // 強化値は検索不要
}

// 討伐幻獣のメニュー（既存のものを活かすならそのまま、統一するなら書き換え）
function toggleSearchMenu() {
    const menu = document.getElementById('targetMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    document.getElementById('targetInput').focus();
}

function filterList() {
    const query = document.getElementById('targetInput').value.toLowerCase();
    const suggestions = document.getElementById('targetSuggestions');
    suggestions.innerHTML = '';
    enemyData.filter(e => e.name.toLowerCase().includes(query)).forEach(enemy => {
        const div = document.createElement('div');
        div.textContent = enemy.name;
        div.onclick = () => {
            document.getElementById('targetSelectBtn').textContent = enemy.name;
            applyEnemyStats(enemy);
            document.getElementById('targetMenu').style.display = 'none';
        };
        suggestions.appendChild(div);
    });
}

// ステータス反映
function applyEnemyStats(data) {
    document.getElementById('e-attribute').value = data.attr;
    document.getElementById('e-sta').value = data.sta;
    document.getElementById('e-atk').value = data.atk;
    document.getElementById('e-def').value = data.def;
    document.getElementById('e-ability').value = data.ability;
}

// 閉じる関数
function closeList() {
    const menu = document.getElementById('dropdown-menu');
    if(menu) menu.style.display = 'none';
}
