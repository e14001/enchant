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
				this.changeMode(1,30);
			}
			break;
			case 1:
			this.frame--;
			if(this.frame < 1){
				this.changeMode(0,200);
				
				if (--maxDroid < 1){
					this.mode = 3;
				}
			}
			break;
			case 2:
			if(game.frame > this.waitFor){
				this.mode = this.nextMode;
			}
			break;
			case 3:
			game.end();
			break;
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
		score.add(1);
		}
	}
});

var Score = Class.create(Label,{
	initialize:function(x,y){
		Label.call(this,"SCORE:0");
		this.x = x || 5;
		this.y = y || 5;
		this.text = "SCORE:0";
		this.font = "16px bold serif";
		this.score = 0;
	},
	add:function(pts){
		this.score += pts;
		this.text = "Score:" + this.score;
	}
});

var score;
var maxDroid = 30;
window.onload = function(){
	game = new Core(gs.width,gs.height);
	game.fps = gs.fps;
	game.preload('./assets/mogura.png');
	
	game.onload = function(){
		score = new Score();
		game.rootScene.addChild(score);

		var offset = {x:40,y:40};
		var size = 45;
		var split = 4;
		
		for(var i = 0; i < 16; i ++){
			var pit = new Pit(
				size * (i % split) + offset.x
				,size * ~~(i / split) + offset.y
				);
		game.rootScene.addChild(pit);
		}
	};
	game.start();
};

function rand(num){
	return ~~(Math.random() * num);
//	return ~~(Math.random() * num);
}

// for(var y 0; y < 4; y ++){
// 	for(var x = 0; x < 4; x++){

// 	};
// };