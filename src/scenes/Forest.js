class Forest extends Phaser.Scene {
    constructor() {
        super("forestScene");
    }

    preload(){
        // background
        this.load.image('background', './assets/forestBackground.png');
        this.load.image('midground', './assets/forestMidground.png');
        this.load.image('foreground', './assets/forestForeground.png');
        this.load.image('vignette', './assets/vignette.png');

        // obstacles
        this.load.image('ob01', './assets/log.png');
        this.load.image('ob02', './assets/net.png');
        this.load.image('ob03', './assets/trapSpider.png');
        this.load.image('ob04', './assets/topOb.png');
        this.load.image('pH', './assets/placeHolder.png');

        // spritesheets
        this.load.spritesheet('slide', './assets/slide_spritesheet.png', {frameWidth: 340, frameHeight: 300, startFrame: 0, endFrame: 3});
        this.load.spritesheet('run', './assets/run_spritesheet.png', {frameWidth: 280, frameHeight: 280, startFrame: 0, endFrame: 11});
        this.load.spritesheet('jump', './assets/jump_spritesheet.png', {frameWidth: 280, frameHeight: 320, startFrame: 0, endFrame: 10});
        this.load.spritesheet('spiderRun', './assets/spiderrunSpritesheet.png', {frameWidth: 680, frameHeight: 480, startFrame: 0, endFrame: 7});
    }

    create() {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // parallax scrolling background
        this.background = this.add.tileSprite(0, 0, 3840, 480, 'background').setOrigin(0, 0); 
        this.midground = this.add.tileSprite(0, 0, 3840, 480, 'midground').setOrigin(0, 0); 
        this.foreground = this.add.tileSprite(0, 0, 3840, 480, 'foreground').setOrigin(0, 0); 
        //this.vig = this.add.tileSprite(0, 0, 3840, 480, 'vignette').setOrigin(0, 0); 

        // this acts as an invisible box so that the player doesnt get pushed off screen
        this.pH = this.physics.add.image(-100, 470, 'pH').setOrigin(0,0);
        this.pH.setSize(370, 480, true);
        this.pH.setOffset(120, 0);
        this.pH.setCollideWorldBounds(true);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // add obstacles
        this.ob01 = this.physics.add.image(game.config.width + 20, 240, 'ob01').setOrigin(0,0);
        this.ob01.setSize(200, 300, true);
        this.ob01.setOffset(0, 50);
        this.ob01.body.setAllowGravity(false);

        this.ob02 = this.physics.add.image(game.config.width + 20, 100, 'ob02').setOrigin(0,0);
        this.ob02.setSize(200, 170, true);
        this.ob02.setOffset(0, 200);
        this.ob02.body.setAllowGravity(false);

        this.ob03 = this.physics.add.image(game.config.width + 20, 300, 'ob03').setOrigin(0,0);
        this.ob03.setSize(250, 150, true);
        this.ob03.setOffset(50, 20);
        this.ob03.body.setAllowGravity(false);

        this.ob04 = this.physics.add.image(game.config.width + 20, -10, 'ob04').setOrigin(0,0);
        this.ob04.setSize(250, 200, true);
        this.ob04.setOffset(10, 20);
        this.ob04.body.setAllowGravity(false);

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
        this.scientist = this.physics.add.sprite(500, 480,'run').setOrigin(0.25, 0);
        this.scientist.setSize(200,280);
        this.scientist.setOffset(20, 0);
        this.scientist.anims.play('run');
        this.scientist.moveSpeed = 7;
        this.scientist.isRunning = false;
        this.scientist.isJumping = false;
        this.scientist.isSliding = false;
        this.scientist.setCollideWorldBounds(true);
        
        //add spider
        let spider = this.add.sprite(-300, 40, 'spiderRun').setOrigin(0, 0);
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

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // borders
        this.add.rectangle(0, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - 10, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(game.config.width - 10, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
    }

    update() {
        //time update
        this.clockTimer.text = ('Time: ' + Math.floor(this.timer.getElapsedSeconds() * 10));

        // option to restart game
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //this.scene.restart();
            this.scene.start("menuScene");
        }

        // parallax scrolling
        this.background.tilePositionX += 5;
        this.midground.tilePositionX += 10;
        this.foreground.tilePositionX += 20;

        // obstacle physics
        this.physics.add.collider(this.scientist, this.pH);
        this.pH.setVelocity(0, 0);
        
        // obstacle randomization
        var value = Phaser.Math.Between(1, 3);

        this.ob04.setVelocity(-700, 0);

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
            this.scientist.body.setVelocityY(-450);
            this.scientist.setOffset(20, -20);
            this.scientist.setSize(210, 200);
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

        // checks hits on ob01, resets on hit
        if(this.checkCollision(this.scientist, this.ob01)) {
            console.log("ob01 hit")
            this.timesHit++;
            this.ob01.alpha = 0;
            this.ob01.destroy();
            this.recreate(this.ob01);
        // checks hits on ob01, resets on miss
        } else if (this.ob01.x < -300){
            console.log("ob01 miss")
            this.ob01.alpha = 0;
            this.ob01.destroy();
            this.recreate(this.ob01);
        }

        // checks hits on ob02, resets on hit
        if(this.checkCollision(this.scientist, this.ob02)) {
            this.timesHit++;
            this.ob02.alpha = 0;
            this.ob02.destroy();
            this.recreate(this.ob02);
            console.log("ob02 hit")
        // checks hits on ob02, resets on miss
        } else if (this.ob02.x < -300){
            this.ob02.alpha = 0;
            this.ob02.destroy();
            this.recreate(this.ob02);
            console.log("ob02 miss")
        }

        // checks hits on ob03, resets on hit
        if(this.checkCollision(this.scientist, this.ob03)) {
            this.timesHit++;
            this.ob03.alpha = 0;
            this.ob03.destroy();
            this.recreate(this.ob03);
            console.log("ob03 hit")
        // checks hits on ob03, resets on miss
        } else if (this.ob03.x < -300){
            this.ob03.alpha = 0;
            this.ob03.destroy();
            this.recreate(this.ob03);
            console.log("ob03 miss")
        }

        // checks hits on ob04, resets on hit
        if(this.checkCollision(this.scientist, this.ob04)) {
            this.timesHit++;
            this.ob04.alpha = 0;
            this.ob04.destroy();
            this.recreate(this.ob04);
            console.log("ob04 hit")
        // checks hits on ob04, resets on miss
        } else if (this.ob04.x < -300){
            this.ob04.alpha = 0;
            this.ob04.destroy();
            this.recreate(this.ob04);
            console.log("ob04 miss")
        }
       
        if(this.timesHit >= 2){
            this.gameOver = true;
            this.scene.start("endScene");
        }
    }

    recreate(object) {
        if(object == this.ob01){
            this.ob01 = this.physics.add.image(game.config.width + 20, 240, 'ob01').setOrigin(0,0);
            this.ob01.setSize(200, 300, true);
            this.ob01.setOffset(0, 50);
            this.ob01.body.setAllowGravity(false);
        }

        if(object == this.ob02){
            this.ob02 = this.physics.add.image(game.config.width + 20, 100, 'ob02').setOrigin(0,0);
            this.ob02.setSize(200, 170, true);
            this.ob02.setOffset(0, 200);
            this.ob02.body.setAllowGravity(false);
        }
        
        if(object == this.ob03){
            this.ob03 = this.physics.add.image(game.config.width + 20, 300, 'ob03').setOrigin(0,0);
            this.ob03.setSize(250, 150, true);
            this.ob03.setOffset(50, 20);
            this.ob03.body.setAllowGravity(false);
        }

        if(object == this.ob04){
            this.ob04 = this.physics.add.image(game.config.width + 20, -10, 'ob04').setOrigin(0,0);
            this.ob04.setSize(250, 200, true);
            this.ob04.setOffset(50, 20);
            this.ob04.body.setAllowGravity(false);
        }
    }

    checkCollision(scientist, object) {
        if(this.physics.collide(scientist, object)) {
            return true;
        } else {
            return false;
        }
    }
}