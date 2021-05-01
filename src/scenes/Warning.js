class Warning extends Phaser.Scene {
    constructor() {
        super("warningScene");
    }

    preload(){
        // load assets
        this.load.image('cw', './assets/cw.png');
    }

    create() {
        this.title = this.add.tileSprite(0, 0, 3840, 480, 'cw').setOrigin(0, 0);

        // borders
        this.add.rectangle(0, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - 10, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(game.config.width - 10, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
        
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // Novice mode
          game.settings = {
            //gameTimer: 60000    
          }
          //this.sound.play('sfx_beep');  
          this.scene.start("menuScene");  
        }
      }
}