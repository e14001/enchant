'use strict';
enchant();

var game;
var gs = {
	height:320
	,width:320
	,fps:30
};

//穴クラスの定義
//Spriteクラスを継承する 

var Pit = Class.create(Sprite,{
	initialize:function(x,y){
		Sprite.call(this,48,48);
		this.image = game.assets['./assets/mogura.png'];
		this.x =x;
		this.y =y;
		this.mode = 2;
		this.nextMode = 0;
		this.waitFor = game.frame + rand(100);
	},
	
	move:function(){

		switch(this.mode){
			case 0:
			this.frame++;
			if(this.frame > 4-1){
				this.changeMode(1,100);
			}
			break;
			case 1:
			this.frame--;
			if(this.frame < 1){
				this.changeMode(0,100);
			}
			break;
			case 2:
			if(game.frame > this.waitFor){
				this.mode = this.nextMode;
			}
		}
	}, 
	changeMode:function(nextmode,random){
		this.mode = 2;
		this.nextMode = nextmode;
		this.waitFor = game.frame + rand(random);
	},

	onenterframe:function(){
		if(game.frame % 2 != 0){
		this.move();
			
		}
	},
	ontouchstart:function(){
		this.hit();
	},
	hit:function(){
		if(this.frame === 5){
			return;
		}
		if(this.frame > 2 - 1){
		this.frame = 5;
		this.changeMode(1,10);
		}
	}
})


window.onload = function(){
	game = new Core(gs.width,gs.height);
	game.fps = gs.fps;
	game.preload('./assets/mogura.png');
	game.onload = function(){
		var pit = new Pit(100,100);
		game.rootScene.addChild(pit);

	};
	game.start();
};

function rand(num){
	return ~~(Math.random() * num);
//	return ~~(Math.random() * num);
}