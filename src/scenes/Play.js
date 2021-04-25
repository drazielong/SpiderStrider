class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('lab', './assets/lab.png');
        
        // load spritesheet
        //this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.lab = this.add.tileSprite(0, 0, 3840, 480, 'lab').setOrigin(0, 0); 

        // borders
        /*
        // right border isn't showing up; not sure if we even want borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, 0x5e5e5e, game.config.height, 0x000000).setOrigin(0, 0);
        */

        // add rocket (p1)
        //this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x4)
        /*
        this.ship01 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*4, 'car', 0, 0).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'watermelon', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'trash', 0, 10).setOrigin(0,0);
        this.fish01 = new Fish(this, game.config.width + borderUISize*6, borderUISize*4, 'fish', 0, 30).setOrigin(0, 0);
        */

        // define keys
        //keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // animation config
        /*
        this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });
        */

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily:  'Monaco',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#ff0000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart ← for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        }, null, this);
    }

    update() {
        /*
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        */
        // makes background scroll
        this.lab.tilePositionX += 20;


        if (!this.gameOver) {               
            
        } 

        // check collisions
        /*
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
        }

        if (this.checkCollision(this.p1Rocket, this.ship02)) {
        }
          
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
        }
        */
    }
}