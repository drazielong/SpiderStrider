class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        // load assets
        this.load.image('menu', './assets/menu.png');
    }

    create() {
        
        this.title = this.add.tileSprite(0, 0, 3840, 480, 'menu').setOrigin(0, 0);

        // borders
        this.add.rectangle(0, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - 10, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, 10, 0x5e5e5e).setOrigin(0, 0);
        this.add.rectangle(game.config.width - 10, 0, 10, game.config.height, 0x5e5e5e).setOrigin(0, 0);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // Novice mode
          game.settings = {
              //gameTimer: 60000    
              obSpeed: 15,
          }
          //this.sound.play('sfx_beep');  
          this.scene.start("playScene");  
        }

        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            // Novice mode
            game.settings = {
              //gameTimer: 60000 
              obSpeed: 20,   
            }
            //this.sound.play('sfx_beep');  
            this.scene.start("hardScene");  
        }
    }
}