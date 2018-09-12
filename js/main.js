enchant();

var SCREEN_WIDTH  = 1024; // ゲーム画面の幅
var SCREEN_HEIGHT = 600;  // ゲーム画面の高さ

// 戦闘シーン背景画像
var IMG_BG_SCENE_BATTLE = "./img/bgbattle.png";
// ステータスウィンドウ背景画像
var IMG_BG_WINDOW_STATUS ="./img/windowstatus.png";
// ステータスゲージ隠し画像
var IMG_GAUGE_STATUS_HIDDEN = "./img/windowstatusgauge.png";

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

window.onload = function() {
	// 表示領域を設定（幅と高さ）.
	core = new Core( 1024, 600 );

	// frames（フレーム）per（毎）second（秒）、ゲーム進行スピードを設定.
	core.fps = 24;

	// pre（前）-load（読み込み）、ゲームで使用する素材を予め読込.
	core.preload( "./img/xxx.png", "./img/button.png", IMG_BG_SCENE_BATTLE, IMG_BG_WINDOW_STATUS, IMG_GAUGE_STATUS_HIDDEN);

	// メイン処理を実行.
	core.onload = function() {

		// キャラを配置、幅と高さを設定
		var chara = new Sprite(96,64);
		// 予め読み込みした画像を設定
		chara.image = core.assets["./img/xxx.png"];
		// ゲームのシーンにキャラを追加
		core.rootScene.addChild(chara);
		// ゲームのシーンに背景色を設定
		core.rootScene.backgroundColor = "#80F0B8";

		// バーチャルパッド(十字方向キーパッドを生成)
		var pad = new Pad();
		pad.moveTo(10,SCREEN_HEIGHT - 100);
		// ゲームのシーンにバーチャルパッド(十字方向キーパッド)を追加
		core.rootScene.addChild( pad );
		// ゲームのシーンにバーチャルボタン(A/B/X/Y)を追加
		btna = new Button( SCREEN_WIDTH - 60,  SCREEN_HEIGHT - 100, "a");
		btnb = new Button( SCREEN_WIDTH - 100, SCREEN_HEIGHT - 60 , "b");
		btnx = new Button( SCREEN_WIDTH - 100, SCREEN_HEIGHT - 140, "x");
		btny = new Button( SCREEN_WIDTH - 140, SCREEN_HEIGHT - 100, "y");

		// バーチャルボタンをキーに割当て.
		core.keybind( "X".charCodeAt( 0 ), "a" ); // ‘X’キーに割当て.
		core.keybind( "Z".charCodeAt( 0 ), "b" ); // ‘Z’キーに割当て.
		core.keybind( "S".charCodeAt( 0 ), "x" ); // ‘S’キーに割当て.
		core.keybind( "A".charCodeAt( 0 ), "y" ); // ‘A’キーに割当て.

		// キャラの表示指定
		chara.frame = 0;

		//キャラをキー入力で動かす
		chara.onenterframe = function(){
			// 右キー押下中.
			if ( core.input.right ) {
				// X方向に1px移動.
				this.x += 1;
			}
			// 左キー押下中.
			if ( core.input.left ) {
				// X方向に-1px移動.
				this.x -= 1;
			}
			// 上キー押下中.
			if ( core.input.up ) {
				// Y方向に-1px移動.
				this.y -= 1;
			}
			// 下キー押下中.
			if ( core.input.down ) {
				// Y方向に1px移動.
				this.y += 1;
			}
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
		}
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
