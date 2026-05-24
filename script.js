let currentEnemy = null;

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
        // input.focus();    // すぐに入力できる状態にする
    }
}

// B. リストの絞り込み（文字を打ったとき）
function filterList() {
    const query = document.getElementById('targetInput').value.toLowerCase();
    const suggestions = document.getElementById('targetSuggestions');
    suggestions.innerHTML = '';

    // enemyDataから部分一致で抽出
    const filtered = enemyData.filter(enemy => 
        (enemy.name + " " + (enemy.search || "")).toLowerCase().includes(query)
    );

    filtered.forEach(enemy => {
        const div = document.createElement('div');
        div.textContent = enemy.name;
        
        div.onclick = function() {
            // 選択した名前をボタンに反映
            document.getElementById('targetSelectBtn').textContent = enemy.name;
            currentEnemy = enemy;
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
    const levelBox = document.getElementById("level-box");
    const levelInput = document.getElementById("e-level");
    
    document.getElementById('e-attribute').value = data.attr;
    let sta = data.sta;
    let atk = data.atk;
    let def = data.def;
    if (data.levUp) {
        const lev = parseInt(document.getElementById("e-level").value) || 1;
        if (typeof sta === "function") sta = sta(lev);
        if (typeof atk === "function") atk = atk(lev);
        if (typeof def === "function") def = def(lev);
    }
    document.getElementById('e-sta').value = sta;
    document.getElementById('e-atk').value = atk;
    document.getElementById('e-def').value = def;
    document.getElementById('e-ability').value = data.ability;

    const nameInput = document.getElementById("e-name");
    const btn = document.getElementById("targetSelectBtn");
    
    if(data.custom){
         nameInput.value = "";
    } else {
         const cleanName = data.name.replace(/^Lv\.[^:]+:/, "");
         nameInput.value = cleanName;
    }

    btn.textContent = nameInput.value || "名前を入力してください";

    // --- レベル入力欄の表示制御 ---
    if (data.levUp) {
        levelBox.style.display = "flex";   // ← CSSのstatus-itemと揃える
    } else {
        levelBox.style.display = "none";
    }
}

document.getElementById("e-level").addEventListener("input", function(){
    if(currentEnemy){
        applyEnemyStats(currentEnemy);
    }
});

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

    const nameInput = document.getElementById("e-name");
    const btn = document.getElementById("targetSelectBtn");
    if(nameInput){
        nameInput.addEventListener("input", function(){
            btn.textContent = this.value || "討伐対象を選択してください";
        });
    }
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
 * 重ねボタン、画面の表示から直接武器名を取得して同期する
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

/**
 * 防具の固有アビリティに基づいて、付与アビリティを同期する
 */
function syncArmorAbi(num, mode) {
    const armorDisplayName = document.getElementById(`select-armor-${num}`).textContent.trim();
    if (armorDisplayName === "未選択") return;

    const armorData = armorList.find(a => a.name === armorDisplayName);
    if (!armorData || !armorData.ability || armorData.ability === "なし") return;

    const baseAbiName = armorData.ability;

    // ★修正ポイント：data.js に定義した ARMOR_SYNC_MAP を参照する
    const setting = ARMOR_SYNC_MAP[baseAbiName];

    if (setting) {
        const targetAbiName = (mode === 'solo') ? setting.solo : setting.kyoku;
        document.getElementById(`select-a-abi-${num}`).textContent = targetAbiName;
        updatePhantomStats(num);
        
        console.log(`幻獣${num}: ${baseAbiName} → ${mode}用アビを同期しました`);
    }
}

// 装備込みステータスの計算
function updatePhantomStats(num = 1) {
    // 1. 入力値の取得
    const base = {
        sta: parseInt(document.getElementById(`base-sta-${num}`).value) || 0,
        atk: parseInt(document.getElementById(`base-atk-${num}`).value) || 0,
        def: parseInt(document.getElementById(`base-def-${num}`).value) || 0,
        luck: parseInt(document.getElementById(`base-luck-${num}`).value) || 0,
        element: document.getElementById(`input-element-${num}`).value
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
        luck: base.luck,
        element: base.element
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
        luck: current.luck,
        element: current.element
    };

    // 6. 画面に反映
    document.getElementById(`res-sta-${num}`).textContent = finalResult.sta;
    document.getElementById(`res-atk-${num}`).textContent = finalResult.atk;
    document.getElementById(`res-def-${num}`).textContent = finalResult.def;
    document.getElementById(`res-luck-${num}`).textContent = finalResult.luck;

    const resElem = document.getElementById(`res-element-${num}`);
    if (resElem) {
        resElem.textContent = finalResult.element;
    }
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
            luck: stats.luck + (bonus.luck || 0),
            element: bonus.element || stats.element
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

// 幻獣保存画面を閉じる関数
function closePhantomSaveModal() {
    document.getElementById('phantom-save-modal').style.display = 'none';
}

/**
 * 1. 保存先スロットを選択するメニューを表示（マイ武器と同じ見た目に大改造）
 * @param {number} num - 幻獣の番号 (1〜4)
 */
function openSaveTargetList(num) {
    const modal = document.getElementById('phantom-save-modal');
    const listContainer = document.getElementById('phantom-save-list');
    
    listContainer.innerHTML = ''; // リストを一旦空にする

    // 1〜30のスロットをループして生成
    for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
        const savedData = JSON.parse(localStorage.getItem(`savedPhantom_${i}`));
        const li = document.createElement('li');
        
        li.textContent = savedData ? `${i}: ${savedData.name}` : `${i}: ---`;
        
        // マイ武器保存と同じデザインスタイルを適用
        li.style.padding = "18px 10px";
        li.style.cursor = "pointer";
        li.style.borderBottom = "1px solid #eee";
        li.style.color = "#333";
        li.style.textAlign = "left";

        li.onclick = () => {
            // スロットがクリックされたら、今までの保存関数を実行
            savePhantomData(num, i);
            closePhantomSaveModal(); // 保存したらモーダルを閉じる
        };

        listContainer.appendChild(li);
    }

    modal.style.display = 'flex'; // モーダルを表示
}

/**
 * 2. 実際に localStorage へ保存（アラート後の古いクローズ処理だけ修正）
 */
let lastUsedSlot = { 1: null, 2: null, 3: null, 4: null };
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

    lastUsedSlot[unitNum] = slotIndex;
    alert(`スロット ${slotIndex} に「${data.name}」を保存しました。`);
}

/**
 * 上書きボタン用の関数
 */
function handleOverwrite(unitNum) {
    const currentSlot = lastUsedSlot[unitNum];
    if (currentSlot !== null) {
        // すでにスロット番号がある場合は、そのまま保存処理へ
        savePhantomData(unitNum, currentSlot);
    } else {
        // 番号がない（未保存・未読込）なら、スロット選択を開く
        openSaveTargetList(unitNum);
    }
}

/**
 * 幻獣の読み込み（ロード）画面を開く関数
 * HTMLの onclick="openLoadList(1)" から呼び出され、共通ドロップダウンへ繋ぎます
 */
function openLoadList(num) {
    const targetElement = document.getElementById(`display-name-${num}`).parentElement;
    const mockEvent = {
        currentTarget: targetElement
    };
    openDropdown('load', num, mockEvent);
}

/**
 * すべてのリスト表示（武器・防具・読込）を一括管理する
 */
function openDropdown(type, num, event) {
    const menu = document.getElementById('dropdown-menu');
    const list = document.getElementById('dropdown-items');
    const searchInput = document.getElementById('dropdown-search');

    // 【重要】これまでの検索命令を一旦リセット
    if (activeCloseHandler) document.removeEventListener('click', activeCloseHandler);
    searchInput.oninput = null; 

    // --- A. 表示するデータの仕分け ---
    let listData = [];
    let showSearch = true; 

    if (type === 'weapon') listData = weaponList;
    else if (type === 'armor') listData = armorList;
    else if (type === 'w-ability') listData = weaponAbilityList;
    else if (type === 'a-ability') listData = armorAbilityList;
    else if (type === 'load') {
        // 保存（save）は専用モーダルへ移行したため、純粋に読み込み（load）のデータ作成のみを行う
        showSearch = true; 
        for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
            const savedData = JSON.parse(localStorage.getItem(`savedPhantom_${i}`));
            listData.push({ 
                name: savedData ? `${i}: ${savedData.name}` : `${i}: ---`, 
                slot: i,
                hasData: !!savedData
            });
        }
    }

    // --- B. CSS表示の切り替え ---
    menu.classList.remove('save-modal-mode'); // ロード画面はボタンの横に表示
    menu.style.display = 'block';
    const rect = event.currentTarget.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;

    // --- C. リスト描画（検索するたびにここが動く） ---
    const render = (query = "") => {
        list.innerHTML = '';
        listData.filter(item => 
            (item.name || "").toLowerCase().includes(query.toLowerCase()) && item.name !== "未選択"
        ).forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.onclick = (e) => {
                e.stopPropagation();
                
                if (type === 'load') {
                    // ロード処理（前半のJSにある既存のloadPhantomDataを呼び出す）
                    if (typeof loadPhantomData === 'function') {
                        loadPhantomData(num, item.slot);
                    }
                } else {
                    const idMap = { 'weapon':`select-weapon-${num}`, 'armor':`select-armor-${num}`, 'w-ability':`select-w-abi-${num}`, 'a-ability':`select-a-abi-${num}` };
                    document.getElementById(idMap[type]).textContent = item.name;
                    updatePhantomStats(num);
                }
                closeDropdown();
            };
            list.appendChild(li);
        });
    };

    // --- D. 検索窓の再設定 ---
    searchInput.style.display = showSearch ? 'block' : 'none';
    searchInput.value = '';
    searchInput.oninput = (e) => render(e.target.value); 

    render(); // 初期表示
    list.scrollTop = 0;

    // 外側クリックで閉じる処理
    const currentBtn = event.currentTarget;
    activeCloseHandler = (e) => {
        if (menu.contains(e.target)) return;
        if (currentBtn && currentBtn.contains(e.target)) return;
        closeDropdown();
    };

    setTimeout(() => {
        document.addEventListener('click', activeCloseHandler);
    }, 100);
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

