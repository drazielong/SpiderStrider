class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('lab', './assets/lab.png');
        this.load.image('vignette', './assets/vignette.png');
        this.load.image('ob01', './assets/body.png');
        this.load.image('ob02', './assets/mummy.png');
        this.load.image('ob03', './assets/light.png');

        // spritesheets
        this.load.spritesheet('slide', './assets/slide_spritesheet.png', {frameWidth: 340, frameHeight: 300, startFrame: 0, endFrame: 3});
        this.load.spritesheet('run', './assets/run_spritesheet.png', {frameWidth: 280, frameHeight: 280, startFrame: 0, endFrame: 11});
        this.load.spritesheet('jump', './assets/jump_spritesheet.png', {frameWidth: 280, frameHeight: 320, startFrame: 0, endFrame: 10});
        this.load.spritesheet('spiderRun', './assets/spiderrunSpritesheet.png', {frameWidth: 680, frameHeight: 480, startFrame: 0, endFrame: 7});
    }

    create() {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // place tile sprite
        this.lab = this.add.tileSprite(0, 0, 3840, 480, 'lab').setOrigin(0, 0); 
        this.vig = this.add.tileSprite(0, 0, 3840, 480, 'vignette').setOrigin(0, 0); 
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // add obstacles
        this.ob01 = new Obstacles(this, game.config.width + 10, 320, 'ob01', 0).setOrigin(0, 0);
        this.ob02 = new Obstacles(this, game.config.width + 10, 285, 'ob02', 0).setOrigin(0,0);
        this.ob03 = new Obstacles(this, game.config.width + 10, 10, 'light', 0).setOrigin(0,0);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // animation config
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 10, first: 0}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 10, first: 0}),
            frameRate: 10,
        });

        this.anims.create({
            key: 'slide',
            frames: this.anims.generateFrameNumbers('slide', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'spiderRun',
            frames: this.anims.generateFrameNumbers('spiderRun', { start: 0, end: 7, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // add player
        this.scientist = this.physics.add.sprite(400, 480,'run').setOrigin(0.25, 0);
        this.scientist.setSize(200,280);
        this.scientist.setOffset(20, 0);
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

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // GAME OVER
        this.gameOver = false;

        this.timesHit = 0; //two hits = gameOver
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // borders
        this.add.rectangle(0, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - 10, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(game.config.width - 10, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //clock
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '35px',
            fontStyle: 'bold',
            //backgroundColor: '#000000',
            //color: '#39FF14',
            stroke: '#000000',
            strokeThickness: 6,
            fill: '#ff0000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 250
        }

        this.timer = this.time.addEvent({
            delay: 10000000000, //time cap 
            loop: false,
            startAt: 0,
            timeScale: 0.12, //i think this is the closest i could get to making it look like normal seconds on my pc, might not be the same for everyone
            paused: false
        })

        //set text for timer
        this.clockTimer = this.add.text(borderUISize + borderPadding * 20, borderUISize + borderPadding * 2, 'Time: ' + Math.floor(this.timer.getElapsedSeconds() * 10), timeConfig);
        console.log(timeConfig);
    }

    update() {
        //time update
        this.clockTimer.text = ('Time: ' + Math.floor(this.timer.getElapsedSeconds() * 10));

        // option to restart game
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //this.scene.restart();
            this.scene.start("menuScene");
        }

        // makes background scroll 
        this.lab.tilePositionX += 15;

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // obstacles update

        var value = Phaser.Math.Between(1, 4);

        this.ob02.update();

        /*
        // while !(obj.position is on screen)

        // dead body
        if(value == 1){
            console.log("1");
            this.ob01.update();

        } 
        // mummy
        if (value == 2) {
            console.log("2");
            this.ob02.update();
        } 
        // light
        if (value == 2) {
            console.log("3");
            this.ob03.update();
        } 
        */

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // movement

        //running
        if(this.scientist.isRunning){
            this.scientist.setSize(200,280);
            this.scientist.setOffset(20, 20);   
            this.scientist.anims.play('run', true);
        }
    
        // jumping       
        if(!this.scientist.isJumping && Phaser.Input.Keyboard.JustDown(keyW) && this.scientist.body.blocked.down && !this.scientist.isSliding){ 
            this.scientist.isRunning = false;
            this.scientist.isJumping = true;
            this.scientist.body.setVelocityY(-400);
            this.scientist.setOffset(20, -20);
            this.scientist.anims.play('jump');
        }

        //reset to run on landing
        if (this.scientist.isJumping && this.scientist.body.blocked.down && this.scientist.anims.currentFrame.isLast){
            this.scientist.isJumping = false;
            this.scientist.isRunning = true;
        }

        //sliding conditions
        if(!this.scientist.isJumping && !this.scientist.isSliding && this.scientist.body.blocked.down && keyS.isDown){
            this.scientist.isSliding = true;
            this.scientist.isRunning = false;
        }
        else if(keyS.isUp && !this.scientist.isJumping){
            this.scientist.isSliding = false;
            this.scientist.isRunning = true;
        }

        //if all above is satisfied, you're allowed to slide :)    
        if(this.scientist.isSliding){
            this.scientist.isRunning = false;
            this.scientist.setSize(200, 125);
            this.scientist.setOffset(0, 175);
            //this is just a single image since the anim will replay as long as you hold the S button
            //If we want the sliding animations to play later, I can do what i did for the jumping anim but slightly different
            this.scientist.anims.play('slide'); 
        }
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // check collisions on all objects
        /*
        //@drewgra the loop works but it can't read the object 
        // check collisions on all objects
        for (let i = 1; i <= 3; i ++) {
            let objNum = 'ob0' + i; //outputs obj01, obj02, and obj03
            this.checkCollision(this.scientist, this.objNum); //dunno if this works
        }
        */

        if(this.checkCollision(this.scientist, this.ob02)) {
            this.ob02.alpha = 0; 
            this.scientist.setOffset(-10, 20); 
            this.timesHit++;
            console.log("hit")
        }
        
        // I dont know why it reads each collision like 30 times but it does so 59 its two hits
        if (this.timesHit >= 59){
            this.gameOver = true;
            this.scene.start("endScene");
        }
    }

    checkCollision(scientist, object) {
        if (scientist.x < object.x + object.width && 
            scientist.x + scientist.width > object.x && 
            scientist.y < object.y + object.height &&
            scientist.height + scientist.y > object. y) {
                return true;
        } else {
            return false;
        }
    }
}