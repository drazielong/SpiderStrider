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

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // Novice mode
          game.settings = {
              //gameTimer: 60000    
          }
          //this.sound.play('sfx_beep');  
          this.scene.start("playScene");  
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // Novice mode
            game.settings = {
              //gameTimer: 60000    
            }
            //this.sound.play('sfx_beep');  
            this.scene.start("hardScene");  
          }
      }
}