class Runner extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.moveSpeed = 7;
        this.isRunning = false;
        this.isJumping = false;
        this.isSliding = false;
    }

    update(){
        // running
        if(!this.isRunning) {
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
    
        // jumping
        if(!this.isJumping && !this.isSliding){
            if(Phaser.Input.Keyboard.JustDown(keyW)){   
                this.isJumping = true;
                this.body.setVelocityY(-300);
            }
        }
    }
}