function updateTotalStats() {
    for (let i = 1; i <= 4; i++) {
        updatePhantomStats(i);
    }
}

// 武器・防具リストについて
document.addEventListener('DOMContentLoaded', () => {
    // 1. 武器用・防具用でそれぞれ30枠のデータを用意
    const weaponSlots = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    const armorSlots = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

    // マイ装備専用の外側クリック監視役
    let customCloseHandler = null;

    // 2. リストを画面に生成して、ドロップダウンを表示する関数
    function openCustomDropdown(type, id, event) {
        if (event) event.stopPropagation();

        const dropdownMenu = document.getElementById('dropdown-menu');
        const dropdownItems = document.getElementById('dropdown-items');
        if (!dropdownMenu || !dropdownItems) return;

        if (customCloseHandler) {
            document.removeEventListener('click', customCloseHandler);
        }

        dropdownItems.innerHTML = '';

        let clickedBox = null;
        let targetSlots = [];

        if (type === 'custom-weapon') {
            clickedBox = id;
            targetSlots = weaponSlots;
        } else if (type === 'custom-armor') {
            clickedBox = id;
            targetSlots = armorSlots;
        } 

        if (!clickedBox) return;

        const num = clickedBox.id.split('-').pop();

        // 1〜30のスロットをループしてリストを生成
        for (let i = 1; i <= 30; i++) {
            const li = document.createElement('li');

            if (type === 'custom-weapon') {
                // ⚔️ 武器のときの処理（いままで通り）
                const savedData = JSON.parse(localStorage.getItem(`customWeapon_${i}`));
                li.textContent = savedData ? `${i}: ${savedData.saveName}` : `${i}: ---`;
                
                li.addEventListener('click', () => {
                    if (savedData) {
                        clickedBox.firstChild.textContent = `${i}: ${savedData.saveName} `;
                        document.getElementById(`select-weapon-${num}`).textContent = savedData.weaponName;
                        document.getElementById(`select-w-abi-${num}`).textContent = savedData.wAbi;
                        document.getElementById(`plus-weapon-${num}`).value = savedData.wPlus;
                        updatePhantomStats(num);
                    } else {
                        clickedBox.firstChild.textContent = i + " ";
                    }
                    closeDropdownMenu();
                });

            } else if (type === 'custom-armor') {
                // 🛡️ 防具のときの処理（新しく追加）
                const savedData = JSON.parse(localStorage.getItem(`customArmor_${i}`));
                li.textContent = savedData ? `${i}: ${savedData.saveName}` : `${i}: ---`;
                
                li.addEventListener('click', () => {
                    if (savedData) {
                        // マイ防具のボタンに「番号: 保存名」を表示
                        clickedBox.firstChild.textContent = `${i}: ${savedData.saveName} `;
                        
                        // 防具名・付与アビ・強化値にデータを反映
                        document.getElementById(`select-armor-${num}`).textContent = savedData.armorName;
                        document.getElementById(`select-a-abi-${num}`).textContent = savedData.aAbi;
                        document.getElementById(`plus-armor-${num}`).value = savedData.aPlus;
                        
                        // ステータス再計算関数（もしあれば）
                        if (typeof updatePhantomStats === 'function') {
                            updatePhantomStats(num);
                        }
                    } else {
                        clickedBox.firstChild.textContent = i + " ";
                    }
                    closeDropdownMenu();
                });
            }

            dropdownItems.appendChild(li);
        }

        // 共通のクローズ処理をスッキリさせるための補助関数
        function closeDropdownMenu() {
            dropdownMenu.style.display = 'none';
            dropdownMenu.style.width = "";
            document.removeEventListener('click', customCloseHandler);
            customCloseHandler = null;
        }

        // 3. ドロップダウンの位置と「横幅」の制御（以下、いままで通り）
        const rect = clickedBox.getBoundingClientRect();
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = `${window.scrollY + rect.bottom}px`;
        dropdownMenu.style.width = "auto";
        dropdownMenu.style.left = `${window.scrollX + rect.left}px`;
        const windowWidth = document.documentElement.clientWidth;
        dropdownMenu.style.right = `${windowWidth - (window.scrollX + rect.right)}px`;
        
        dropdownMenu.style.display = 'block';

        customCloseHandler = (e) => {
            if (!dropdownMenu.contains(e.target) && !clickedBox.contains(e.target)) {
                closeDropdownMenu();
            }
        };

        setTimeout(() => {
            document.addEventListener('click', customCloseHandler);
        }, 50);
    }

    // 4 ⚔️🛡️ 幻獣1〜4のマイ武器・マイ防具ボックスをクリックしたとき（自動ループ設定）
    for (let i = 1; i <= 4; i++) {
        const weaponBox = document.getElementById(`select-custom-weapon-${i}`);
        if (weaponBox) {
            weaponBox.addEventListener('click', (e) => {
                openCustomDropdown('custom-weapon', e.currentTarget, e); 
            });
        }

        const armorBox = document.getElementById(`select-custom-armor-${i}`);
        if (armorBox) {
            armorBox.addEventListener('click', (e) => {
                openCustomDropdown('custom-armor', e.currentTarget, e); 
            });
        }
    }
});

