class Obstacles extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        // has to match scene speed
        //this.moveSpeed = 15;
        this.moveSpeed = game.settings.obSpeed;
    }

    update() {
        // move obstacles left
        this.x -= this.moveSpeed;

        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}