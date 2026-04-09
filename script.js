// 1. 討伐幻獣名の箱
// A. メニューの開閉（ボタンを押したとき）
function toggleSearchMenu() {
    const menu = document.getElementById('targetMenu');
    const input = document.getElementById('targetInput');
    
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
        input.value = ''; // テキストボックスを空にする
        filterList();     // 全リストを表示する
        input.focus();    // すぐに入力できる状態にする
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
        box.style.display = "none";  // 非表示
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


// 2.自分の幻獣ステータスとリストの設定
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


// 武器・防具・アビリティリストの表示

let activeCloseHandler = null; // 監視役を覚えるための変数

/**
 * ボタンのすぐ下にリストを展開する
 */
function openSearchList(type, num, event) {
    const menu = document.getElementById('dropdown-menu');
    const searchInput = document.getElementById('dropdown-search');
    const listItems = document.getElementById('dropdown-items');

    // --- A. 前回の監視役がいればクビにする ---
    if (activeCloseHandler) {
        document.removeEventListener('click', activeCloseHandler);
    }

    // --- B. データの準備 ---
    let listData = [];
    let targetId = "";

    if (type === 'weapon') {
        listData = weaponList;
        targetId = `select-weapon-${num}`;
    } else if (type === 'armor') {
        listData = armorList;
        targetId = `select-armor-${num}`;
    } else if (type === 'w-ability') {
        listData = weaponAbilityList; // data.jsで作ったリスト名に合わせる
        targetId = `select-w-abi-${num}`;
    } else if (type === 'a-ability') {
        listData = armorAbilityList;  // data.jsで作ったリスト名に合わせる
        targetId = `select-a-abi-${num}`;
    }

    // --- C. 位置の計算 ---
    const rect = event.currentTarget.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    // --- D. リストの描画 ---
    const render = (query = "") => {
        listItems.innerHTML = '';
        listData.filter(item => 
            item.name !== "未選択" && 
            item.name.toLowerCase().includes(query.toLowerCase())
        ).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.onclick = (e) => {
                e.stopPropagation(); // クリックが外側に伝わるのを防ぐ
                document.getElementById(targetId).textContent = item.name;
                
                // 内部データ保存
                if (typeof currentPhantomState !== 'undefined') {
                    if (type === 'weapon') currentPhantomState[num].weapon = item;
                    if (type === 'armor') currentPhantomState[num].armor = item;
                    if (type === 'w-ability') currentPhantomState[num].w_ability = item;
                    if (type === 'a-ability') currentPhantomState[num].a_ability = item;
                }
                
                // 閉じる
                menu.style.display = 'none';
                document.removeEventListener('click', activeCloseHandler);
                activeCloseHandler = null;
            };
            listItems.appendChild(li);
        });
    };

    render();

    // --- E. メニューを表示 ---
    menu.style.display = 'block';
    searchInput.value = '';
    searchInput.focus();

    // --- F. 「外側クリック」の監視を開始 ---
    const currentBtn = event.currentTarget; 
    activeCloseHandler = (e) => {
        // メニュー内をクリックしたなら何もしない
        if (menu.contains(e.target)) return;
        // 開いたボタン自体をクリックしたなら何もしない（toggle処理に任せる）
        if (currentBtn.contains(e.target)) return;

        // それ以外（外側）をクリックしたら閉じる
        menu.style.display = 'none';
        document.removeEventListener('click', activeCloseHandler);
        activeCloseHandler = null;
    };

    // 0.1秒待ってから監視をスタート（即自爆を防ぐ）
    setTimeout(() => {
        document.addEventListener('click', activeCloseHandler);
    }, 100);
}

// ページ読み込み完了時に強化値の選択肢（+0～+20）を自動生成
window.addEventListener('load', () => {
    const plusSelects = document.querySelectorAll('.plus-select select');
    
    plusSelects.forEach(select => {
        // 一旦中身をリセット
        select.innerHTML = '';
        
        // 0から20までループして作成
        for (let i = 0; i <= 20; i++) {
            const opt = document.createElement('option');
            opt.value = i;          // 内部データ：数値の 0～20
            opt.textContent = `+${i}`; // 見た目：+0～+20
            select.appendChild(opt);
        }
        
        // デフォルトを+20にしたい場合はここを20に。+0がいいなら0にする
        select.value = 20;
    });
});

// 値が変わった時の処理
function updatePlusValue(type, num) {
    const select = document.getElementById(`plus-${type}-${num}`);
    const val = parseInt(select.value); // ここで数値として取得
    
    // 計算用のデータに保存
    if (typeof currentPhantomState !== 'undefined') {
        if (type === 'weapon') currentPhantomState[num].weapon_plus = val;
        if (type === 'armor') currentPhantomState[num].armor_plus = val;
    }
    
    console.log(`${type}強化値: ${val} (型: ${typeof val})`);
}

/**
 * 武器の固有アビリティを付与アビリティ欄に同期する
 */
function syncWeaponAbi(num) {
    const weaponData = currentPhantomState[num].weapon;

    // 武器未選択、またはabilityプロパティがない場合は処理を抜ける
    if (!weaponData || weaponData.name === "未選択" || !weaponData.ability) return;

    // 武器アビリティリストから、武器のabilityと名前が一致するものを検索
    const foundAbi = weaponAbilityList.find(abi => abi.name === weaponData.ability);

    // 一致するものがあった場合のみ更新
    if (foundAbi) {
        // 表示を更新
        document.getElementById(`select-w-abi-${num}`).textContent = foundAbi.name;
        // 内部データを更新
        currentPhantomState[num].w_ability = foundAbi;
    }
    // 一致しない場合は、HTMLもステートも「未選択」の状態を維持
}
