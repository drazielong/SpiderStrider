class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('lab', './assets/lab.png');
        this.load.image('scientist', './assets/sci1.png');
        
        // load spritesheet
        this.load.spritesheet('run', './assets/run.png', {frameWidth: 528, frameHeight: 280, startFrame: 0, endFrame: 1});
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

        // animation config
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 1, first: 0}),
            frameRate: 7
        });

        // add rocket (p1)
        this.scientist = new Runner(this, 400, 200, 'scientist').setOrigin(0.5, 0);
        //scientist.play("run");

        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // makes background scroll
        this.lab.tilePositionX += 40;

        this.scientist.update();
       
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