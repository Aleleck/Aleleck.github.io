const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', './img/background.png');
    this.load.image('gameover', './img/gameover.png');
    this.load.image('plataform', './img/platform.png');
    this.load.image('ball', './img/ball.png');
    
}

function create() {
    this.physics.world.setBoundsCollision(true,true,true,false);
    this.add.image(400, 250, 'background');
    this.gameoverImage = this.add. image(400, 90, 'gameover');
    this.gameoverImage.visible = false;

    this.plataform = this.physics.add.image(400, 460, 'plataform').setImmovable();
    this.plataform.body.allowGravity= false;

    this.ball = this.physics.add.image(400, 30, 'ball');
    this.ball.setCollideWorldBounds(true);

    let velocity = 100* Phaser.Math.Between(1.3,2);
    if (Phaser.Math.Between(0,10)>5){
        velocity    = 0-velocity;
    }
    this.ball.setVelocity(velocity, 10);

    this.physics.add.collider(this.ball, this.plataform);
    this.ball.setBounce(1);
    this.cursors = this.input.keyboard.createCursorKeys();
    
}

function update() {
    if(this.cursors.left.isDown){
        this.plataform.setVelocityX(-500);
    }
    else if(this.cursors.right.isDown){
        this.plataform.setVelocityX(500);
    }
    else{
        this.plataform.setVelocityX(0);
    }

    if(this.ball.y>500){
        console.log('fin');
        this.gameoverImage.visible = true;
        this.scene.pause();
    }
}





    