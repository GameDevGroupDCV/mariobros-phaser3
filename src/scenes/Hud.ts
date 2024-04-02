import { GameData } from "../GameData";
import GamePlay from "./GamePlay";
export default class Hud extends Phaser.Scene{

    private _coinImage:Phaser.GameObjects.Image[] = [];
    private _timeText:Phaser.GameObjects.Text;
    private _coinText:Phaser.GameObjects.Text;
    private _levelText:Phaser.GameObjects.Text;
    private _scoreText: Phaser.GameObjects.Text;
    private _gamePlay: Phaser.Scene;
    private _textStyle:Phaser.Types.GameObjects.Text.TextStyle;

    constructor(){
        super({key:"hud"});
    }

    create(){   
        this._textStyle = {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '24px',
            color: '#ffffff',
        };
        this._coinImage = [];

        this._gamePlay = <GamePlay>this.scene.get("gameplay");
        
        //let _image:Phaser.GameObjects.Image = this.add.image(1000, 500,'coinImage');
        //_image.setOrigin(0,0);
    }
}