import ICoin from "./ICoin";

export default class Coin extends Phaser.GameObjects.Sprite implements ICoin{
    private _config:genericConfig;
    private _body:Phaser.Physics.Arcade.Body;

    constructor(params:genericConfig){
        super(params.scene, params.x, params.y, params.key, params.frame);
        this._config = params;
        this.initCoin();
    }
    initCoin(): void {
        this._config.scene.add.existing(this).setDepth(9).setAlpha(1);
        this.setOrigin(0,1);
        this._config.scene.physics.world.enableBody(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setAllowGravity(false);
    }
    update(time:number, delta:number): void {
        
    }
}