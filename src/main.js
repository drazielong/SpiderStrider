let config = {
    type: Phaser.CANVAS,
    width: 1715,
    height: 480,
    scene: [ Warning, Menu, Lab, Level2, Forest, End ],
    physics: {
      default: 'arcade',
      arcade: {
          debug: true,
          gravity: {
            x: 0,
            y: 300
          }
      }
    },
  }

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySPACE, keyW, keyA, keyS, keyD;