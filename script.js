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

                updatePhantomStats(num);
                
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
 * 画面の表示から直接武器名を取得して同期する
 */
function syncWeaponAbi(num) {
    // 1. 今、画面の「武器」のところに表示されているテキストを取得
    const weaponDisplayName = document.getElementById(`select-weapon-${num}`).textContent.trim();

    // 2. 「未選択」なら何もしない
    if (weaponDisplayName === "未選択") return;

    // 3. 武器リスト(weaponList)の中から、その名前の武器のデータを探す
    const weaponData = weaponList.find(w => w.name === weaponDisplayName);

    // 武器が見つかり、かつその武器がabilityを持っている場合
    if (weaponData && weaponData.ability) {
        
    // 4. 武器アビリティリストから、そのability名と一致するものを探す
    const foundAbi = weaponAbilityList.find(abi => abi.name === weaponData.ability);

        if (foundAbi) {
            // 5. 画面の「付与アビ」の表示を更新
            document.getElementById(`select-w-abi-${num}`).textContent = foundAbi.name;
            
            // 6. ついでに内部データ（ステート）も最新にしておく
            if (typeof currentPhantomState !== 'undefined') {
                currentPhantomState[num].w_ability = foundAbi;
            }
            updatePhantomStats(num);
        }
    }
}

// 装備込みステータスの計算
function updatePhantomStats(num = 1) {
    // 1. 入力値の取得
    const base = {
        sta: parseInt(document.getElementById(`base-sta-${num}`).value) || 0,
        atk: parseInt(document.getElementById(`base-atk-${num}`).value) || 0,
        def: parseInt(document.getElementById(`base-def-${num}`).value) || 0,
        luck: parseInt(document.getElementById(`base-luck-${num}`).value) || 0
    };

    const weaponName = document.getElementById(`select-weapon-${num}`).textContent.trim();
    const armorName = document.getElementById(`select-armor-${num}`).textContent.trim();
    const aAbiName = document.getElementById(`select-a-abi-${num}`).textContent.trim();
    const wPlus = parseInt(document.getElementById(`plus-weapon-${num}`).value) || 0;
    const aPlus = parseInt(document.getElementById(`plus-armor-${num}`).value) || 0;

    const weaponData = weaponList.find(w => w.name === weaponName) || { baseAtk: 0 };
    const armorData = armorList.find(a => a.name === armorName) || { baseDef: 0, grade: 0, ability: "なし" };

    // 2. 装備の固定値を先に準備（最後の方で使います）
    const totalWeaponAtk = calculateEquipmentValue(weaponData.baseAtk, wPlus, weaponData.grade || 0);
    const totalArmorDef = calculateEquipmentValue(armorData.baseDef, aPlus, armorData.grade || 0);

    // 3. 【基礎】の確定
    // 素のDefにグレードボーナスを足したものを「基礎Def」とする
    let current = {
        sta: base.sta,
        atk: base.atk,
        def: base.def + Math.ceil(base.def * (armorData.grade * 0.01)),
        luck: base.luck
    };

    // 4. アビリティの連鎖適用（ここが「中間」を作る工程）
    // ① 基礎に対して防具固有をかける（結果：中間1）
    current = applyAbility(current, armorData.ability, aPlus); 

    // ② 中間1に対して防具付与をかける（結果：中間2）
    current = applyAbility(current, aAbiName, aPlus);

    // ※ 武器アビリティはステータス計算には含めない（あなたの指定通り！）

    // 5. 【最後】に装備の固定値を合流させる
    const finalResult = {
        sta: current.sta,
        atk: current.atk + totalWeaponAtk,
        def: current.def + totalArmorDef,
        luck: current.luck
    };

    // 6. 画面に反映
    document.getElementById(`res-sta-${num}`).textContent = finalResult.sta;
    document.getElementById(`res-atk-${num}`).textContent = finalResult.atk;
    document.getElementById(`res-def-${num}`).textContent = finalResult.def;
    document.getElementById(`res-luck-${num}`).textContent = finalResult.luck;
}

// --- ここから貼り付け ---

/**
 * 装備の最終ステータスを計算（基本値 + 強化値）
 */
