// 武器リスト
const weaponList = [
    { name: "未選択", grade: 0, baseAtk: 0, ability: "なし" },
    { name: "疾風：颶風連鎖刃", grade: 10, baseAtk: 520, ability: "疾風" },
    { name: "猛突：インペリアルランス", grade: 9, baseAtk: 265, ability: "猛突" },
    { name: "猛突：思い出の管楽器", grade: 7, baseAtk: 120, ability: "猛突" },
    { name: "猛突：芽吹きのハープ", grade: 5, baseAtk: 60, ability: "猛突" },
    { name: "猛突：気合いの鉢巻", grade: 4, baseAtk: 30, ability: "猛突" },
    { name: "突風：精霊の弓矢", grade: 9, baseAtk: 240, ability: "突風" },
    { name: "突風：鴉扇", grade: 8, baseAtk: 170, ability: "突風" },
    { name: "突風：桜吹雪", grade: 7, baseAtk: 150, ability: "突風" },
    { name: "突風：ウインドスピアー", grade: 6, baseAtk: 100, ability: "突風" },
    { name: "凍結：アイスダガー", grade: 6, baseAtk: 120, ability: "凍結" },
    { name: "凍結：アイスサイズ", grade: 5, baseAtk: 90, ability: "凍結" },
    { name: "凍結：アイスボウ", grade: 3, baseAtk: 50, ability: "凍結" },
    { name: "凍結：義理チョコ", grade: 3, baseAtk: 20, ability: "凍結" },
    { name: "紅舞：ブラッディローズ", grade: 10, baseAtk: 780, ability: "紅舞" },
    { name: "紅舞：衝天ノ神楽鉾", grade: 9, baseAtk: 250, ability: "紅舞" },
    { name: "紅舞：丹青の打楽器", grade: 3, baseAtk: 5, ability: "紅舞" },
    { name: "高揚：エンドオブルイン", grade: 9, baseAtk: 240, ability: "高揚" },
    { name: "高揚：斬魔刀", grade: 8, baseAtk: 200, ability: "高揚" },
    { name: "高揚：金剛双刃", grade: 8, baseAtk: 200, ability: "高揚" },
    { name: "高揚：リリジェンアーク", grade: 7, baseAtk: 190, ability: "高揚" },
    { name: "高揚：脈打つ打楽器", grade: 7, baseAtk: 120, ability: "高揚" },
    { name: "高揚：銀狐の絵筆", grade: 5, baseAtk: 10, ability: "高揚" },
    { name: "盟旗：天響の尖槍", grade: 7, baseAtk: 120, ability: "盟旗" },
    { name: "盟旗：虎将の軍配", grade: 5, baseAtk: 100, ability: "盟旗" },
    { name: "不乱：天巴之御佩刀", grade: 9, baseAtk: 310, ability: "不乱" },
    { name: "不乱：仁双応", grade: 9, baseAtk: 220, ability: "不乱" },
    { name: "不乱：金狐の絵筆", grade: 5, baseAtk: 10, ability: "不乱" },
    { name: "壮健：朧蒼月", grade: 10, baseAtk: 500, ability: "壮健" },
    { name: "壮健：轟天の大槍", grade:9 , baseAtk: 200, ability: "壮健" },
    { name: "大撃：レーヴァテイン『戒』", grade: 9, baseAtk: 240, ability: "大撃" },
    { name: "大撃：エヴィルサイズ", grade: 8, baseAtk: 190, ability: "大撃" },
    { name: "大撃：デス・サイズ", grade: 7, baseAtk: 130, ability: "大撃" },
    { name: "大撃：懐旧の記録盤", grade: 7, baseAtk: 120, ability: "大撃" },
    { name: "大撃：ゴールドソード", grade: 7, baseAtk: 1, ability: "大撃" },
    { name: "大撃：蒼狐の絵筆", grade: 5, baseAtk: 10, ability: "大撃" },
    { name: "五月雨：都牟刈大刀", grade: 7, baseAtk: 160, ability: "五月雨" },
    { name: "五月雨：壮烈な管楽器", grade: 7, baseAtk: 120, ability: "五月雨" },
    { name: "五月雨：金のレイピア", grade: 6, baseAtk: 95, ability: "五月雨" },
    { name: "五月雨：レイピア", grade: 4, baseAtk: 65, ability: "五月雨" },
    { name: "五月雨：三色団子", grade: 4, baseAtk: 50, ability: "五月雨" },
    { name: "強打：荒ぶるターキー", grade: 7, baseAtk: 160, ability: "強打" },
    { name: "強打：ソウルイーター", grade: 6, baseAtk: 120, ability: "強打" },
    { name: "強打：げんこつ斧", grade: 2, baseAtk:35 , ability: "強打" },
    { name: "粉砕：ギガントマキア", grade: 10, baseAtk: 450, ability: "粉砕" },
    { name: "粉砕：アルマース", grade: 9, baseAtk: 210, ability: "粉砕" },
    { name: "粉砕：コランダム", grade: 7, baseAtk: 160, ability: "粉砕" },
    { name: "粉砕：一升瓶", grade: 5, baseAtk: 50, ability: "粉砕" },
    { name: "粉砕：砕けた西瓜", grade: 5, baseAtk: 50, ability: "粉砕" },
    { name: "粉砕：大根", grade: 5, baseAtk:45 , ability: "粉砕" },
    { name: "一斉：布都御魂", grade: 9, baseAtk: 210, ability: "一斉" },
    { name: "一斉：火ノ迦具土", grade: 8, baseAtk: 160, ability: "一斉" },
    { name: "一斉：旋律の弦楽器", grade: 7, baseAtk: 120, ability: "一斉" },
    { name: "一斉：日本刀", grade: 5, baseAtk: 80, ability: "一斉" },
    { name: "一斉：ハリセン", grade: 5, baseAtk: 5, ability: "一斉" },
    { name: "一斉：飛苦無", grade: 4, baseAtk: 45, ability: "一斉" },
    { name: "破茶：ニャンダフルワンド", grade: 5, baseAtk: 10, ability: "破茶" },
    { name: "天晴：照吉丸", grade: 10, baseAtk: 80, ability: "天晴" },
    { name: "福音：天啓の聖鐘", grade: 10, baseAtk: 120, ability: "福音" },
    { name: "福音：交信石", grade: 5, baseAtk: 25, ability: "福音" },
    { name: "爽活：プリマステラ", grade: 10, baseAtk: 120, ability: "爽活" },
    { name: "爽活：フルールロッド", grade: 7, baseAtk: 120, ability: "爽活" },
    { name: "癒唄：バルゴの祝福", grade: 8, baseAtk: 175, ability: "癒唄" },
    { name: "癒唄：マジックスタッフ", grade: 5, baseAtk: 70, ability: "癒唄" },
    { name: "癒唄：極盛チョコクレープ", grade: 4, baseAtk: 125, ability: "癒唄" },
    { name: "回復：魔法使いの杖", grade: 3, baseAtk: 40, ability: "回復" },
    { name: "和属：アストラルスフィア", grade: 10, baseAtk: 650, ability: "和属" },
    { name: "和属：陸志の結扇", grade: 9, baseAtk: 180, ability: "和属" },
    { name: "和属：エルテの宝杖", grade: 6, baseAtk: 110, ability: "和属" },
    { name: "獣属：獅子砕牙", grade: 8, baseAtk: 185, ability: "獣属" },
    { name: "獣属：猛獅子の証", grade: 5, baseAtk: 85, ability: "獣属" },
    { name: "獣属：レッドジェミニ", grade: 5, baseAtk: 50, ability: "獣属" },
    { name: "獣属：ねこパンチ", grade: 4, baseAtk: 80, ability: "獣属" },
    { name: "魔属：ケリュケイオン", grade: 8, baseAtk: 185, ability: "魔属" },
    { name: "魔属：フラジェルム", grade: 4, baseAtk: 85, ability: "魔属" },
    { name: "魔属：小悪魔ナイフ", grade: 4, baseAtk: 80, ability: "魔属" },
    { name: "霊属：レーヴァテイン", grade: 8, baseAtk: 220, ability: "霊属" },
    { name: "霊属：魅惑の肉球", grade: 5, baseAtk: 50, ability: "霊属" },
    { name: "霊属：猛獣用ムチ", grade: 4, baseAtk: 80, ability: "霊属" },
    { name: "無属：弓生矢", grade: 9, baseAtk: 190, ability: "無属" },
    { name: "無属：ティンクルロッド", grade: 4, baseAtk: 80, ability: "無属" },
    { name: "地属：バルムンク", grade: 9, baseAtk: 190, ability: "地属" },
    { name: "地属：大地の鉤爪", grade: 5, baseAtk: 50, ability: "地属" },
    { name: "地属：妖刀『龍殺し』", grade: 4, baseAtk: 80, ability: "地属" },
    { name: "龍属：竜族の紋章", grade: 8, baseAtk: 185, ability: "龍属" },
    { name: "龍属：ドラゴンファング", grade: 5, baseAtk: 85, ability: "龍属" },
    { name: "龍属：ドラゴンクロー", grade: 4, baseAtk: 80, ability: "龍属" },
    { name: "なし：エクスカリバー", grade: 7, baseAtk: 160, ability: "なし" },
    { name: "なし：グレイトソード", grade: 6, baseAtk: 120, ability: "なし" },
    { name: "なし：メガアックス", grade: 5, baseAtk: 90, ability: "なし" },
    { name: "なし：手提げ提灯", grade: 5, baseAtk: 50, ability: "なし" },
    { name: "なし：導きのベル", grade: 5, baseAtk: 30, ability: "なし" },
    { name: "なし：破魔矢", grade: 4, baseAtk: 90, ability: "なし" },
    { name: "なし：かまいたち", grade: 4, baseAtk: 75, ability: "なし" },
    { name: "なし：重い槍", grade: 4, baseAtk: 65, ability: "なし" },
    { name: "なし：カチンコ", grade: 4, baseAtk: 50, ability: "なし" },
    { name: "なし：ギャラルホルン", grade: 4, baseAtk: 50, ability: "なし" },
    { name: "なし：木枝の釣竿", grade: 4, baseAtk: 45, ability: "なし" },
    { name: "なし：兎印の杵", grade: 4, baseAtk: 45, ability: "なし" },
    { name: "なし：カタログ", grade: 4, baseAtk: 45, ability: "なし" },
    { name: "なし：背負い籠", grade: 4, baseAtk: 40, ability: "なし" },
    { name: "なし：豆鉄砲", grade: 4, baseAtk: 30, ability: "なし" },
    { name: "なし：コンパス", grade: 4, baseAtk: 30, ability: "なし" },
    { name: "なし：招待ハガキ", grade: 4, baseAtk: 20, ability: "なし" },
    { name: "なし：バトン", grade: 4, baseAtk: 20, ability: "なし" },
    { name: "なし：隠れ郷への招待状", grade: 4, baseAtk: 15, ability: "なし" },
    { name: "なし：勇者の剣", grade: 3, baseAtk: 60, ability: "なし" },
    { name: "なし：ナイフグローブ", grade: 3, baseAtk: 45, ability: "なし" },
    { name: "なし：灯篭", grade: 3, baseAtk: 40, ability: "なし" },
    { name: "なし：芽切鋏", grade: 3, baseAtk: 40, ability: "なし" },
    { name: "なし：黒き書物", grade: 3, baseAtk: 40, ability: "なし" },
    { name: "なし：イベント出店証", grade: 3, baseAtk: 35, ability: "なし" },
    { name: "なし：スプーン", grade: 3, baseAtk: 30, ability: "なし" },
    { name: "なし：樽のコルク抜き", grade: 3, baseAtk: 30, ability: "なし" },
    { name: "なし：白の手形", grade: 3, baseAtk: 30, ability: "なし" },
    { name: "なし：黒の手形", grade: 3, baseAtk: 30, ability: "なし" },
    { name: "なし：ロックボウ", grade: 2, baseAtk: 30, ability: "なし" },
    { name: "なし：過ちの杖", grade: 2, baseAtk: 30, ability: "なし" },
    { name: "なし：つるはし", grade: 2, baseAtk: 25, ability: "なし" },
    { name: "なし：カラフル熊手", grade: 2, baseAtk: 25, ability: "なし" },
    { name: "なし：エンゲージリング", grade: 2, baseAtk: 22, ability: "なし" },
    { name: "なし：果物ナイフ", grade: 2, baseAtk: 20, ability: "なし" },
    { name: "なし：ランタン", grade: 1, baseAtk: 20, ability: "なし" },
    { name: "なし：アイスピック", grade: 1, baseAtk: 15, ability: "なし" },
    { name: "なし：鉄製の弓", grade: 1, baseAtk: 10, ability: "なし" },
    { name: "なし：観覧のお供", grade: 1, baseAtk: 10, ability: "なし" },
    { name: "なし：木の棒", grade: 1, baseAtk: 5, ability: "なし" },
    { name: "武器なし", grade: 0, baseAtk: 0, ability: "なし" }
];

