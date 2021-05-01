class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload(){
        // load assets
        this.load.image('gameover', './assets/gameover.png');
    }

    create() {
        this.title = this.add.tileSprite(0, 0, 3840, 480, 'gameover').setOrigin(0, 0);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        //this.sound.play('sfx_beep');  
        this.scene.start("menuScene");  
      }
    }
}