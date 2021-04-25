class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        // load assets
        // hey changed this to a cropped menu so you can read it on the smaller screen size
        this.load.image('menu', './assets/menu2.png');
    }

    create() {
        this.title = this.add.tileSprite(0, 0, 3840, 480, 'menu').setOrigin(0, 0);

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
          this.scene.start("playScene");  
        }
      }
}