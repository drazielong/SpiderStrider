class End extends Phaser.Scene {
  constructor() {
    super("endScene");
  }

  preload(){
    // load assets
    this.load.image('gameover', './assets/gameover.png');
  }

  create(data) {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // sounds
    this.sound.play('possible_spider');
    this.menuBGM = this.sound.add('menu_music', {volume: 0.4, loop: true});
    this.menuBGM.play();

    // define keys
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // image
    this.title = this.add.tileSprite(0, 0, 3840, 480, 'gameover').setOrigin(0, 0);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // high score
    
    // no highScore  
    if(highScore  === null) 
    {  
      localStorage.setItem('highscore', data.time);    
      highScore = data.time;
      newHighScore = true;
    }
    // existing high score
    else 
    {
      // new high score
      if(data.time > highScore)
      {
        localStorage.setItem('hiscore', data.time);
        highScore = data.time;
        newHighScore = true;
      } 
      // no new high score
      else 
      {
        highScore = parseInt(localStorage.getItem('hiscore'));
        newHighScore = false;
      }
    }

    //clock text config for high score
    let highScoreConfig = {
      fontFamily: 'Courier',
      fontSize: '20px',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
      fill: '#FFFFFF',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 900,
      fixedHeight: 100
    }

    this.highScoreText = this.add.text(borderUISize + borderPadding * 20 + 70, 420, 'Browser High Score: ' + highScore + 's', highScoreConfig);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // current score
    
    //clock text config for score
    let timeConfig = {
      fontFamily: 'Courier',
      fontSize: '35px',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 8,
      fill: '#FFFFFF',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 900,
      fixedHeight: 100
    }

    //display score under game over text
    this.timerText = this.add.text(borderUISize + borderPadding * 20 + 35, 370, 'Time: ' + data.time + 's', timeConfig);
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // borders
    this.add.rectangle(0, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - 10, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
    this.add.rectangle(0, 0, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
    this.add.rectangle(game.config.width - 10, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      this.menuBGM.stop();
      this.scene.start("menuScene");  
    }
  }
}