// 防具リスト
const armorList = [
    { name: "未選択", grade: 0, baseDef: 0, ability: "なし" },
    { name: "猛皇：蚩尤ノ冥煌鎧", grade: 10, baseDef: 245, ability: "猛皇" },
    { name: "猛将：飛翔の武冠", grade: 9, baseDef: 35, ability: "猛将" },
    { name: "虎咆：虎乗の覇気", grade: 6, baseDef: 10, ability: "虎咆" },
    { name: "闘争：ネメアーの獅子冠", grade: 9, baseDef: 40, ability: "闘争" },
    { name: "闘争：豪傑な下駄", grade: 7, baseDef: 15, ability: "闘争" },
    { name: "闘争：赤白帽", grade: 7, baseDef: 5, ability: "闘争" },
    { name: "威風：天導の司教冠", grade: 10, baseDef: 230, ability: "威風" },
    { name: "戦略：オブリビオン", grade: 8, baseDef: 180, ability: "戦略" },
    { name: "戦略：エントレンジ", grade: 5, baseDef: 70, ability: "戦略" },
    { name: "遊戯：硝子の靴", grade: 8, baseDef: 185, ability: "遊戯" },
    { name: "遊戯：氷滑の履物", grade: 5, baseDef: 70, ability: "遊戯" },
    { name: "慈恵：フェアリアルヒール", grade: 10, baseDef: 230, ability: "慈恵" },
    { name: "賢皇：綺羅羊の頭巾", grade: 10, baseDef: 460, ability: "賢皇" },
    { name: "賢将：創世の護翼", grade: 9, baseDef: 310, ability: "賢将" },
    { name: "護鶴：鶴乗の練気", grade: 6, baseDef: 290, ability: "護鶴" },
    { name: "防衛：不滅の炎翼", grade: 9, baseDef: 220, ability: "防衛" },
    { name: "防衛：蒼竜の翼", grade: 7, baseDef: 40, ability: "防衛" },                  
    { name: "鉄壁：零型YOROI『極』", grade: 8, baseDef: 180, ability: "鉄壁" },
    { name: "鉄壁：山神の面", grade: 8, baseDef: 160, ability: "鉄壁" },
    { name: "改命：プロジェクトΨ", grade: 10, baseDef: 230, ability: "改命" },
    { name: "瞑想：プロジェクトΩ", grade: 8, baseDef: 180, ability: "瞑想" },
    { name: "瞑想：プロジェクトΛ", grade: 6, baseDef: 110, ability: "瞑想" },
    { name: "砕身：瞋恚ノ鬼面", grade: 10, baseDef: 230, ability: "砕身" },
    { name: "悪戯：マッドハット", grade: 9, baseDef: 220, ability: "悪戯" },
    { name: "悪戯：オブマスカレード", grade: 7, baseDef: 120, ability: "悪戯" },
    { name: "悪戯：妖狐の尾", grade: 4, baseDef: 80, ability: "悪戯" },
    { name: "勇将：月輪麗明", grade: 9, baseDef: 500, ability: "勇将" },
    { name: "勇将：日輪光明", grade: 9, baseDef: 230, ability: "勇将" },
    { name: "生存：万斛の響鼓", grade: 9, baseDef: 170, ability: "生存" },
    { name: "雲竜：龍乗の修気", grade: 6, baseDef: 210, ability: "雲竜" },
    { name: "底力：ウィングブーツ", grade: 8, baseDef: 175, ability: "底力" },
    { name: "持久：正義の盾", grade: 5, baseDef: 70, ability: "持久" },
    { name: "成長：魔法使いの帽子", grade: 3, baseDef: 40, ability: "成長" },
    { name: "誘惑：深紅のドレス", grade: 9, baseDef: 220, ability: "誘惑" },
    { name: "誘惑：十二単", grade: 7, baseDef: 120, ability: "誘惑" },
    { name: "誘惑：常夏ビキニ", grade: 6, baseDef: 90, ability: "誘惑" },
    { name: "博打：ジャック・ディーラー", grade: 10, baseDef: 245, ability: "博打" },
    { name: "才華：奇術師のモノクル", grade: 8, baseDef: 130, ability: "才華" },
    { name: "浪漫：番傘", grade: 8, baseDef: 110, ability: "浪漫" },
    { name: "浪漫：丁半賽", grade: 5, baseDef: 61, ability: "浪漫" },
    { name: "天運：角隠し", grade: 7, baseDef: 180, ability: "天運" },
    { name: "天運：散華の杯", grade: 4, baseDef: 80, ability: "天運" },
    { name: "天運：サンタポンチョ", grade: 2, baseDef: 40, ability: "天運" },
    { name: "激運：翠色の組紐", grade: 5, baseDef: 60, ability: "激運" },
    { name: "激運：幸運の鈴", grade: 1, baseDef: 30, ability: "激運" },
    { name: "修羅：鏖魔瞳", grade: 10, baseDef: 500, ability: "修羅" },
    { name: "覇王：青藍の巫女服", grade: 9, baseDef: 240, ability: "覇王" },
    { name: "覇王：邪封じの眼帯", grade: 6, baseDef: 40, ability: "覇王" },
    { name: "覇王：戦覇の勲章", grade: 5, baseDef: 10, ability: "覇王" },
    { name: "天佑：竜騎の兜", grade: 9, baseDef: 250, ability: "天佑" },
    { name: "天佑：神楽鈴", grade: 7, baseDef: 130, ability: "天佑" },
    { name: "加護：風雅鳥帽子", grade: 7, baseDef: 120, ability: "加護" },
    { name: "加護：栄光の歩み", grade: 2, baseDef:15 , ability: "加護" },
    { name: "大帝：英明の戦衣", grade: 9, baseDef: 240, ability: "大帝" },
    { name: "一八：シバルリーエンブレム", grade: 10, baseDef: 450, ability: "一八" },
    { name: "共栄：戦乙女の翼兜", grade: 10, baseDef: 120, ability: "共栄" },
    { name: "早熟：山吹の伊達兜", grade: 9, baseDef: 10, ability: "早熟" },
    { name: "早熟：大聖の箍", grade: 7, baseDef: 50, ability: "早熟" },
    { name: "博識：太陰帽", grade: 6, baseDef: 25, ability: "博識" },
    { name: "習熟：トナカイな頭飾り", grade: 8, baseDef: 5, ability: "習熟" },
    { name: "習熟：青春の学生鞄", grade: 6, baseDef: 120, ability: "習熟" },
    { name: "習熟：空手衣", grade: 5, baseDef: 40, ability: "習熟" },
    { name: "習熟：友との日記", grade: 1, baseDef: 1, ability: "習熟" },
    { name: "強欲：エレガンス・ルコー", grade: 9, baseDef: 50, ability: "強欲" },
    { name: "絢爛：チャイナ服", grade: 6, baseDef: 25, ability: "絢爛" },
    { name: "絢爛：白薔薇コサージュ", grade: 5, baseDef: 20, ability: "絢爛" },
    { name: "絢爛：ハピネズキャップ", grade: 5, baseDef: 35, ability: "絢爛" },
    { name: "絢爛：真珠のイヤリング", grade: 5, baseDef: 20, ability: "絢爛" },
    { name: "執銭：友からの頼り", grade: 1, baseDef: 10, ability: "執銭" },
    { name: "獣属：護獅子の証", grade: 5, baseDef: 85, ability: "獣属" },
    { name: "獣属：司令官の制服", grade: 5, baseDef: 50, ability: "獣属" },
    { name: "獣属：ねこシューズ", grade: 4, baseDef: 80, ability: "獣属" },
    { name: "魔属：閣下の軍服", grade: 8, baseDef: 170, ability: "魔属" },
    { name: "魔属：悪魔の仮面", grade: 4, baseDef: 80, ability: "魔属" },
    { name: "霊属：獣耳フード", grade: 5, baseDef: 50, ability: "霊属" },
    { name: "霊属：精霊の首飾り", grade: 4, baseDef:80, ability: "霊属" },
    { name: "無属：満天の寝帽", grade: 7, baseDef: 130, ability: "無属" },
    { name: "無属：純真エプロン", grade: 4, baseDef: 30, ability: "無属" },
    { name: "地属：ガイアメイル", grade: 8, baseDef: 180, ability: "地属" },
    { name: "地属：金竜の翼", grade: 5, baseDef: 50, ability: "地属" },
    { name: "地属：土神様の衣", grade: 4, baseDef: 80, ability: "地属" },
    { name: "龍属：竜鱗のローブ", grade: 4, baseDef: 80, ability: "龍属" },
    { name: "なし：新型YOROI", grade: 7, baseDef: 140, ability: "なし" },
    { name: "なし：シルバーアーマー", grade: 7, baseDef: 130, ability: "なし" },
    { name: "なし：シルバーブーツ", grade: 6, baseDef: 120, ability: "なし" },
    { name: "なし：ブルーシールド", grade: 6, baseDef: 110, ability: "なし" },
    { name: "なし：シルバーヘルム", grade: 6, baseDef: 100, ability: "なし" },
    { name: "なし：ムガルシューズ", grade: 6, baseDef: 95, ability: "なし" },
    { name: "なし：グレイトアーマー", grade: 5, baseDef: 90, ability: "なし" },
    { name: "なし：ハードアーマー", grade: 5, baseDef: 90, ability: "なし" },
    { name: "なし：凧", grade: 4, baseDef: 90, ability: "なし" },
    { name: "なし：ナイトグローブ", grade: 4, baseDef: 75, ability: "なし" },
    { name: "なし：探検セット", grade: 4, baseDef: 69, ability: "なし" },
    { name: "なし：神職装束", grade: 4, baseDef: 65, ability: "なし" },
    { name: "なし：ブラックローブ", grade: 4, baseDef: 65, ability: "なし" },
    { name: "なし：笹舟", grade: 4, baseDef: 35, ability: "なし" },
    { name: "なし：波切り操舵", grade: 4, baseDef: 35, ability: "なし" },
    { name: "なし：紅差し", grade: 4, baseDef: 30, ability: "なし" },
    { name: "なし：日差しを遮るもの", grade: 4, baseDef: 30, ability: "なし" },
    { name: "なし：勇者の盾", grade: 3, baseDef: 60, ability: "なし" },
    { name: "なし：頑丈なグローブ", grade: 3, baseDef: 50, ability: "なし" },
    { name: "なし：さすらいマント", grade: 3, baseDef: 45, ability: "なし" },
    { name: "なし：浴衣", grade: 3, baseDef: 45, ability: "なし" },
    { name: "なし：明珠の筒飾", grade: 3, baseDef: 40, ability: "なし" },
    { name: "なし：刻の首飾", grade: 3, baseDef: 40, ability: "なし" },
    { name: "なし：金魚うちわ", grade: 3, baseDef: 40, ability: "なし" },
    { name: "なし：春草の旗", grade: 3, baseDef: 40, ability: "なし" },
    { name: "なし：冒険帽", grade: 3, baseDef: 40, ability: "なし" },
    { name: "なし：紫陽花の鈴", grade: 3, baseDef: 35, ability: "なし" },
    { name: "なし：デリバッグ", grade: 3, baseDef: 15, ability: "なし" },
    { name: "なし：南国の水着", grade: 2, baseDef: 40, ability: "なし" },
    { name: "なし：白装束", grade: 2, baseDef: 35, ability: "なし" },
    { name: "なし：グッドシューズ", grade: 2, baseDef: 30, ability: "なし" },
    { name: "なし：おしゃれシャツ", grade: 2, baseDef: 25, ability: "なし" },
    { name: "なし：清潔なグローブ", grade: 2, baseDef: 20, ability: "なし" },
    { name: "なし：逆周りの時計", grade: 2, baseDef: 20, ability: "なし" },
    { name: "なし：お多福面", grade: 2, baseDef: 20, ability: "なし" },
    { name: "なし：乗舟証", grade: 1, baseDef: 20, ability: "なし" },
    { name: "なし：作業用シューズ", grade: 1, baseDef: 15, ability: "なし" },
    { name: "なし：鍋のふた", grade: 1, baseDef: 10, ability: "なし" },
    { name: "なし：布のシャツ", grade: 1, baseDef: 5, ability: "なし" },
    { name: "防具なし", grade: 0, baseDef: 0, ability: "なし" }
];