function calculateEquipmentValue(baseVal, plus, grade = 0) {
    if (baseVal <= 0) return 0;

    let multiplierRate;
    if (plus <= 10) {
        // +10までの計算式: 強化値n x (20 + Grade) %
        multiplierRate = plus * (20 + grade);
    } else {
        // +11からの計算式: 強化値n x (30 + Grade) %
        multiplierRate = plus * (30 + grade);
    }

    // 基本値 + (基本値 * 倍率%) 
    return Math.ceil(baseVal * (1 + (multiplierRate / 100)));
}

/**
 * アビリティを適用する
 */
function applyAbility(stats, abiName, plusValue) {
    // 辞書(data.js)にアビリティがあれば計算を実行
    if (typeof ABILITY_MASTER !== 'undefined' && ABILITY_MASTER[abiName]) {
        const bonus = ABILITY_MASTER[abiName].logic(stats, plusValue);
        return {
            sta: stats.sta + (bonus.sta || 0),
            atk: stats.atk + (bonus.atk || 0),
            def: stats.def + (bonus.def || 0),
            luck: stats.luck + (bonus.luck || 0)
        };
    }
    return stats;
}

/**
 * リアルタイム監視設定
 */
window.addEventListener('input', (e) => {
    // 幻獣の入力欄（base-sta-1など）が変更されたら計算
    if (e.target.id && e.target.id.includes('base-')) {
        const num = e.target.id.split('-').pop();
        updatePhantomStats(num);
    }
});

window.addEventListener('change', (e) => {
    // 強化値プルダウンが変更されたら計算
    if (e.target.id && e.target.id.includes('plus-')) {
        const num = e.target.id.split('-').pop();
        updatePhantomStats(num);
    }
});

// --- 幻獣データ保存・呼び出し機能 ---

const MAX_SAVE_SLOTS = 30;

/**
 * 1. 保存先スロットを選択するメニューを表示
 */
function openSaveTargetList(num) {
    const items = [];
    for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
        const savedData = JSON.parse(localStorage.getItem(`savedPhantom_${i}`));
        const label = savedData ? `${i}: ${savedData.name}` : `${i}: 空きスロット`;
        
        items.push({
            name: label,
            action: () => savePhantomData(num, i)
        });
    }
    
    showCustomMenu(items, event, false, true);
}

/**
 * 2. 実際に localStorage へ保存
 */
function savePhantomData(unitNum, slotIndex) {
    const data = {
        name: document.getElementById(`input-name-${unitNum}`).value || "名称未設定",
        element: document.getElementById(`input-element-${unitNum}`).value,
        baseSta: document.getElementById(`base-sta-${unitNum}`).value,
        baseAtk: document.getElementById(`base-atk-${unitNum}`).value,
        baseDef: document.getElementById(`base-def-${unitNum}`).value,
        baseLuck: document.getElementById(`base-luck-${unitNum}`).value,
        weapon: document.getElementById(`select-weapon-${unitNum}`).textContent.trim(),
        wAbi: document.getElementById(`select-w-abi-${unitNum}`).textContent.trim(),
        armor: document.getElementById(`select-armor-${unitNum}`).textContent.trim(),
        aAbi: document.getElementById(`select-a-abi-${unitNum}`).textContent.trim()
    };

    localStorage.setItem(`savedPhantom_${slotIndex}`, JSON.stringify(data));

  const nameInput = document.getElementById(`input-name-${unitNum}`).value || "名称未設定";
    document.getElementById(`display-name-${unitNum}`).textContent = `${slotIndex}: ${nameInput}`;
    
    alert(`スロット ${slotIndex} に「${data.name}」を保存しました。`);
    closeDropdown();
}

/**
 * 3. 保存済みリストから呼び出しメニューを表示
 */
function openLoadList(num) {
    const items = [];
    for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
        const savedData = JSON.parse(localStorage.getItem(`savedPhantom_${i}`));
        if (savedData) {
            items.push({
                name: `${i}: ${savedData.name}`,
                action: () => loadPhantomData(num, i)
            });
        } else {
            items.push({
                name: `${i}: ---`,
                action: null
            });
        }
    }
    // 呼び出し時は検索したい場合もあるので true
    showCustomMenu(items, event, true);
}

/**
 * 4. localStorage からデータを読み込んでフォームにセット
 */
