enchant();

var SCREEN_WIDTH  = 711; // ゲーム画面の幅
var SCREEN_HEIGHT = 416;  // ゲーム画面の高さ

// キャラ画像
var IMG_CHARA_01 = "./img/dlchara/kenhoko/kenhoko00.png";
// 戦闘シーン背景画像
var IMG_BG_SCENE_BATTLE = "./img/bgbattle.png";
// ステータスウィンドウ背景画像
var IMG_BG_WINDOW_STATUS ="./img/windowstatus.png";
// ステータスゲージ隠し画像
var IMG_GAUGE_STATUS_HIDDEN = "./img/windowstatusgauge.png";
// マップ画像1
var IMG_MAP_01 = "./img/dlmap/temp/maruta/maruta.png";

/*
// バーチャルボタンを作成するクラス
var Button = enchant.Class.create( enchant.Sprite,{
	//コンストラクタ
	initialize: function( x,y,mode ){
		// 継承をコール
		enchant.Sprite.call( this, 50, 50);
		// バーチャルボタン画像を設定
		this.image = core.assets["./img/button.png"];
		this.x = x; // X座標
		this.y = y; // y座標
		this.buttonMode = mode; // ボタンモード
		// ゲームのシーンにバーチャルボタンを追加
		core.rootScene.addChild( this );
	}
});
*/