// 武器アビリティリスト
const weaponAbilityList = [
    { name: "未選択" },
    { name: "疾風" },
    { name: "猛突" },
    { name: "突風" },
    { name: "凍結" },
    { name: "紅舞" },
    { name: "高揚" },
    { name: "盟旗" },
    { name: "不乱" },
    { name: "壮健" },
    { name: "大撃" },
    { name: "五月雨" },
    { name: "強打" },
    { name: "粉砕" },
    { name: "一斉" },
    { name: "破茶" },
    { name: "天晴" },
    { name: "福音" },
    { name: "爽活" },
    { name: "癒唄" },
    { name: "回復" },
    { name: "和属" },
    { name: "獣属" },
    { name: "魔属" },
    { name: "霊属" },
    { name: "無属" },
    { name: "地属" },
    { name: "龍属" },
    { name: "なし" }
];

// 防具アビリティリスト
const armorAbilityList = [
    { name: "未選択" },
    { name: "虎咆" },
    { name: "闘争" },
    { name: "威風" },
    { name: "戦略" },
    { name: "遊戯" },
    { name: "護鶴" },
    { name: "防衛" },
    { name: "鉄壁" },
    { name: "頑固" },
    { name: "強固" },
    { name: "改命" },
    { name: "瞑想" },
    { name: "砕身" },
    { name: "悪戯" },
    { name: "生存" },
    { name: "雲竜" },
    { name: "底力" },
    { name: "持久" },
    { name: "成長" },
    { name: "誘惑" },
    { name: "博打" },
    { name: "才華" },
    { name: "浪漫" },
    { name: "天運" },
    { name: "激運" },
    { name: "覇王" },
    { name: "天佑" },
    { name: "加護" },
    { name: "大帝" },
    { name: "一八" },
    { name: "共栄" },
    { name: "早熟" },
    { name: "博識" },
    { name: "習熟" },
    { name: "記念" },
    { name: "強欲" },
    { name: "絢爛" },
    { name: "金満" },
    { name: "執銭" },
    { name: "獣属" },
    { name: "魔属" },
    { name: "霊属" },
    { name: "無属" },
    { name: "地属" },
    { name: "龍属" },
    { name: "なし" }
];

