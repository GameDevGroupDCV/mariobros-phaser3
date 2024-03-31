import { param } from "jquery";
import IMario from "./IMario";
import GamePlay from "../../scenes/GamePlay";

export default class Mario extends Phaser.GameObjects.Sprite implements IMario{
    private _config:genericConfig;
    private _scene:GamePlay;
    private _body: Phaser.Physics.Arcade.Body;
    private _cursors:Phaser.Types.Input.Keyboard.CursorKeys;

    private _animations:animationConfig[] = [
        {sprite:"mario", key:"idle", frames:[16], frameRate:10, yoyo:false, repeat:-1},
        {sprite:"mario", key:"walk", frames:[17,18,19], frameRate:10, yoyo:false, repeat:-1},
        {sprite:"mario", key:"jump", frames:[21], frameRate:10, yoyo:false, repeat:-1},
        {sprite:"mario", key:"flag", frames: [22,23], frameRate:10, yoyo:false, repeat:-1}
    ]

    constructor(params:genericConfig){
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        console.log("creato");
        this.initMario();
        
        
    }

    initMario(): void {
        this._cursors = this._config.scene.input.keyboard.createCursorKeys();

        this._scene = <GamePlay>this._config.scene;
        this._scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setCollideWorldBounds(true);
        this._body.setSize(14,17).setOffset(2,8)
        this.setDepth(10);
        this.setScale(1.5);
        this._scene.add.existing(this);

        this.createAnimation();
    }

    update(time:number, delta:number): void {
        if(this._cursors.right.isDown){
            this.setFlipX(false);
            this._body.setVelocityX(200);
            if(this._body.onFloor()){this.anims.play('walk', true);}
        }
        if(this._cursors.left.isDown){
            this.setFlipX(true);
            this._body.setVelocityX(-200);
            if(this._body.onFloor()){this.anims.play('walk', true);}
        }
        if(this._cursors.up.isDown && this._body.onFloor()){
            this._body.setVelocityY(-400);
            this.anims.play('jump', true);
        }
        if(!this._cursors.left.isDown && !this._cursors.right.isDown && !this._cursors.up.isDown){
            this._body.setVelocityX(0);
            if(this._body.onFloor()){this.anims.play('idle', true);}
        }
    }

    createAnimation(){
        this._animations.forEach(animation => {
            if(!this._scene.anims.exists(animation.key)){
                let _animation:Phaser.Types.Animations.Animation = {
                    key:animation.key,
                    frames:this.anims.generateFrameNumbers(animation.sprite, {frames:animation.frames}),
                    frameRate:animation.frameRate,
                    yoyo:animation.yoyo,
                    repeat:animation.repeat
                };
                this._scene.anims.create(_animation);
            }
        })
    }

}

interface animationConfig{
    sprite:string, 
    key:string, 
    frames:number[],
    frameRate?:number, 
    yoyo?:boolean,
    repeat?:number
}