window.onload = function() {
	// 表示領域を設定（幅と高さ）.
	core = new Core( SCREEN_WIDTH, SCREEN_HEIGHT );

	// frames（フレーム）per（毎）second（秒）、ゲーム進行スピードを設定.
	core.fps = 24;

	// pre（前）-load（読み込み）、ゲームで使用する素材を予め読込.
	core.preload( 
		//"./img/xxx.png", 
		//"./img/button.png", 
		IMG_CHARA_01,
		IMG_BG_SCENE_BATTLE, 
		IMG_BG_WINDOW_STATUS, 
		IMG_GAUGE_STATUS_HIDDEN,
		IMG_MAP_01,
		);

	// メイン処理を実行.
	core.onload = function() {
		// ゲームのシーンに背景色を設定
		//core.rootScene.backgroundColor = "#80F0B8";
		core.rootScene.backgroundColor = "#000000"

		// マップを作って描画
		var map1 = new Map(16,16);
		map1.image = core.assets[IMG_MAP_01];

		//loadDataでマップデータを読み込む
		map1.loadData(
		[
			//地面
			[65,65,65,65,65,73,73,73,73,73,73,384,385,385,385,385,385,385,385,385,385,386,73,65,112,113,114,65,384,385,385,385,385,385,385,385,385,385,385,65,65,65,65,65,65],
			[73,73,73,73,73,81,81,81,81,81,81,384,385,385,385,385,385,385,385,385,385,386,81,65,112,113,114,65,384,385,385,385,385,385,385,385,385,385,385,73,73,73,73,73,73],
			[81,81,81,81,81,89,89,89,89,89,89,384,385,385,385,385,385,385,385,385,385,386,89,65,112,113,114,65,384,385,385,385,385,385,385,385,385,385,385,81,81,81,81,81,81],
			[89,89,89,89,89,65,65,65,65,65,65,384,385,385,385,385,385,385,385,385,385,386,65,65,112,113,114,65,392,395,385,385,385,385,385,385,385,385,385,89,89,89,89,89,89],
			[81,81,81,81,89,73,73,73,73,73,73,392,385,385,385,385,385,385,385,385,396,394,73,73,65,65,65,65,400,392,393,393,393,393,393,393,393,393,393,89,81,81,81,81,81],
			[89,89,89,89,89,81,81,81,81,81,81,400,385,385,385,385,385,385,385,385,396,402,81,65,73,65,73,65,408,400,401,401,401,401,401,401,401,401,401,89,89,89,89,89,89],
			[89,73,65,65,73,89,89,89,89,89,89,408,392,393,393,416,416,416,393,393,394,410,89,73,81,73,65,65,65,408,409,409,409,409,409,409,409,409,409,65,65,65,65,65,65],
			[89,81,73,73,81,65,65,65,65,65,65,65,400,401,401,416,416,416,401,401,402,65,65,81,89,81,73,73,65,65,65,65,65,65,65,65,65,65,65,73,73,73,73,73,73],
			[89,89,81,81,89,73,73,73,73,73,73,73,408,409,409,416,416,416,409,409,410,73,73,89,65,65,65,65,73,73,73,73,73,73,73,73,73,73,73,81,81,81,81,81,81],
			[65,89,89,89,65,81,81,81,81,81,81,81,65,65,65,112,113,114,65,65,65,81,81,81,73,73,73,73,81,81,81,81,81,81,81,81,81,81,81,89,89,89,89,89,89],
			[73,65,65,89,73,89,89,89,89,89,89,89,73,73,73,112,113,114,73,73,73,89,89,89,81,81,81,65,89,89,89,89,89,65,89,81,89,89,89,65,73,73,73,65,65],
			[81,73,73,89,81,89,89,89,89,65,65,65,81,81,81,112,113,114,81,81,81,81,81,81,89,89,89,73,73,73,73,73,73,73,73,81,73,73,73,73,65,65,65,73,73],
			[89,81,81,89,89,73,73,73,73,73,73,73,89,89,89,112,113,114,89,89,89,89,89,89,112,113,114,81,81,81,81,81,81,81,81,81,81,81,81,81,73,73,73,81,81],
			[89,89,89,89,89,81,81,81,81,81,81,81,81,81,81,112,113,114,89,89,89,89,89,89,112,113,114,89,89,89,89,89,89,89,89,89,89,89,89,89,81,81,81,89,89],
			[89,65,65,65,65,89,89,89,89,89,89,89,89,89,89,112,113,113,105,105,105,105,105,105,113,113,113,105,105,105,105,105,105,105,113,113,113,106,65,73,89,89,89,65,65],
			[89,73,73,73,73,65,65,65,65,65,65,65,65,65,104,113,113,121,121,121,121,121,121,121,113,113,113,121,121,121,121,121,121,121,121,121,113,114,73,81,73,73,73,73,73],
			[89,81,81,81,81,73,73,73,73,73,73,73,73,73,112,113,114,65,65,385,385,385,385,385,112,113,114,385,385,385,385,385,65,65,65,65,112,114,81,89,81,81,81,81,81],
			[89,89,89,89,89,81,81,81,81,81,81,81,81,81,112,113,114,73,73,385,385,396,393,393,416,416,416,393,393,395,385,385,73,73,73,65,112,114,89,89,89,89,89,89,89],
			[65,65,65,65,89,89,89,89,89,89,89,89,89,89,112,113,114,81,81,65,396,394,401,401,416,416,416,401,401,392,395,385,81,81,81,65,112,114,65,89,65,65,65,65,65],
			[105,105,105,105,105,105,105,113,113,113,105,105,105,105,113,113,114,65,65,65,386,402,409,409,416,416,416,409,409,400,392,395,89,65,65,65,112,114,73,89,73,73,73,73,73],
			[113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,113,114,65,73,65,386,402,73,73,112,113,114,73,73,408,400,384,65,65,73,73,112,114,81,89,81,81,81,81,81],
			[121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,122,65,81,73,386,410,73,73,112,113,114,73,73,73,408,384,65,73,81,81,112,114,89,89,89,89,89,89,89],
			[89,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,81,386,73,73,73,112,113,114,73,73,73,73,384,65,65,65,65,112,113,105,105,105,105,105,105,105],
			[89,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,89,396,73,73,73,112,113,114,73,73,73,73,384,73,73,73,73,112,113,113,113,113,113,113,113,113],
			[89,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,393,394,73,73,73,112,113,114,73,73,73,73,384,81,81,81,81,120,121,121,121,121,121,121,121,121],
			[89,89,89,89,89,89,89,89,89,89,89,89,89,89,89,89,89,89,89,401,402,73,73,73,112,113,114,73,73,73,73,384,89,89,89,89,73,73,73,89,89,89,89,89,89],
			
		],
		[
			//植物
			[-1,609,-1,610,611,612,613,618,619,620,621,-1,-1,-1,-1,-1,-1,-1,-1,-1,373,-1,373,-1,-1,-1,-1,373,-1,618,619,620,621,626,627,628,629,610,611,612,613,-1,609,-1,-1],
			[-1,373,-1,618,619,620,621,626,633,634,637,-1,373,-1,-1,-1,-1,-1,139,141,-1,-1,-1,457,-1,-1,-1,-1,-1,626,627,628,629,-1,635,636,-1,618,619,620,621,373,602,603,604],
			[603,604,605,626,627,628,629,-1,635,636,-1,-1,-1,-1,-1,-1,-1,-1,155,157,-1,-1,373,-1,-1,-1,-1,483,-1,-1,635,636,609,-1,373,-1,-1,626,627,628,629,-1,610,611,612],
			[611,612,613,-1,635,636,-1,602,603,604,605,-1,-1,139,141,-1,-1,-1,-1,-1,195,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,635,636,-1,609,618,619,620],
			[619,620,621,-1,373,-1,609,610,611,612,613,-1,-1,155,157,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,626,627,628],
			[627,628,629,602,603,604,605,618,624,620,621,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,602,603,604,605,635,636],
			[635,636,-1,610,611,612,613,626,627,628,629,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,610,611,612,613,457,-1],
			[-1,609,-1,618,619,620,621,-1,635,636,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,373,-1,-1,-1,-1,-1,-1,-1,618,619,620,621,457,-1],
			[373,-1,-1,626,627,628,629,457,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,380,584,-1,-1,-1,-1,-1,-1,-1,-1,626,627,628,629,373,373],
			[603,604,605,-1,635,636,-1,-1,-1,-1,-1,592,-1,-1,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,501,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,635,636,602,603,604],
			[611,612,613,-1,609,-1,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,372,-1,-1,-1,-1,-1,449,-1,-1,-1,-1,-1,-1,610,611,612],
			[619,620,621,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,195,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,-1,584,-1,195,-1,-1,-1,449,-1,-1,-1,-1,609,-1,618,619,620],
			[627,628,629,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,501,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,626,627,628],
			[635,636,-1,372,380,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,602,603,604,605,635,636],
			[609,602,603,604,605,-1,-1,-1,-1,-1,-1,-1,-1,483,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,610,611,612,613,609,-1],
			[-1,610,611,612,613,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,618,619,620,621,457,-1],
			[-1,618,619,620,621,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,501,626,627,628,629,457,-1],
			[-1,626,627,628,629,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,635,636,602,603,604],
			[-1,-1,635,636,373,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,139,141,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,610,611,612],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,155,157,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,195,-1,-1,618,619,620],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,195,-1,-1,-1,373,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,-1,609,-1,-1,626,627,628],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,635,636],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,457,-1,-1,-1,-1,457,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,457,-1,-1,-1,139,141,-1,-1,-1,-1,457,-1,139,141,-1,-1,-1,-1,-1,-1,483,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[457,-1,195,-1,-1,-1,155,157,-1,-1,-1,457,-1,-1,155,157,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,373,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,501,-1,-1,-1,-1,-1,483,-1,-1,-1,-1,-1,457,-1,-1,-1,-1],
			
		],
		[
			//家
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,482,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,489,490,491,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,489,273,498,284,491,-1,-1,-1,-1,-1,-1,-1,482,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,496,273,273,506,284,284,500,-1,-1,-1,-1,-1,489,490,491,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,280,273,281,282,283,284,284,-1,-1,-1,-1,489,273,498,284,491,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,280,281,297,313,299,283,284,-1,-1,-1,496,273,273,506,284,284,500,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,288,297,313,313,313,299,292,-1,-1,-1,280,273,281,282,283,284,284,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,482,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,296,313,313,313,313,313,300,-1,-1,-1,280,281,297,313,299,283,284,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,489,490,491,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,312,321,321,321,321,321,314,-1,-1,-1,288,297,313,313,313,299,292,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,489,273,498,284,491,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,320,329,329,329,329,329,322,-1,-1,-1,296,313,313,313,313,313,300,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,496,273,273,506,284,284,500,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,353,354,361,362,363,354,355,-1,-1,-1,312,321,321,321,321,321,314,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,280,273,281,282,283,284,284,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,320,329,329,329,329,329,322,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,280,281,297,313,299,283,284,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,353,354,361,362,363,354,355,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,288,297,313,313,313,299,292,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,296,313,313,313,313,313,300,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,312,321,321,321,321,321,314,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,320,329,329,329,329,329,322,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,353,354,361,362,363,354,355,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			
		],
		[
			//装飾
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,266,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,481,-1,-1,-1,-1,-1,-1,-1,-1,-1,266,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,589,-1,-1,450,-1,450,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,458,-1,458,-1,-1,-1,-1,-1,-1,-1,-1,481,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,425,-1,-1,-1,-1,-1,-1,-1,-1,450,-1,450,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,458,449,458,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,266,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,425,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,480,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,488,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,545,-1,545,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,480,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,553,-1,553,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,425,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,546,548,532,-1,-1,-1,531,563,549,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,546,565,-1,-1,-1,-1,-1,-1,-1,562,549,587,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,480,-1,-1,-1,-1,-1,-1,-1,557,-1,-1,-1,-1,-1,-1,-1,-1,-1,562,549,571,580,573,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,579,588,581,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,571,580,573,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,579,588,581,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,571,580,573,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,546,548,565,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,579,588,581,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,557,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,533,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,533,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			
		]
		);

		map1.collisionData = 
			[
				[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
				[0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
				[1,1,0,0,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0],
				[0,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0],
				[0,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				
								
			];

		var foregroundMap1 = new Map(16,16);
		foregroundMap1.image = core.assets[IMG_MAP_01];
		foregroundMap1.loadData(
			[
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,482,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,489,490,491,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,489,273,498,284,491,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,496,273,273,506,284,284,500,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,280,273,281,282,283,284,284,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,280,281,297,313,299,283,284,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				
			]
		);

		// キャラを配置、幅と高さを設定
		//var chara = new Sprite(96,64);
		// 予め読み込みした画像を設定
		//chara.image = core.assets["./img/xxx.png"];
		
		var chara = new Sprite(24,32);
		chara.image = core.assets[IMG_CHARA_01];
		
		// ゲームのシーンにキャラを追加
		core.rootScene.addChild(chara);

		// キャラの初期位置
		chara.x = 16 * 20 - 8;
		chara.y = 16 * 13;

		// キャラの移動フラグ
		chara.isMoving = false;
		// キャラの向き
        chara.direction = 0;
		// キャラの歩き方
		chara.walk = 1;
		
		// 毎フレーム処理
		chara.addEventListener('enterframe', function() {
			// キャラのアニメーション画像を設定
            this.frame = this.direction * 3 + this.walk;
			// キャラが歩いているとき
			if (this.isMoving) {
				// 移動させる
                this.moveBy(this.vx, this.vy);

				// アニメーションを再生する　
                if (!(core.frame % 3)) {
                    this.walk++;
                    this.walk %= 3;
				}
				
				// 移動が終われば
                if ((this.vx && (this.x-8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
                    this.isMoving = false;
                    this.walk = 1;
				}
			// キャラが歩いていないとき
            } else {
				// 移動量は0
				this.vx = this.vy = 0;
				// キー入力より方向、移動を変更
                if (core.input.left) {
                    this.direction = 1;
                    this.vx = -4;
                } else if (core.input.right) {
                    this.direction = 2;
                    this.vx = 4;
                } else if (core.input.up) {
                    this.direction = 3;
                    this.vy = -4;
                } else if (core.input.down) {
                    this.direction = 0;
                    this.vy = 4;
				}
				//衝突判定
                if (this.vx || this.vy) {
                    var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                    var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
                    if (0 <= x && x < map1.width && 0 <= y && y < map1.height && !map1.hitTest(x, y)) {
                        this.isMoving = true;
                        arguments.callee.call(this);
                    }
                }
            }
        });


		//ルートシーンに追加するグループを作成
		var stage = new Group(); 
		//マップを配置
		stage.addChild(map1);
		stage.addChild(chara);
		stage.addChild(foregroundMap1);
		core.rootScene.addChild(stage);

		/*
		// バーチャルパッド(十字方向キーパッドを生成)
		var pad = new Pad();
		pad.moveTo(10,SCREEN_HEIGHT - 100);
		// ゲームのシーンにバーチャルパッド(十字方向キーパッド)を追加
		core.rootScene.addChild( pad );
		*/

		// ゲームのシーンにバーチャルボタン(A/B/X/Y)を追加
		/*
		btna = new Button( SCREEN_WIDTH - 60,  SCREEN_HEIGHT - 100, "a");
		btnb = new Button( SCREEN_WIDTH - 100, SCREEN_HEIGHT - 60 , "b");
		btnx = new Button( SCREEN_WIDTH - 100, SCREEN_HEIGHT - 140, "x");
		btny = new Button( SCREEN_WIDTH - 140, SCREEN_HEIGHT - 100, "y");
		*/

		// バーチャルボタンをキーに割当て.
		core.keybind( "X".charCodeAt( 0 ), "a" ); // ‘X’キーに割当て.
		core.keybind( "Z".charCodeAt( 0 ), "b" ); // ‘Z’キーに割当て.
		core.keybind( "S".charCodeAt( 0 ), "x" ); // ‘S’キーに割当て.
		core.keybind( "A".charCodeAt( 0 ), "y" ); // ‘A’キーに割当て.

		/*
		// キャラの表示指定
		chara.frame = 0;

		//キャラをキー入力で動かす
		chara.onenterframe = function(){
			// 右キー押下中.
			if ( core.input.right ) {
				// X方向に1px移動.
				//this.x += 1;
				CharaMove(1,0);
			}
			// 左キー押下中.
			if ( core.input.left ) {
				// X方向に-1px移動.
				CharaMove(-1,0);
			}
			// 上キー押下中.
			if ( core.input.up ) {
				// Y方向に-1px移動.
				CharaMove(0,-1);
			}
			// 下キー押下中.
			if ( core.input.down ) {
				// Y方向に1px移動.
				CharaMove(0,1);
			}
			//キャラの移動
			function CharaMove( x, y ){
				var Speed = 150 * (1/core.fps);
				chara.x += x * Speed;
				chara.y += y * Speed;
			}
			/*
			// Aボタン押下中.
			if ( core.input.a ) {
				// X方向に1px移動.
				this.x += 1;
			}
			// Yボタン押下中.
			if ( core.input.y ) {
				// X方向に-1px移動.
				//this.x -= 1;
				core.pushScene( createScene() );
			}
			// Xボタン押下中.
			if ( core.input.x ) {
				// Y方向に-1px移動.
				this.y -= 1;
			}
			// Bボタン押下中.
			if ( core.input.b ) {
				// Y方向に1px移動.
				this.y += 1;
			}
			*/
			/*
		}*/
	}

	// ゲームをスタート.
	core.start();

	/* 新しいシーンの作成 */
	function createScene(){
		var scene = new Scene(); //シーン作成
		var bg = new Sprite( SCREEN_WIDTH, SCREEN_HEIGHT ); //背景画像を配置　幅と高さを設定
		//予め読み込みした背景画像を設定
		bg.image = core.assets[IMG_BG_SCENE_BATTLE];
		//シーンに背景画像を追加
		scene.addChild( bg );

		//ステータスウィンドウを作成
		var sw1 = new StatusWindow( scene, 0, 366 );
		sw1.setName( "アプフェル" );	// 名前を設定.
		sw1.setHPMax( 9999 );
		sw1.setHP( 9999 );	// HPを設定.
		sw1.setSPMax( 999 );
		sw1.setSP( 999 );	// SPを設定.
		sw1.setLV( 99 );	// レベルを設定.

		var sw2 = new StatusWindow( scene, 120, 366 );
		sw2.setName( "レザン" );	// 名前を設定.
		sw2.setHPMax( 5000 );
		sw2.setHP( 1244 );	// HPを設定.
		sw2.setSPMax( 2000 );
		sw2.setSP( 678 );	// SPを設定.
		sw2.setLV( 71 );	// レベルを設定.

		var sw3 = new StatusWindow( scene, 240, 366 );
		sw3.setName( "ビスキュイ" );	// 名前を設定.
		sw3.setHPMax( 2000 );
		sw3.setHP( 21 );	// HPを設定.
		sw3.setSPMax( 4000 )
		sw3.setSP( 2390 );	// SPを設定.
		sw3.setLV( 34 );	// レベルを設定.

		var sw4 = new StatusWindow( scene, 360, 366 );
		sw4.setName( "ダマンド" );	// 名前を設定.
		sw4.setHPMax( 5000 );
		sw4.setHP( 337 );	// HPを設定.
		sw4.setSPMax( 0 );
		sw4.setSP( 0 );	// SPを設定.
		sw4.setLV( 25 );	// レベルを設定.

		//フレーム毎の処理
		scene.addEventListener( Event.ENTER_FRAME, function( e ){
			//Xボタン押下中
			if( core.input.x ){
				//現在表示しているシーンを外して直前のシーンを表示する
				core.popScene();
			}
		})

		//作成したシーンを返す
		return scene;
	}

	//ステータスウィンドウを作成するクラス
	var StatusWindow = enchant.Class.create( enchant.Sprite,{
		//コンストラクタ
		initialize: function( scene, x, y){
			//継承元をコール、幅と高さを設定
			enchant.Sprite.call( this, 120, 124); 
			//ステータスウィンドウ画像を設定
			this.image = core.assets[ IMG_BG_WINDOW_STATUS ];
			this.x = x; //X座標
			this.y = y; //Y座標
			//シーンにステータスウィンドウを追加
			scene.addChild( this );

			//初期化
			hp = 9999;
			hpMax = 9999;
			sp = 9999;
			spMax = 9999;

			var h = new Label("HP");
			h.font = "20px PixelMplus10";
			h.color = "#F8F8F8";
			h.x = this.x + 12;
			h.y = this.y + 36;
			scene.addChild(h);

			var s = new Label("SP");
			s.font = "20px PixelMplus10";
			s.color = "#F8F8F8";
			s.x = this.x + 12;
			s.y = this.y + 66;
			scene.addChild(s);

			var l = new Label("LV");
			l.font = "20px PixelMplus10";
			l.color = "#F8F8F8";
			l.x = this.x + 12;
			l.y = this.y + 96;
			scene.addChild(l);

			nameLabel = new Label("プレイヤー");
			nameLabel.font = "20px PixelMplus10";
			nameLabel.color = "#F8F8F8";
			nameLabel.x = this.x + 10;
			nameLabel.y = this.y + 10;
			nameLabel.width = 100;
			nameLabel.textAlign = "center";
			scene.addChild(nameLabel);

			hpLabel = new Label("234");
			hpLabel.font = "20px PixelMplus10";
			hpLabel.color = "#F8F8F8";
			hpLabel.x = this.x + 32;
			hpLabel.y = this.y + 36;
			hpLabel.width = 80;
			hpLabel.textAlign = "right";
			scene.addChild(hpLabel);

			spLabel = new Label("9999");
			spLabel.font = "20px PixelMplus10";
			spLabel.color = "#F8F8F8";
			spLabel.x = this.x + 32;
			spLabel.y = this.y + 66;
			spLabel.width = 80;
			spLabel.textAlign = "right";
			scene.addChild(spLabel);

			lv = new Label("1");
			lv.font = "20px PixelMplus10";
			lv.color = "#F8F8F8";
			lv.x = this.x + 32;
			lv.y = this.y + 96;
			lv.width = 80;
			lv.textAlign = "right";
			scene.addChild(lv);

			//HPゲージ隠し
			hpHiddenGauge = new Sprite(1,4);
			hpHiddenGauge.image = core.assets[ IMG_GAUGE_STATUS_HIDDEN ];
			hpHiddenGauge.x = this.x + 108;
			hpHiddenGauge.y = this.y + 58;
			hpHiddenGauge.width = 0;
			scene.addChild(hpHiddenGauge);

			//SPゲージ隠し
			spHiddenGauge = new Sprite(1,4);
			spHiddenGauge.image = core.assets[ IMG_GAUGE_STATUS_HIDDEN ];
			spHiddenGauge.x = this.x + 108;
			spHiddenGauge.y = this.y + 88;
			spHiddenGauge.widht = 0;
			scene.addChild( spHiddenGauge );

		},
		setName: function( value ){
			nameLabel.text = value;
		},
		setHP: function( value ){
			if( 0 > value ){ //マイナス値が設定された場合
				value = hpMax;
			}else if(hpMax < value){ //最大HPを超えた値が設定された場合
				value = hpMax;
			}
			//HP更新
			hp = value;
			hpLabel.text = hp.toString().toTwoByteAlphaNumeric();
			this.setHPGauge(); //HPゲージ更新
		},
		setHPMax: function( value ){
			if(1 > value){ //1未満の値が設定された場合
				value = 1;
			}
			hpMax = value;
			this.setHPGauge();
		},
		setHPGauge: function(){
			var hiddenGaugeX = 108 - (96- ((hp*96)/hpMax));
			if(107 < hiddenGaugeX){
				hpHiddenGauge.width = 0;
				//隠しゲージ幅を0にして見えなくする
				//hpHiddenGauge.visible = false;
				//でもできる
			}else if(13 > hiddenGaugeX){
				hpHiddenGauge.x = this.x + 12;
				hpHiddenGauge.width = 96;
			}else{
				hpHiddenGauge.x = this.x + hiddenGaugeX;
				hpHiddenGauge.width = 108 - hiddenGaugeX;
			}
		},
		setSP: function( value ){
			if(0>value){ //マイナス値が設定された場合
				value = 0;
			}else if(spMax < value){ //最大SPを超えた値が設定された場合
				value = spMax;
			}
			sp = value;
			spLabel.text = sp.toString().toTwoByteAlphaNumeric();
			this.setSPGauge();
		},
		setSPMax: function( value ){
			spMax = value;
			this.setSPGauge();
		},
		setSPGauge: function(){
			if(1 > spMax){ //最大SPが0の場合
				spHiddenGauge.x = this.x + 12;
				spHiddenGauge.width = 96;
				//SPゲージをすべて隠してしまう
			}

			var hiddenGaugeX = 108 - (96- ((sp*96)/spMax));
			if(107 < hiddenGaugeX){
				spHiddenGauge.width = 0;
				//spHiddenGauge.visible = 0;
			}else if(13 > hiddenGaugeX){
				spHiddenGauge.x = this.x + 12;
				spHiddenGauge.width = 96;
			}else{
				spHiddenGauge.x = this.x + hiddenGaugeX;
				spHiddenGauge.width = 108 - hiddenGaugeX;
			}
		},
		setLV : function( value ){
			//半角英数字文字列を全角文字列に変換する	
			lv.text = value.toString().toTwoByteAlphaNumeric();
		},

	});

	//半角英数字文字列を全角文字列に変換する関数
	String.prototype.toTwoByteAlphaNumeric = function(){
		return this.replace( /[A-Za-z0-9]/g, function( s ){
			return String.fromCharCode(s.charCodeAt(0) + 0xFEE0 );
		});
	}

}
