'use strict';
enchant();

var game;
var gs = {
	height:320
	,width:320
	,fps:16
};

var BackGround = Class.create(Sprite,{
	initialize:function(){
		Sprite.call(this,game.width,game.height);
		this.backgroundColor = 'rgb(0,200,255)';
		this.image = this.createImage();
		game.rootScene.addChild(this);
	},
	createImage:function(){
		var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
		var image = new Surface(game.width,game.height);
		var size = 16;
		for(var i = 0; i < game.width; i += 16) {
			image.draw(maptip, 7 * size, 0, 16, 16, i, game.height - size, size, size);
		}
		return image;
	}
});

var eMap = Class.create(Map,{
	initialize:function(){
		Map.call(this,16,16);
		this.image = game.assets['http://enchantjs.com/assets/images/map0.gif'];
		this.loadData(this.create(20,20,7));
		game.rootScene.addChild(this);
	},
	create:function(rownum,colnum,value){
		var rows = [];
		var empty = -1;
		for (var i = 0; i < rownum - 1; i++){
			rows.push(line(colnum,empty));
		};
		rows.push(line(colnum,value));
		return rows;

		function line (colnum,value){
			var cols = [];
			for(var i = 0; i < colnum; i++){
				cols.push(value);
			};
			return cols;
		}
	}
});

var ePad = Class.create(Pad,{
	initialize:function(){
		Pad.call(this);
		this.moveTo(0,220);
		game.rootScene.addChild(this);
	}
})

var Bear = Class.create(Sprite,{
	initialize:function(){
		Sprite.call(this,32,32);
	this.image  = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
    this.x      = (game.width - this.width) / 2;
    this.y      = (game.height - this.height) - 16;
    this.status = STATUS_WAIT;
    this.anim   = [10, 11, 10, 12];
    this.frame  = [10];
    game.rootScene.addChild(this);

	},
	onenterframe:function(){
		if(game.input.left){
			this.x -= 3;
			this.scaleX = -1;
			if(this.status != STATUS_JUMP){
				this.status = STATUS_WALK;
			}
		}else if(game.input.right){
			this.x += 3;
			this.scaleX = 1;
			if(this.status != STATUS_JUMP){
				this.status = STATUS_WALK;
			}
		}
		if(this.status != STATUS_JUMP){
			this.status = STATUS_WAIT;
			if(game.input.up){
				this.status = STATUS_JUMP;
				this.age = 0;
			}
		}
		if(this.status === STATUS_JUMP){
			if(this.age < 8){
				this.y -= 8;
			}else if (this.age < 16){
				this.y += 8;
			}else {
				this.status = STATUS_WAIT;
			}
		}
		 //フレームの指定
            if (this.status === STATUS_WAIT) {
                this.frame = this.anim[0];            
            } else if (this.status === STATUS_WALK) {
                this.frame = this.anim;            
            } else if (this.status === STATUS_JUMP) {
                this.frame = this.anim[1];            
            }
	}
});

var STATUS_WAIT = 0;
var STATUS_WALK = 1;
var STATUS_JUMP = 2;

window.onload = function(){
	game = new Core(gs.width,gs.height);
	game.fps = gs.fps;
    	//画像の読み込み
    game.preload('http://enchantjs.com/assets/images/chara1.gif',
        'http://enchantjs.com/assets/images/map0.gif');
	
	game.onload = function(){
		new eMap();
		new ePad();
		new Bear();


	};
	game.start();
};

	//クマの生成
        // var bear = new Sprite(32, 32);
        // bear.image  = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
        // bear.x      = 160 - 16;
        // bear.y      = 320 - 16 - 32;
        // bear.status = STATUS_WAIT;
        // bear.anim   = [10, 11, 10, 12];
        // bear.frame  = 10;
        // game.rootScene.addChild(bear);

    //クマの定期処理
    		// bear.tick = 0;
    		// bear.addEventListener(Event .ENTER_FRAME, function(){
    		// 	//上
    		// 	if(bear.status != STATUS_JUMP) {
    		// 		bear.status = STATUS_WAIT;
    		// 		if(game.input.up) {
    		// 			bear.status = STATUS_JUMP;
    		// 			bear.tick = 0;
    		// 		}
    		// 	}
    		// })



/*
var STATUS_WAIT = 0;
var STATUS_WALK = 1;
var STATUS_JUMP = 2;

enchant();
window.onload = function() {
    //ゲームオブジェクトの生成
    var game = new Game(320, 320);
    game.fps = 16;

    //画像の読み込み
    game.preload('http://enchantjs.com/assets/images/chara1.gif',
        'http://enchantjs.com/assets/images/map0.gif');

    //ロード完了時に呼ばれる
    game.onload = function() {
        //背景の生成
        var bg = new Sprite(320, 320);
        bg.backgroundColor = "rgb(0, 200, 255)";
        var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
        var image = new Surface(320, 320);
        for (var i = 0; i < 320; i += 16) {
            image.draw(maptip, 7 * 16, 0, 16, 16, i, 320 - 16, 16, 16);
        }
        bg.image = image;
        game.rootScene.addChild(bg);
        
        //バーチャルパッドの生成
        var pad = new Pad();
        pad.x   = 0;
        pad.y   = 220;
        game.rootScene.addChild(pad);

        //クマの生成
        var bear = new Sprite(32, 32);
        bear.image  = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
        bear.x      = 160 - 16;
        bear.y      = 320 - 16 - 32;
        bear.status = STATUS_WAIT;
        bear.anim   = [10, 11, 10, 12];
        bear.frame  = 10;
        game.rootScene.addChild(bear);
        
        //クマの定期処理
        bear.tick = 0;
        bear.addEventListener(Event.ENTER_FRAME, function() {
            //上
            if (bear.status != STATUS_JUMP) {
                bear.status = STATUS_WAIT;
                if (game.input.up)  {
                    bear.status = STATUS_JUMP;
                    bear.tick = 0;
                }
            }
            //左
            if (game.input.left)  {
                bear.x -= 3;
                bear.scaleX = -1;
                if (bear.status != STATUS_JUMP) bear.status = STATUS_WALK;
            }
            //右
            else if (game.input.right) {
                bear.x += 3;
                bear.scaleX =  1;
                if (bear.status != STATUS_JUMP) bear.status = STATUS_WALK;
            }
            //ジャンプ中
            if (bear.status == STATUS_JUMP) {
                if (bear.tick < 8) {
                    bear.y -= 8;
                } else if (bear.tick < 16) {
                    bear.y += 8;
                } else {
                    bear.status = STATUS_WAIT;
                }
            }
            
            //フレームの指定
            bear.tick++;
            if (bear.status == STATUS_WAIT) {
                bear.frame = bear.anim[0];            
            } else if (bear.status == STATUS_WALK) {
                bear.frame = bear.anim[bear.tick % 4];            
            } else if (bear.status == STATUS_JUMP) {
                bear.frame = bear.anim[1];            
            }
        });
    };
    
    //ゲームの開始
    game.start();
};
*/