// マイ武器保存画面を閉じる関数
function closeCustomWeaponSaveModal() {
    document.getElementById('custom-weapon-save-modal').style.display = 'none';
}

/**
 * マイ武器保存ボタンを押した時に画面を開く関数
 * @param {number} num - 幻獣の番号 (1〜4)
 */
function openCustomWeaponSave(num) {
    const modal = document.getElementById('custom-weapon-save-modal');
    const nameInput = document.getElementById('custom-weapon-save-name');
    const listContainer = document.getElementById('custom-weapon-save-list');
    
    // 今画面に入力されている「武器名（アビ名：武器名）」を取得
    let currentWeapon = document.getElementById(`select-weapon-${num}`).textContent.trim();
    
    // もし武器名に「:」や「：」が含まれていたら、それより後ろ（純粋な武器名）だけを抜き出す
    if (currentWeapon.includes(':')) {
        currentWeapon = currentWeapon.split(':').pop().trim();
    } else if (currentWeapon.includes('：')) {
        currentWeapon = currentWeapon.split('：').pop().trim();
    }
    
    nameInput.value = "";
    listContainer.innerHTML = '';

    for (let i = 1; i <= 30; i++) {
        const savedData = JSON.parse(localStorage.getItem(`customWeapon_${i}`));
        const li = document.createElement('li');
        
        li.textContent = savedData ? `${i}: ${savedData.saveName}` : `${i}: ---`;
        
        li.style.padding = "10px";
        li.style.cursor = "pointer";
        li.style.borderBottom = "1px solid #eee";

        li.onclick = () => {
            let typedName = nameInput.value.trim();

            const currentWAbi = document.getElementById(`select-w-abi-${num}`).textContent.trim();
            const currentWPlus = document.getElementById(`plus-weapon-${num}`).value;

            // 名前が空っぽのとき、アビ名を除いた「純粋な武器名」を使って自動命名（全角空白区切り）
            if (!typedName) {
                typedName = `${currentWeapon} ${currentWAbi} +${currentWPlus}`;
            }
            
            const weaponData = {
                saveName: typedName,
                weaponName: document.getElementById(`select-weapon-${num}`).textContent.trim(), // 反映用に元の「アビ名：武器名」で保存
                wAbi: currentWAbi,
                wPlus: currentWPlus
            };

            // localStorage に保存
            localStorage.setItem(`customWeapon_${i}`, JSON.stringify(weaponData));
            
            // 保存した瞬間に、右側のマイ武器ボタンの表示も「i: 保存名」に書き換える
            const customWeaponBox = document.getElementById(`select-custom-weapon-${num}`);
            if (customWeaponBox) {
                customWeaponBox.firstChild.textContent = `${i}: ${typedName} `;
            }
            
            alert(`スロット ${i} に「${typedName}」を保存しました。`);
            closeCustomWeaponSaveModal();
        };

        listContainer.appendChild(li);
    }

    modal.style.display = 'flex';
}

