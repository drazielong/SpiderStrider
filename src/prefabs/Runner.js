class Runner extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
   
        // add object to existing scene
        scene.add.existing(this);

        this.isRunning = false;
        this.moveSpeed = 7;
        this.isJumping = false;
        this.isSliding = false;
        //this.setGravityY(300);
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
                this.setVelocity(0,-300)


            }

        }
    }
}
