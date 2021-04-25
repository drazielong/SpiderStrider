let config = {
    type: Phaser.CANVAS,
    width: 3840,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySPACE, keyR, keyLEFT, keyRIGHT;