/**
 * マイ武器の上書きボタンを押した時の処理（「番号: 名前」の対応版）
 * @param {number} num - 幻獣の番号 (1〜4)
 */
function handleWeaponOverwrite(num) {
    const customWeaponBox = document.getElementById(`select-custom-weapon-${num}`);
    if (!customWeaponBox) return;
    
    let currentDisplayName = customWeaponBox.firstChild.textContent.trim();

    // 何も選択されていない初期状態なら処理をしない
    if (!currentDisplayName || currentDisplayName === "未選択" || !isNaN(currentDisplayName)) {
        alert("マイ武器が選択されていないため、上書きできません。");
        return;
    }

    // 💡【重要】ボタンの表示が「1: 名前」になっているので、コロンより後ろの純粋な「保存名」だけを抜き出す
    if (currentDisplayName.includes(':')) {
        currentDisplayName = currentDisplayName.split(':').slice(1).join(':').trim();
    }

    // localStorage（1〜30）の中から一致するスロットを検索
    let targetSlotIndex = null;
    for (let i = 1; i <= 30; i++) {
        const savedData = JSON.parse(localStorage.getItem(`customWeapon_${i}`));
        if (savedData && savedData.saveName === currentDisplayName) {
            targetSlotIndex = i;
            break;
        }
    }

    if (targetSlotIndex === null) {
        alert("一致する保存データが見つかりませんでした。新しく保存し直してください。");
        return;
    }

    // 画面に文字入力ポップアップを出して名前を確認・変更できる
    let newSaveName = prompt("保存名を確認・変更してください：", currentDisplayName);

    // キャンセルされたら処理を中止
    if (newSaveName === null) return; 

    newSaveName = newSaveName.trim();

    // 空欄にされた場合は自動命名（全角空白区切り）
    if (!newSaveName) {
        let pureWeaponName = document.getElementById(`select-weapon-${num}`).textContent.trim();
        if (pureWeaponName.includes(':')) pureWeaponName = pureWeaponName.split(':').pop().trim();
        if (pureWeaponName.includes('：')) pureWeaponName = pureWeaponName.split('：').pop().trim();

        const currentWAbi = document.getElementById(`select-w-abi-${num}`).textContent.trim();
        const currentWPlus = document.getElementById(`plus-weapon-${num}`).value;
        newSaveName = `${pureWeaponName} ${currentWAbi} +${currentWPlus}`;
    }

    const currentWeapon = document.getElementById(`select-weapon-${num}`).textContent.trim();
    const currentWAbi = document.getElementById(`select-w-abi-${num}`).textContent.trim();
    const currentWPlus = document.getElementById(`plus-weapon-${num}`).value;

    const updatedData = {
        saveName: newSaveName,
        weaponName: currentWeapon,
        wAbi: currentWAbi,
        wPlus: currentWPlus
    };

    // localStorage に上書き保存
    localStorage.setItem(`customWeapon_${targetSlotIndex}`, JSON.stringify(updatedData));

    // 右側のマイ武器ボタンの表示名も、最新の「スロット番号: 新しい名前」に書き換える
    customWeaponBox.firstChild.textContent = `${targetSlotIndex}: ${newSaveName} `;

    alert(`スロット ${targetSlotIndex} を「${newSaveName}」として上書き保存しました。`);
}

