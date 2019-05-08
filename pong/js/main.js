 // initialize game
var MainMenu = function(game){
    
};
MainMenu.prototype = {
    preload: function(){
        game.load.image('ball', 'assets/img/ball.png');
        game.load.audio('pop', 'assets/audio/pop01.mp3');
    }, //preload asstes
    create: function(){
        game.state.start('Play');
    },
    update: function(){
    }
}

var Play = function(game){//create constants
    this.BALL_WIDTH =10;
    this.BALL_VEL = 300;
    this.PADDELE_VEL = 300;
    
};
Play.prototype = {
    create: function(){
        // spin up physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
       


        this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
        this.ball.anchor.set(0.5);
        this.p1= game.add.sprite(this.BALL_WIDTH*5, game.world.centerY, 'ball');
        this.p1.anchor.set(0.5);
        this.p1.scale.y = 10;

        this.p2= game.add.sprite(game.width-this.BALL_WIDTH*5, game.world.centerY, 'ball');
        this.p2.anchor.set(0.5);
        this.p2.scale.y = 10;

        //apply physics to game stuff
        game.physics.enable([this.ball, this.p1, this.p2], Phaser.Physics.ARCADE);
	this.ball.body.bounce.setTo(1,1);
        this.ball.body.collideWorldBounds = true;
        this.p1.body.collideWorldBounds = true;
        this.p2.body.collideWorldBounds = true;
        this.p1.body.immovable = true;
        this.p2.body.immovable = true;
	
	this.resetBall();
  

    },//initialize the assets/sprites
    update: function(){
        //check collisions
        game.physics.arcade.collide(this.ball, this.p1);
        game.physics.arcade.collide(this.ball, this.p2);

        //check for player input
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            this.p2.body.velocity.y = -this.PADDELE_VEL;
        }else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.p2.body.velocity.y = this.PADDELE_VEL;
        }else{
            this.p2.body.velocity.y = 0;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
            this.p1.body.velocity.y = -this.PADDELE_VEL;
        }else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            this.p1.body.velocity.y = this.PADDELE_VEL;
        }else{
            this.p1.body.velocity.y = 0;
        }

	this.checkBounds();
    },
    checkBounds: function(){
	if(this.ball.body.blocked.right){
	    this.possession = -1;
	    this.resetBall();

	}
	if(this.ball.body.blocked.left){
	    this.possession = 1;
	    this.resetBall();
	}
    },
    resetBall: function(){
	this.ball.x = game.world.centerX;
	this.ball.y = game.world.centerY;
        this.ball.body.velocity.x = this.BALL_VEL;
        this.ball.body.velocity.y = game.rnd.integerInRange(-this.BALL_VEL, this.BALL_VEL);
    }
}

var game = new Phaser.Game();

game.state.add('MainMenu', MainMenu);
game.state.start('MainMenu');
game.state.add('Play', Play);
