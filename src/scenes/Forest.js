class Forest extends Phaser.Scene {
    constructor() {
        super("forestScene");
    }

    preload(){
        // background
        this.load.image('background', './assets/forestBackground.png');
        this.load.image('midground', './assets/forestMidground.png');
        this.load.image('foreground', './assets/forestForeground.png');
        this.load.image('vignette2', './assets/vignette2.png');

        // obstacles
        this.load.image('obs01', './assets/log.png');
        this.load.image('obs02', './assets/net.png');
        this.load.image('obs03', './assets/trapSpider.png');
        this.load.image('pH', './assets/placeHolder.png');

        // spritesheets
        this.load.spritesheet('slide', './assets/slide_spritesheet.png', {frameWidth: 340, frameHeight: 300, startFrame: 0, endFrame: 3});
        this.load.spritesheet('run', './assets/run_spritesheet.png', {frameWidth: 280, frameHeight: 280, startFrame: 0, endFrame: 11});
        this.load.spritesheet('jump', './assets/jump_spritesheet.png', {frameWidth: 280, frameHeight: 320, startFrame: 0, endFrame: 10});
        this.load.spritesheet('spiderRun', './assets/spiderrunSpritesheet.png', {frameWidth: 680, frameHeight: 480, startFrame: 0, endFrame: 7});
        this.load.spritesheet('redSpiderClimb', './assets/topForestSpritesheet.png', {frameWidth: 375, frameHeight: 254, startFrame: 0, endFrame: 7});
        this.load.spritesheet('blackSpiderClimb', './assets/topForestSpritesheet2.png', {frameWidth: 375, frameHeight: 254, startFrame: 7, endFrame: 0});
        this.load.spritesheet('spiderDrop', './assets/swingingSpritesheet.png', {frameWidth: 160, frameHeight: 330, startFrame: 7, endFrame: 0});
        this.load.spritesheet('powerup', './assets/powerup_spritesheet.png', {frameWidth: 140, frameHeight: 140, startFrame: 0, endFrame: 3});
    }

    create() {
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // background music 
        this.playBGM = this.sound.add('bgm', {volume: 0.4, loop: true});
        this.playBGM.play();

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // parallax scrolling background
        this.background = this.add.tileSprite(0, 0, 3840, 480, 'background').setOrigin(0, 0); 
        this.midground = this.add.tileSprite(0, 0, 3840, 480, 'midground').setOrigin(0, 0); 
        this.foreground = this.add.tileSprite(0, 0, 3840, 480, 'foreground').setOrigin(0, 0); 

        this.vig = this.add.tileSprite(0, 0, 3840, 480, 'vignette2').setOrigin(0, 0); 

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
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'redSpiderClimb',
            frames: this.anims.generateFrameNumbers('redSpiderClimb', { start: 0, end: 6, first: 0}),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'spiderDrop',
            frames: this.anims.generateFrameNumbers('spiderDrop', { start: 0, end: 7, first: 0}),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'blackSpiderClimb',
            frames: this.anims.generateFrameNumbers('blackSpiderClimb', { start: 0, end: 6, first: 0}),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'powerup',
            frames: this.anims.generateFrameNumbers('powerup', { start: 3, end: 0, first: 3}),
            frameRate: 12,
            repeat: -1
        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // add obstacles
        this.obs01 = this.physics.add.image(game.config.width + 20, 270, 'obs01').setOrigin(0,0);
        this.obs01.setSize(125, 300, true);
        this.obs01.setOffset(25, 250);
        this.obs01.body.setAllowGravity(false);

        this.obs02 = this.physics.add.image(game.config.width + 20, 120, 'obs02').setOrigin(0,0);
        this.obs02.setSize(170, 200, true);
        this.obs02.setOffset(0, 175);
        this.obs02.body.setAllowGravity(false);

        this.obs03 = this.physics.add.image(game.config.width + 20, 310, 'obs03').setOrigin(0,0);
        this.obs03.setSize(200, 150, true);
        this.obs03.setOffset(50, 20);
        this.obs03.body.setAllowGravity(false);

        this.obs04 = this.physics.add.sprite(game.config.width + 100, -20, 'redSpiderClimb').setOrigin(0,0);
        this.obs04.setSize(250, 210, true);
        this.obs04.setOffset(10, 20);
        this.obs04.body.setAllowGravity(false);
        this.obs04.anims.play('redSpiderClimb');

        this.obs05 = this.physics.add.sprite(game.config.width + 20, 0, 'spiderDrop').setOrigin(0,0);
        this.obs05.setSize(100, 300, true);
        this.obs05.setOffset(0, 50);
        this.obs05.body.setAllowGravity(false);
        this.obs05.anims.play('spiderDrop');
        
        this.obs06 = this.physics.add.sprite(game.config.width + 20, 0, 'blackSpiderClimb').setOrigin(0,0);
        this.obs06.setSize(100, 300, true);
        this.obs06.setOffset(0, 50);
        this.obs06.body.setAllowGravity(false);
        this.obs06.anims.play('blackSpiderClimb');

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // scientist
        this.scientist = this.physics.add.sprite(550, 480,'run').setOrigin(0.25, 0);
        this.scientist.setSize(200,280);
        this.scientist.setOffset(20, 0);
        this.scientist.anims.play('run');
        this.scientist.moveSpeed = 7;
        this.scientist.isRunning = false;
        this.scientist.isJumping = false;
        this.scientist.isSliding = false;
        this.scientist.body.setGravityY(700);
        this.scientist.setCollideWorldBounds(true);
   
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // spider
        let spider = this.add.sprite(-300, 40, 'spiderRun').setOrigin(0, 0);
        spider.anims.play('spiderRun');

        // this acts as an invisible box so that the player doesnt get pushed off screen
        this.pH = this.physics.add.image(-50, 470, 'pH').setOrigin(0,0);
        this.pH.setSize(370, 480, true);
        this.pH.setOffset(120, 0);
        this.pH.setCollideWorldBounds(true);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // powerup
        this.powerup = this.physics.add.sprite(game.config.width + 60, 30, 'powerup').setOrigin(0,0);
        this.powerup.setSize(100, 100, true);
        this.powerup.setOffset(0, 0);
        this.powerup.body.setAllowGravity(false);
        this.powerVar = 1;
        this.powerOnScreen = false;
        this.powerOnVar = 0;
        this.powerHit = false;
        this.powerup.anims.play('powerup');

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // GAME OVER
        this.gameOver = false;
        
        //two hits = gameOver
        this.timesHit = 0; 

        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //clock
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '35px',
            fontStyle: 'bold',
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
        this.timerText = this.add.text(borderUISize + borderPadding * 20, borderUISize + borderPadding * 2, 'Time: ' + Math.floor(this.timer.getElapsedSeconds() * 10), timeConfig);
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // borders
        this.add.rectangle(0, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - 10, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(game.config.width - 10, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
    }

    update() {
        //time update
        this.timerText.text = ('Time: ' + Math.floor(this.timer.getElapsedSeconds() * 10));

        // option to restart game
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene");
        }

        // parallax scrolling
        if ((Math.floor(this.timer.getElapsedSeconds() * 10) <= 115)) {
            this.background.tilePositionX += 5;
            this.midground.tilePositionX += 10;
            this.foreground.tilePositionX += 20;
        } else {
            this.background.tilePositionX += 15;
            this.midground.tilePositionX += 20;
            this.foreground.tilePositionX += 30;
            var overTime = false;;
        }
 
        // placeholder physics
        this.physics.add.collider(this.scientist, this.pH);
        this.pH.setVelocity(0, 0);
               
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // check if on screen
        if((this.obs01.x >= 0 && this.obs01.x <= game.config.width + 19) || (this.obs02.x >= 0 && this.obs02.x <= game.config.width + 19) || (this.obs03.x >= 0 && this.obs03.x <= game.config.width + 19) || (this.obs04.x >= 0 && this.obs04.x <= game.config.width + 19) || (this.obs05.x >= 0 && this.obs05.x <= game.config.width + 19) || (this.obs06.x >= 0 && this.obs06.x <= game.config.width + 19))
        {
            this.obstacleOnscreen = true;
        } else {
            this.obstacleOnscreen = false;
        }

        if((this.powerup.x >= 0 && this.powerup.x <= game.config.width + 59))
        {
            this.powerOnScreen = true;
        } else{
            this.powerOnScreen = false;
        }
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // if !onScreen then send obstacle
        if(this.obstacleOnscreen == false && (Math.floor(this.timer.getElapsedSeconds() * 10) > 1) && this.powerOnScreen == false)
        {
            var value = Phaser.Math.Between(1, 6);

            if((Math.floor(this.timer.getElapsedSeconds() * 10) > (30*this.powerVar)-2) && (Math.floor(this.timer.getElapsedSeconds() * 10) < (30*this.powerVar)+2)) {
                this.recreate(this.powerup);
                this.obstacleOnscreen = true;
                this.powerOnScreen = true;
                this.powerVar += 1;
            } else if(this.powerOnScreen == false) {

                if(value == 1) {
                    this.recreate(this.obs01);
                    this.obstacleOnscreen = true;
                }
        
                if(value == 2) {
                    this.recreate(this.obs02);
                    this.obstacleOnscreen = true;
                }
        
                if(value == 3) {
                    this.recreate(this.obs03);
                    this.obstacleOnscreen = true;
                }

                if(value == 4) {
                    this.recreate(this.obs04);
                    this.obstacleOnscreen = true;
                }

                if(value == 5) {
                    this.recreate(this.obs05);
                    this.obstacleOnscreen = true;
                }

                if(value == 6) {
                    this.recreate(this.obs06);
                    this.obstacleOnscreen = true;
                }
            }
        }

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
            if(this.overTime == false){
                this.scientist.body.setVelocityY(-600);
            } else {
                this.scientist.body.setVelocityY(-800);
            }
            this.scientist.setOffset(20, -20);
            this.scientist.setSize(150, 200);
            this.sound.play('jumpsfx');
            this.scientist.anims.play('jump');
        }

        //reset to run on landing
        if (this.scientist.isJumping && this.scientist.body.blocked.down && this.scientist.anims.currentFrame.isLast){
            this.scientist.isJumping = false;
            this.scientist.isRunning = true;
        }

        //sliding conditions
        if(!this.scientist.isJumping && !this.scientist.isSliding && this.scientist.body.blocked.down && keyS.isDown){
            this.sound.play('slidesfx');
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
            this.scientist.anims.play('slide'); 
        }
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // check collisions on all objects
        if (this.powerOnVar < (Math.floor(this.timer.getElapsedSeconds() * 10)) || this.powerHit == false) { 

            if(this.scientist.alpha < 1){
                this.scientist.alpha = 1;
            }
            else{
                if(this.checkCollision(this.scientist, this.obs01)) {
                    this.timesHit++;
                    this.cameras.main.shake(200);
                    this.obs01.alpha = 0;
                    this.obs01.destroy();
                    this.obstacleOnscreen = false;
                    this.obs01 = this.physics.add.image(game.config.width + 25, 0, 'obs01').setOrigin(0,0);
                } else if (this.obstacleOnscreen && this.obs01.x < -300){ 
                    this.obs01.alpha = 0;
                    this.obs01.destroy();
                    this.obstacleOnscreen = false;
                }

                // checks hits on obs02, resets on hit
                if(this.checkCollision(this.scientist, this.obs02)) {
                    this.timesHit++;
                    this.cameras.main.shake(200);
                    this.obs02.alpha = 0;
                    this.obs02.destroy();
                    this.obstacleOnscreen = false;
                    this.obs02 = this.physics.add.image(game.config.width + 20, 100, 'obs02').setOrigin(0,0);
                } else if (this.obstacleOnscreen && this.obs02.x < -300){
                    this.obs02.alpha = 0;
                    this.obs02.destroy();
                    this.obstacleOnscreen = false;
                }

                // checks hits on obs03, resets on hit
                if(this.checkCollision(this.scientist, this.obs03)) {
                    this.timesHit++;
                    this.cameras.main.shake(200);
                    this.obs03.alpha = 0;
                    this.obs03.destroy();
                    this.obstacleOnscreen = false;
                    this.obs03 = this.physics.add.image(game.config.width + 20, 310, 'obs03').setOrigin(0,0);
                } else if (this.obstacleOnscreen && this.obs03.x < -300){
                    this.obs03.alpha = 0;
                    this.obs03.destroy();
                    this.obstacleOnscreen = false;
                }

                // checks hits on obs04, resets on hit
                if(this.checkCollision(this.scientist, this.obs04)) {
                    this.timesHit++;
                    this.cameras.main.shake(200);
                    this.obs04.alpha = 0;
                    this.obs04.destroy();
                    this.obstacleOnscreen = false;
                    this.obs04 = this.physics.add.sprite(game.config.width + 100, -10, 'redSpiderClimb').setOrigin(0,0);
                } else if (this.obstacleOnscreen && this.obs04.x < -100){
                    this.obs04.alpha = 0;
                    this.obs04.destroy();
                    this.obstacleOnscreen = false;
                }

                // checks hits on obs05, resets on hit
                if(this.checkCollision(this.scientist, this.obs05)) {
                    this.timesHit++;
                    this.cameras.main.shake(200);
                    this.obs05.alpha = 0;
                    this.obs05.destroy();
                    this.obstacleOnscreen = false;
                    this.obs05 = this.physics.add.sprite(game.config.width + 20, 0, 'spiderDrop').setOrigin(0,0);
                } else if (this.obstacleOnscreen && this.obs05.x < -300){
                    this.obs05.alpha = 0;
                    this.obs05.destroy();
                    this.obstacleOnscreen = false;
                }

                // checks hits on obs06, resets on hit
                if(this.checkCollision(this.scientist, this.obs06)) {
                    this.timesHit++;
                    this.cameras.main.shake(200);
                    this.obs06.alpha = 0;
                    this.obs06.destroy();
                    this.obstacleOnscreen = false;
                    this.obs06 = this.physics.add.sprite(game.config.width + 100, -10, 'blackSpiderClimb').setOrigin(0,0);
                } else if (this.obstacleOnscreen && this.obs06.x < -100){
                    this.obs06.alpha = 0;
                    this.obs06.destroy();
                    this.obstacleOnscreen = false;
                }
            }
        }

        // checks hits on powerup, resets on hit
        if(this.checkPowerCollision(this.scientist, this.powerup)) {
            this.powerup.alpha = 0;
            this.powerup.destroy();
            this.powerOnScreen = false;
            this.obstacleOnscreen = false;
            this.powerHit = true;
            this.powerup = this.physics.add.sprite(game.config.width + 60, 30, 'powerup').setOrigin(0,0);
            this.powerOnVar = (Math.floor(this.timer.getElapsedSeconds() * 10)) + 5;
            this.scientist.alpha = 0.5;
            this.sound.play('powerOnsfx');
        } else if (this.powerOnScreen && this.powerup.x < -10){
            this.powerup.alpha = 0;
            this.powerup.destroy();
            this.powerOnScreen = false;
            this.obstacleOnscreen = false;
            this.powerHit = false;
        }

        if(this.timesHit >= 2){
            //pause timer, save time to score
            this.playBGM.stop();
            this.timer.paused = true;
            this.gameOver = true;
            this.scene.start("endScene", { time: (Math.floor(this.timer.getElapsedSeconds() * 10) + 60) });
        }
    }

    recreate(object) {
        if(object == this.obs01){
            this.obs01 = this.physics.add.image(game.config.width, 270, 'obs01').setOrigin(0,0);
            this.obs01.setSize(125, 250, true);
            this.obs01.setOffset(25, 20);
            this.obs01.body.setAllowGravity(false);
            if(this.overTime == false){
                this.obs01.setVelocity(-900, 0);
            } else {
                this.obs01.setVelocity(-1200, 0);
            }
        }

        if(object == this.obs02){
            this.obs02 = this.physics.add.image(game.config.width, 120, 'obs02').setOrigin(0,0);
            this.obs02.setSize(170, 200, true);
            this.obs02.setOffset(0, 175);
            this.obs02.body.setAllowGravity(false);
            if(this.overTime == false){
                this.obs02.setVelocity(-900, 0);
            } else {
                this.obs02.setVelocity(-1200, 0);
            }
        }
        
        if(object == this.obs03){
            this.obs03 = this.physics.add.image(game.config.width, 310, 'obs03').setOrigin(0,0);
            this.obs03.setSize(200, 150, true);
            this.obs03.setOffset(50, 20);
            this.obs03.body.setAllowGravity(false);
            this.obs03.setVelocity(-900, 0);
            if(this.overTime == false){
                this.obs03.setVelocity(-900, 0);
            } else {
                this.obs03.setVelocity(-1200, 0);
            }
        }

        if(object == this.obs04){
            this.obs04 = this.physics.add.sprite(game.config.width, - 20, 'redSpiderClimb').setOrigin(0,0);
            this.obs04.setSize(250, 210, true);
            this.obs04.setOffset(50, 20);
            this.obs04.body.setAllowGravity(false);
            this.obs04.anims.play('redSpiderClimb');
            if(this.overTime == false){
                this.obs04.setVelocity(-900, 0);
            } else {
                this.obs04.setVelocity(-1200, 0);
            }
        }

        if(object == this.obs05){
            this.obs05 = this.physics.add.sprite(game.config.width, 0, 'spiderDrop').setOrigin(0,0);
            this.obs05.setSize(100, 270, true);
            this.obs05.setOffset(0, 50);
            this.obs05.body.setAllowGravity(false);
            this.obs05.anims.play('spiderDrop');
            if(this.overTime == false){
                this.obs05.setVelocity(-900, 0);
            } else {
                this.obs05.setVelocity(-1200, 0);
            }
        }

        if(object == this.obs06){
            this.obs06 = this.physics.add.sprite(game.config.width, - 20, 'blackSpiderClimb').setOrigin(0,0);
            this.obs06.setSize(250, 210, true);
            this.obs06.setOffset(50, 20);
            this.obs06.body.setAllowGravity(false);
            this.obs06.anims.play('blackSpiderClimb');
            if(this.overTime == false){
                this.obs06.setVelocity(-900, 0);
            } else {
                this.obs06.setVelocity(-1200, 0);
            }
        }

        if(object == this.powerup){
            this.powerup = this.physics.add.sprite(game.config.width, 30, 'powerup').setOrigin(0,0);
            this.powerup.setSize(100, 100, true);
            this.powerup.setOffset(0, 0);
            this.powerup.body.setAllowGravity(false);
            this.powerup.anims.play('powerup');
            if(this.overTime == false){
                this.powerup.setVelocity(-1300, 0);
            } else {
                this.powerup.setVelocity(-1600, 0);
            }
        }

    }

    checkCollision(scientist, object) {
        if(this.physics.collide(scientist, object)) 
        {
            this.sound.play('hit');
            return true;
        } else {
            return false;
        }
    }

    checkPowerCollision(scientist, object) {
        if (scientist.x < object.x + object.width && 
            scientist.x + scientist.width > object.x && 
            scientist.y < object.y + object.height &&
            scientist.height + scientist.y > object. y) {
                this.sound.play('powersfx');
                return true;
        } else {
            return false;
        }
    }
}