// 防具アビリティの計算ロジックを集約する辞書
const ABILITY_MASTER = {
    "猛皇": {
        logic: (s, p) => ({
            sta: 0,
            atk: Math.ceil(s.atk * (p * 0.04)),
            def: 0,
            luck: 0
        })
    },

    "猛将": {
        logic: (s, p) => ({
            sta: 0,
            atk: Math.ceil(s.atk * (p * 0.02)),
            def: 0,
            luck: 0
        })
    },

    "虎咆": {
        logic: (s, p) => ({
            sta: 0,
            atk: Math.ceil(s.atk * (p * 0.0125)),
            def: 0,
            luck: 100
        })
    },

    "闘争": {
        logic: (s, p) => ({
            sta: 0,
            atk: Math.ceil(s.atk * (p * 0.01)),
            def: 0,
            luck: 0
        })
    },
    
    "威風": {
        logic: (s, p) => {
            const loss = Math.ceil(s.atk * 0.1);
            return {
                sta: Math.ceil(loss * 15.0),
                atk: -loss,
                def: 0,
                luck: Math.ceil(loss * 0.12)
            };
        }
    },

    "戦略": {
        logic: (s, p) => {
            const loss = Math.ceil(s.atk * 0.15);
            return {
                sta: Math.ceil(loss * 8.0),
                atk: -loss,
                def: 0,
                luck: Math.ceil(loss * 0.15)
            };
        }
    },

    "遊戯": {
        logic: (s, p) => {
            const loss = Math.ceil(s.atk * 0.2);
            return {
                sta: loss,
                atk: -loss,
                def: loss,
                luck: 0
            };
        }
    },

    "慈恵": {
        logic: (s, p) => {
            const loss = Math.ceil(s.atk * 0.15);
            return {
                sta: Math.ceil(loss * 0.5),
                atk: -loss,
                def: Math.ceil(loss * 4.0),
                luck: 0
            };
        }
    },

    "賢皇": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: Math.ceil(s.def * (p * 0.04)),
                luck: 0
            };
        }
    },

    "賢将": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: Math.ceil(s.def * (p * 0.02)),
                luck: 0
            };
        }
    },

    "護鶴": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: Math.ceil(s.def * (p * 0.0125)),
                luck: 100
            };
        }
    },

    "防衛": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: Math.ceil(s.def * (p * 0.01)),
                luck: 0
            };
        }
    },

    "鉄壁": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: Math.ceil(s.def * 0.15),
                luck: 0
            };
        }
    },

    "頑固": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: Math.ceil(s.def * 0.1),
                luck: 0
            };
        }
    },

    "強固": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: 50,
                luck: 0
            };
        }
    },

    "改命": {
        logic: (s, p) => {
            const loss = Math.ceil(s.def * 0.10);
            return {
                sta: Math.ceil(loss * 15.0),
                atk: 0,
                def: -loss,
                luck: Math.ceil(loss * 0.12)
            };
        }
    },

    "瞑想": {
        logic: (s, p) => {
            const loss = Math.ceil(s.def * 0.15);
            return {
                sta: Math.ceil(loss * 8.0),
                atk: 0,
                def: -loss,
                luck: Math.ceil(loss * 0.15)
            };
        }
    },

    "砕身": {
        logic: (s, p) => {
            const loss = Math.ceil(s.def * 0.15);
            return {
                sta: Math.ceil(loss * 0.5),
                atk: Math.ceil(loss * 4.0),
                def: -loss,
                luck: 0
            };
        }
    },

    "悪戯": {
        logic: (s, p) => {
            const loss = Math.ceil(s.def * 0.20);
            return {
                sta: loss,
                atk: loss,
                def: -loss,
                luck: 0
            };
        }
    },

    "勇将": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * (p * 0.075)),
                atk: 0,
                def: 0,
                luck: 0
            };
        }
    },

    "生存": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * (p * 0.05)),
                atk: 0,
                def: 0,
                luck: 0
            };
        }
    },

    "雲竜": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * (p * 0.06)),
                atk: 0,
                def: 0,
                luck: 100
            };
        }
    },

    "底力": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * 0.2),
                atk: 0,
                def: 0,
                luck: 0
            };
        }
    },

    "持久": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * 0.15),
                atk: 0,
                def: 0,
                luck: 0
            };
        }
    },

    "成長": {
        logic: (s, p) => {
            return {
                sta: 300,
                atk: 0,
                def: 0,
                luck: 0
            };
        }
    },

    "誘惑": {
        logic: (s, p) => {
            const loss = Math.ceil(s.sta * 0.2)
            return {
                sta: loss,
                atk: loss,
                def: 0,
                luck: 0
            };
        }
    },

    "博打": {
        logic: (s, p) => {
            const staRand = Math.random() * (24.0 - 4.0) + 1.0;
            const atkRand = Math.random() * (11.0 - 2.0) + 1.0;
            const defRand = Math.random() * (10.5 - 0.5) + 1.0;

            return {
                sta: Math.ceil(s.luck * staRand),
                atk: Math.ceil(s.luck * atkRand),
                def: Math.ceil(s.luck * defRand),
                luck: 0
            };
        }
    },

    "才華": {
        logic: (s, p) => {
            const loss = Math.ceil(s.luck * 0.5)
            return {
                sta: Math.ceil(loss * 7.5),
                atk: Math.ceil(loss * 7.5),
                def: Math.ceil(loss * 7.5),
                luck: -loss
            };
        }
    },

    "浪漫": {
        logic: (s, p) => {
            const baseBonus = s.luck * 7;
            const maxBonus = baseBonus + 6000;
            const minBonus = baseBonus - 6000;

            const randomAddValue = Math.ceil(Math.random() * (maxBonus - minBonus + 1)) + minBonus;

            let finalAtk = s.atk + randomAddValue;

            if (finalAtk < 10) {
                finalAtk = 10;
            }

            return {
                atk: finalAtk
            };
        }
    },

    "天運": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: 0,
                luck: Math.ceil(p * 5.0)
            };
        }
    },

    "激運": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: 0,
                def: 0,
                luck: 50
            };
        }
    },

    "修羅": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * (p * 0.04)),
                atk: Math.ceil(s.atk * (p * 0.015)),
                def: Math.ceil(s.def * (p * 0.015)),
                luck: 0
            };
        }
    },

    "覇王": {
        logic: (s, p) => {
            return {
                sta: 0,
                atk: Math.ceil(s.atk * 0.15),
                def: Math.ceil(s.def * 0.15),
                luck: 0
            };
        }
    },

    "天佑": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * 0.12),
                atk: Math.ceil(s.atk * 0.12),
                def: Math.ceil(s.def * 0.12),
                luck: Math.ceil(s.luck * 0.12)
            };
        }
    },

    "加護": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * 0.10),
                atk: Math.ceil(s.atk * 0.10),
                def: Math.ceil(s.def * 0.10),
                luck: 0
            };
        }
    },

    "大帝": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * 0.45),
                atk: Math.ceil(s.atk * 0.15),
                def: 0,
                luck: 0
            };
        }
    },

    "一八": {
        logic: (s, p) => {
            return {
                sta: Math.ceil(s.sta * (p * 0.03)),
                atk: Math.ceil(s.atk * (p * 0.01)),
                def: Math.ceil(s.def * (p * 0.01)),
                luck: 0
            };
        }
    },

    "早熟": {
        logic: (s, p) => {
            return {
                sta: -Math.ceil(s.sta * 0.80),
                atk: -Math.ceil(s.atk * 0.80),
                def: -Math.ceil(s.def * 0.80),
                luck: 100
            };
        }
    },

    "強欲": {
        logic: (s, p) => {
            return {
                sta: -Math.ceil(s.sta * 0.80),
                atk: -Math.ceil(s.atk * 0.80),
                def: -Math.ceil(s.def * 0.80),
                luck: 0
            };
        }
    },

    "獣属": {
        logic: (s, p) => {
            return {
                element: "獣"
            };
        }
    },

    "魔属": {
        logic: (s, p) => {
            return {
                element: "魔"
            };
        }
    },

    "霊属": {
        logic: (s, p) => {
            return {
                element: "霊"
            };
        }
    },

    "無属": {
        logic: (s, p) => {
            return {
                element: "無"
            };
        }
    },

    "地属": {
        logic: (s, p) => {
            return {
                element: "地"
            };
        }
    },

    "龍属": {
        logic: (s, p) => {
            return {
                element: "龍"
            };
        }
    }
    };