function loadPhantomData(unitNum, slotIndex) {
    const savedData = JSON.parse(localStorage.getItem(`savedPhantom_${slotIndex}`));
    if (!savedData) return;

    // 保存された値をそれぞれの入力欄やボタンに反映させる
    document.getElementById(`input-name-${unitNum}`).value = savedData.name;
    document.getElementById(`display-name-${unitNum}`).textContent = `${slotIndex}: ${savedData.name}`;
    document.getElementById(`input-element-${unitNum}`).value = savedData.element;
    document.getElementById(`base-sta-${unitNum}`).value = savedData.baseSta;
    document.getElementById(`base-atk-${unitNum}`).value = savedData.baseAtk;
    document.getElementById(`base-def-${unitNum}`).value = savedData.baseDef;
    document.getElementById(`base-luck-${unitNum}`).value = savedData.baseLuck;

    // ボタンのテキスト表示も更新
    document.getElementById(`select-weapon-${unitNum}`).textContent = savedData.weapon;
    document.getElementById(`select-w-abi-${unitNum}`).textContent = savedData.wAbi;
    document.getElementById(`select-armor-${unitNum}`).textContent = savedData.armor;
    document.getElementById(`select-a-abi-${unitNum}`).textContent = savedData.aAbi;

    // 反映後に再計算を行う
    updatePhantomStats(unitNum);
    // メニューを閉じる
    closeDropdown();
}

/**
 * 保存・呼び出し専用のメニュー表示
 */
function showCustomMenu(allItems, event, showSearch, isSaveModal = false) {
    const menu = document.getElementById('dropdown-menu');
    const list = document.getElementById('dropdown-items');
    const searchInput = document.getElementById('dropdown-search');

    // --- 【修正ポイント1】古いイベントを完全にクリア ---
    // これをしないと、前回の検索処理が裏で生き残ってしまいます
    if (activeCloseHandler) document.removeEventListener('click', activeCloseHandler);
    searchInput.oninput = null; 

    // モード切り替え（保存かそれ以外か）
    if (isSaveModal) {
        menu.classList.add('save-modal-mode');
        
        // 【重要】JSで直接レイアウトを指定（これでCSSの!important競合を回避）
        menu.style.display = 'flex';           // リスト内スクロールを有効にする
        menu.style.flexDirection = 'column';    // 縦並び
        menu.style.overflow = 'hidden';
        menu.style.top = ""; 
        menu.style.left = "";
    } else {
        menu.classList.remove('save-modal-mode');
        
        // 【重要】通常時はブロック表示
        menu.style.display = 'block'; 
        
        const rect = event.currentTarget.getBoundingClientRect();
        menu.style.top = `${rect.bottom + window.scrollY}px`;
        menu.style.left = `${rect.left + window.scrollX}px`;
    }

    // --- 【修正ポイント2】描画関数をこの中で定義 ---
    // 「今渡されたリスト(allItems)」だけを使うように固定します
    const render = (filterText = "") => {
        list.innerHTML = '';
        const filtered = allItems.filter(item => 
            item.name.toLowerCase().includes(filterText.toLowerCase())
        );
        
        filtered.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.onclick = (e) => {
                e.stopPropagation();
                if (item.action) item.action();
                closeDropdown();
            };
            list.appendChild(li);
        });
    };

    // --- 【修正ポイント3】検索イベントを最新のリストで上書き ---
    searchInput.oninput = (e) => {
        render(e.target.value);
    };

    searchInput.style.display = showSearch ? 'block' : 'none';
    searchInput.value = '';
    render(); // 最初に全リストを表示
    
    menu.style.display = 'block';

    // 外側クリック監視
    activeCloseHandler = (e) => {
        if (menu && !menu.contains(e.target)) {
            closeDropdown();
        }
    };
    setTimeout(() => document.addEventListener('click', activeCloseHandler), 100);
}

// ドロップダウンを閉じる共通関数
function closeDropdown() {
    const menu = document.getElementById('dropdown-menu');
    if (menu) {
        menu.style.display = 'none';
    }
    if (activeCloseHandler) {
        document.removeEventListener('click', activeCloseHandler);
        activeCloseHandler = null;
    }
}