// マイ防具保存画面を閉じる関数
function closeCustomArmorSaveModal() {
    document.getElementById('custom-armor-save-modal').style.display = 'none';
}

/**
 * マイ防具保存ボタンを押した時に画面を開く関数
 * @param {number} num - 幻獣の番号 (1〜4)
 */
function openArmorSaveList(num) {
    const modal = document.getElementById('custom-armor-save-modal');
    const nameInput = document.getElementById('custom-armor-save-name');
    const listContainer = document.getElementById('custom-armor-save-list');
    
    // 今画面に入力されている「防具名」を取得
    let currentArmor = document.getElementById(`select-armor-${num}`).textContent.trim();
    
    // もし防具名に「:」や「：」が含まれていたら、それより後ろ（純粋な防具名）だけを抜き出す
    if (currentArmor.includes(':')) {
        currentArmor = currentArmor.split(':').pop().trim();
    } else if (currentArmor.includes('：')) {
        currentArmor = currentArmor.split('：').pop().trim();
    }
    
    nameInput.value = "";
    listContainer.innerHTML = '';

    for (let i = 1; i <= 30; i++) {
        const savedData = JSON.parse(localStorage.getItem(`customArmor_${i}`));
        const li = document.createElement('li');
        
        li.textContent = savedData ? `${i}: ${savedData.saveName}` : `${i}: ---`;
        
        li.style.padding = "10px";
        li.style.cursor = "pointer";
        li.style.borderBottom = "1px solid #eee";

        li.onclick = () => {
            let typedName = nameInput.value.trim();

            const currentAAbi = document.getElementById(`select-a-abi-${num}`).textContent.trim();
            const currentAPlus = document.getElementById(`plus-armor-${num}`).value;

            // 名前が空っぽのとき、アビ名を除いた「純粋な防具名」を使って自動命名
            if (!typedName) {
                typedName = `${currentArmor} ${currentAAbi} +${currentAPlus}`;
            }
            
            const armorData = {
                saveName: typedName,
                armorName: document.getElementById(`select-armor-${num}`).textContent.trim(), // 反映用に元の「アビ名：防具名」で保存
                aAbi: currentAAbi,
                aPlus: currentAPlus
            };

            // localStorage に「customArmor_番号」で保存
            localStorage.setItem(`customArmor_${i}`, JSON.stringify(armorData));
            
            // 保存した瞬間に、右側のマイ防具ボタンの表示も「i: 保存名」に書き換える
            const customArmorBox = document.getElementById(`select-custom-armor-${num}`);
            if (customArmorBox) {
                customArmorBox.firstChild.textContent = `${i}: ${typedName} `;
            }
            
            alert(`スロット ${i} に「${typedName}」を保存しました。`);
            closeCustomArmorSaveModal();
        };

        listContainer.appendChild(li);
    }

    modal.style.display = 'flex';
}