// ソロ・極向ボタンの辞書
const ARMOR_SYNC_MAP = {
    "猛皇": { solo: "威風", kyoku: "虎咆" },
    "猛将": { solo: "戦略", kyoku: "虎咆" },
    "虎咆": { solo: "戦略", kyoku: "闘争" },
    "闘争": { solo: "戦略", kyoku: "闘争" },
    "威風": { solo: "大帝", kyoku: "威風" },
    "戦略": { solo: "大帝", kyoku: "戦略" },
    "遊戯": { solo: "遊戯", kyoku: "遊戯" },
    "慈恵": { solo: "慈恵", kyoku: "慈恵" },
    "賢皇": { solo: "砕身", kyoku: "改命" },
    "賢将": { solo: "悪戯", kyoku: "瞑想" },
    "護鶴": { solo: "悪戯", kyoku: "瞑想" },
    "防衛": { solo: "悪戯", kyoku: "防衛" },
    "鉄壁": { solo: "鉄壁", kyoku: "鉄壁" },
    "改命": { solo: "護鶴", kyoku: "改命" },
    "瞑想": { solo: "誘惑", kyoku: "瞑想" },
    "砕身": { solo: "護鶴", kyoku: "護鶴" },
    "悪戯": { solo: "悪戯", kyoku: "悪戯" },
    "勇将": { solo: "誘惑", kyoku: "雲竜" },
    "生存": { solo: "誘惑", kyoku: "生存" },
    "雲竜": { solo: "誘惑", kyoku: "雲竜" },
    "底力": { solo: "底力", kyoku: "底力" },
    "持久": { solo: "持久", kyoku: "持久" },
    "成長": { solo: "成長", kyoku: "成長" },
    "誘惑": { solo: "誘惑", kyoku: "誘惑" },
    "博打": { solo: "博打", kyoku: "博打" },
    "才華": { solo: "才華", kyoku: "才華" },
    "浪漫": { solo: "浪漫", kyoku: "浪漫" },
    "天運": { solo: "天運", kyoku: "天運" },
    "激運": { solo: "激運", kyoku: "激運" },
    "修羅": { solo: "戦略", kyoku: "覇王" },
    "覇王": { solo: "覇王", kyoku: "覇王" },
    "天佑": { solo: "天佑", kyoku: "天佑" },
    "加護": { solo: "加護", kyoku: "加護" },
    "大帝": { solo: "戦略", kyoku: "大帝" },
    "一八": { solo: "一八", kyoku: "一八" },
    "共栄": { solo: "共栄", kyoku: "共栄" },
    "早熟": { solo: "早熟", kyoku: "早熟" },
    "博識": { solo: "博識", kyoku: "博識" },
    "習熟": { solo: "習熟", kyoku: "習熟" },
    "強欲": { solo: "強欲", kyoku: "強欲" },
    "絢爛": { solo: "絢爛", kyoku: "絢爛" },
    "執銭": { solo: "執銭", kyoku: "執銭" },
    "なし": { solo: "なし", kyoku: "なし" }
};
