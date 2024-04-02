import Mario from "../GameComponents/MarioBros/Mario";
import Coin from "../GameComponents/coin/Coin";
import { GameData } from "../GameData";


export default class GamePlay extends Phaser.Scene{
    private _map:Phaser.Tilemaps.Tilemap;
    private layerWorld:Phaser.Tilemaps.TilemapLayer;
    private layerCollision:Phaser.Tilemaps.TilemapLayer;
    private layerBackground:Phaser.Tilemaps.TilemapLayer;
    private tileset:Phaser.Tilemaps.Tileset;
    private mainCamera:Phaser.Cameras.Scene2D.Camera;
    private startPosition:Phaser.Math.Vector2;
    private player:Mario;
    private _body:Phaser.Physics.Arcade.Body;
    private inTube:boolean = false;
    private layerOverlap:Phaser.Tilemaps.TilemapLayer;
    private layerObject:Phaser.Tilemaps.ObjectLayer;
    private coinGroup:Phaser.GameObjects.Group;

    constructor(){
        super({key:"gameplay"});
    }

    create(){
        this.startPosition = new Phaser.Math.Vector2(1280,100);
        this.mainCamera = this.cameras.main;
        this.mainCamera.setBounds(0,0,GameData.globals.gameWidth, GameData.globals.gameHeight);

        this.player = new Mario({scene:this, x:this.startPosition.x, y:this.startPosition.y, key:'mario'});
        this._body = <Phaser.Physics.Arcade.Body>this.player.body;

        this.mainCamera.startFollow(this.player, false, 1,0);

        this.coinGroup = this.add.group();
        this.createMap();
        this.setupObject();
        
    }


    update(time:number, delta:number){
        this.player.update(time, delta);
    }


    createMap():void{
        if(this._map != null){this._map.destroy};
        this._map = this.make.tilemap({key:'level-0'});
        this.cameras.main.setBounds(0,0,this._map.widthInPixels, this._map.heightInPixels);
        this.physics.world.setBounds(0,0,this._map.widthInPixels,this._map.heightInPixels);
        this.tileset = this._map.addTilesetImage('mariobros-extruded');

        this.layerWorld = this._map.createLayer("world", this.tileset, 0,0)
        .setDepth(9).setAlpha(1);

        this.layerCollision = this._map.createLayer("collision", this.tileset, 0,0)
        .setDepth(2).setAlpha(0);

        this.layerBackground = this._map.createLayer("background", this.tileset, 0,0)
        .setDepth(1).setAlpha(1);

        this.layerOverlap = this._map.createLayer("overlap", this.tileset,0,0).setDepth(0).setAlpha(0);

        this.layerCollision.setCollisionByProperty({collide:true});
        this.layerOverlap.setCollisionByProperty({collide:true});

        this.physics.add.collider(this.player, this.layerCollision, this.onCollision, null, this);
        this.physics.add.overlap(this.player, this.coinGroup, this.onCollisionGroup, null, this);
        this.physics.add.overlap(this.player, this.layerOverlap, this.onCollisionOverlap, null, this);
        
        this.layerCollision.forEachTile((tile:Phaser.Tilemaps.Tile) =>{
            if(tile.properties.tube == true){
                console.log(tile.pixelX, tile.pixelY);
            }
        })
    }

    setupObject():void{
        this.layerObject = this._map.getObjectLayer("GameObjects");
        if (this.layerObject != null) {
            let _objects: any = this.layerObject.objects as any[];
            _objects.forEach((tile:Phaser.Tilemaps.Tile) => {
                console.log(_objects);
                console.log(tile);
              var _objectValue = JSON.parse(tile.properties[0].value).type;

              switch (_objectValue) {
                case "bonus":
                  this.addCoin(new Coin({scene: this, x: tile.x, y: tile.y, key: "coins", frame:1}));
                  break;
              }
              
            })
        }
    }   

    onCollision(player:any, tile:any):void{
        
        if(tile.properties.death == true){
            this.player.setPosition(this.startPosition.x, this.startPosition.y);
        }
        if(tile.properties.tube == true){
            if(this._body.blocked.down == true && !this.inTube){
                this.player.setPosition(800,592);
                this.mainCamera.startFollow(this.player, null, 1, 1);
                this.inTube = true;
            }
            else if(this._body.blocked.right == true && this.inTube){
                this.player.setPosition(2608,464);
                this.mainCamera.startFollow(this.player, null, 1,0);
                this.mainCamera.setScroll(0,0);
            }
            
        }
    }

    onCollisionOverlap(player:any, tile:any):void{
        if(tile.properties.flag == true){
            this.player.anims.play('flag', true);
            console.log(tile);
            this.player.setPosition(tile.pixelX, tile.pixelY);
            this._body.setAllowGravity(false);
            this.add.tween({
                targets:this.player,     
                y:509,
                duration:1200,
                onStart: () =>{
                    this.layerCollision.forEachTile((tile:Phaser.Tilemaps.Tile) =>{
                        if(tile.properties.flagWall == true){
                            tile.setCollision(false, false, false, false);
                        }
                    });
                },
                onUpdate: () =>{
                    this.player.anims.play('flag', true)
                    this._body.setVelocity(0,0);
                },
                onComplete: () =>
                {
                    this._body.setAllowGravity(true);
                    tile.properties.flag = false;
                }
            })
        }

        if(tile.properties.exit == true){
            this.add.tween({
                targets:this.player, 
                scale:0,
                duration:1000,
                ease:Phaser.Math.Easing.Circular.In,
                onStart: () =>{
                    tile.properties.exit = false;
                    
                },
                onUpdate: () =>{this._body.setVelocity(0,0);},
                onComplete: () =>{console.log("hai vinto")}
            })
        }
    }

    onCollisionGroup(player:any, coin:any):void{
        this.coinGroup.remove(coin, true, true);
    }
    addCoin(_coin:Coin):void{
        this.coinGroup.add(_coin);
    }

}