/**
 * マイ防具の上書きボタンを押した時の処理
 * @param {number} num - 幻獣の番号 (1〜4)
 */
function handleArmorOverwrite(num) {
    const customArmorBox = document.getElementById(`select-custom-armor-${num}`);
    if (!customArmorBox) return;
    
    let currentDisplayName = customArmorBox.firstChild.textContent.trim();

    // 何も選択されていない初期状態なら処理をしない
    if (!currentDisplayName || currentDisplayName === "未設定" || currentDisplayName === "未選択" || !isNaN(currentDisplayName)) {
        alert("マイ防具が選択されていないため、上書きできません。");
        return;
    }

    // ボタンの表示が「1: 名前」になっているので、コロンより後ろの純粋な「保存名」だけを抜き出す
    if (currentDisplayName.includes(':')) {
        currentDisplayName = currentDisplayName.split(':').slice(1).join(':').trim();
    }

    // localStorage（1〜30）の中から一致するスロットを検索
    let targetSlotIndex = null;
    for (let i = 1; i <= 30; i++) {
        const savedData = JSON.parse(localStorage.getItem(`customArmor_${i}`));
        if (savedData && savedData.saveName === currentDisplayName) {
            targetSlotIndex = i;
            break;
        }
    }

    if (targetSlotIndex === null) {
        alert("一致する保存データが見つかりませんでした。新しく保存し直してください。");
        return;
    }

    // 画面に文字入力ポップアップを出して名前を確認・変更できる
    let newSaveName = prompt("保存名を確認・変更してください：", currentDisplayName);

    // キャンセルされたら処理を中止
    if (newSaveName === null) return; 

    newSaveName = newSaveName.trim();

    // 空欄にされた場合は自動命名
    if (!newSaveName) {
        let pureArmorName = document.getElementById(`select-armor-${num}`).textContent.trim();
        if (pureArmorName.includes(':')) pureArmorName = pureArmorName.split(':').pop().trim();
        if (pureArmorName.includes('：')) pureArmorName = pureArmorName.split('：').pop().trim();

        const currentAAbi = document.getElementById(`select-a-abi-${num}`).textContent.trim();
        const currentAPlus = document.getElementById(`plus-armor-${num}`).value;
        newSaveName = `${pureArmorName} ${currentAAbi} +${currentAPlus}`;
    }

    const currentArmor = document.getElementById(`select-armor-${num}`).textContent.trim();
    const currentAAbi = document.getElementById(`select-a-abi-${num}`).textContent.trim();
    const currentAPlus = document.getElementById(`plus-armor-${num}`).value;

    const updatedData = {
        saveName: newSaveName,
        armorName: currentArmor,
        aAbi: currentAAbi,
        aPlus: currentAPlus
    };

    // localStorage に上書き保存
    localStorage.setItem(`customArmor_${targetSlotIndex}`, JSON.stringify(updatedData));

    // 右側のマイ防具ボタンの表示名も、最新の「スロット番号: 新しい名前」に書き換える
    customArmorBox.firstChild.textContent = `${targetSlotIndex}: ${newSaveName} `;

    alert(`スロット ${targetSlotIndex} を「${newSaveName}」として上書き保存しました。`);
}
