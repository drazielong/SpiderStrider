class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('lab', './assets/lab.png');
        this.load.image('body', './assets/body.png');
        this.load.image('mummy', './assets/mummy.png');
        this.load.spritesheet('slide', './assets/slide.png', {frameWidth: 280, frameHeight: 280, startFrame: 2, endFrame: 2});
        this.load.spritesheet('run', './assets/run_spritesheet.png', {frameWidth: 280, frameHeight: 280, startFrame: 0, endFrame: 11});
        this.load.spritesheet('jump', './assets/jump_spritesheet.png', {frameWidth: 280, frameHeight: 280, startFrame: 0, endFrame: 2});
        this.load.spritesheet('spiderRun', './assets/spiderrunSpritesheet.png', {frameWidth: 680, frameHeight: 480, startFrame: 0, endFrame: 7});

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
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 10, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        // animation config
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 2, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'slide',
            frames: this.anims.generateFrameNumbers('slide', { start: 2, end: 2, first: 2}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'spiderRun',
            frames: this.anims.generateFrameNumbers('spiderRun', { start: 0, end: 7, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        // add player
        //this.scientist = new Runner(this, 400, 200, 'run').setOrigin(0.5, 0);
        this.scientist = this.physics.add.sprite(400, 200,'run').setOrigin(0.5,0);
        this.scientist.setSize(200,250);
        this.scientist.setOffset(10,10);
        this.scientist.anims.play('run');
        this.scientist.isRunning = false;
        this.scientist.moveSpeed = 7;
        this.scientist.isJumping = false;
        this.scientist.isSliding = false;
        this.scientist.setCollideWorldBounds(true);
        //this.scientist.onWorldBounds = true;
        
        //add spider
        let spider = this.add.sprite(-400, 50, 'spiderRun').setOrigin(0, 0);
        spider.anims.play('spiderRun');

        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // add obstacles
        this.ob01 = new Obstacles(this, game.config.width + 10, 130, 'body', 0).setOrigin(0, 0);
        this.ob02 = new Obstacles(this, game.config.width + 10, 130, 'mummy', 0).setOrigin(0,0);
    
        // GAME OVER flag
        this.gameOver = false;

        this.timesHit = 0; //two hits = gameOver
    }

    update() {
        // makes background scroll
        this.lab.tilePositionX += 15;

        this.scientist.update();
        //this.ob01.update();
        this.ob02.update();

        // running
        /*
        if(!this.scientist.isRunning) {
            if(keyA.isDown && this.scientist.x >= borderUISize + this.scientist.width) {
                this.scientist.x -= this.scientist.moveSpeed;
            } else if (keyD.isDown && this.scientist.x <= game.config.width - borderUISize - this.scientist.width) {
                this.scientist.x += this.scientist.moveSpeed;
            }
        }
        */
    
        // jumping
        if(!this.scientist.isJumping && !this.scientist.isSliding){
            if(Phaser.Input.Keyboard.JustDown(keyW)){  
                this.scientist.isJumping = true; 
                this.scientist.isRunning = false;
                this.scientist.body.setVelocityY(-200);
                this.scientist.anims.play('jump');
            }
            //on landing: slide = false, run = true
        } 

        //sliding
        if(!this.scientist.isJumping && !this.scientist.isSliding){
            if(keyS.isDown){
                this.scientist.isSliding = true;
                this.scientist.isRunning = false;
                this.scientist.setSize(200, 125);
                this.scientist.setOffset(0, 125);
                this.scientist.anims.play('slide');
            }
            //on key up: slide = false, run = true
        }

        //running
        if(this.scientist.isRunning){
            this.scientist.setSize(200,250);
            this.scientist.setOffset(10,10);
            this.scientist.anims.play('run');
        }


        // check collisions
        if(this.checkCollision(this.scientist, this.ob01)) {
            //if player hits an obstacle once, set spider's X to -300
            this.timesHit++;
        }
        if (this.checkCollision(this.scientist, this.ob02)) {
            //if player hits an obstacle once, set spider's X to -300
            this.timesHit++;
        }

        if (this.timesHit >= 2){
            //end game
            //this.gameOver = true;
            //this.scene.start("endScene"); 
        }
    }


    checkCollision(scientist, ob) {
        // simple AABB checking
        if (scientist.x < ob.x + ob.width && 
            scientist.x + scientist.width > ob.x && 
            scientist.y < ob.y + ob.height &&
            scientist.height + scientist.y > ob. y) {
                return true;
        } else {
            return false;
        }
    }
}