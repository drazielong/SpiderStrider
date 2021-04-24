class Runner extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
   
        // add object to existing scene
        scene.add.existing(this);
        this.isJumping = False;
        this.isSliding = False;
        this.setGravityY(300);
    }
    update(){
        if(!this.isJumping && !this.isSliding){
            if(Phaser.Input.Keyboard.JustDown(keyW)){   
                this.isJumping = True;
                this.setVelocityY(-300);


            }

        }

    }
}
