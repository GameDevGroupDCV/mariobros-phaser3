import Mario from "../GameComponents/MarioBros/Mario";
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

        this.createMap();
        
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

        this.physics.add.collider(this.player, this.layerCollision, this.onCollisionDeath, null, this);
        this.physics.add.overlap(this.player, this.layerOverlap, this.onCollisionOverlap, null, this);
    }

    onCollisionDeath(player:any, tile:any):void{
        if(tile.properties.death == true){
            this.player.setPosition(this.startPosition.x, this.startPosition.y);
        }
        if(tile.properties.tube == true){
            if(this._body.blocked.down == true && !this.inTube){
                this.player.setPosition(976,752);
                this.mainCamera.startFollow(this.player, null, 1, 1);
                this.inTube = true;
            }
            else if(this._body.blocked.right == true && this.inTube){
                this.player.setPosition(928,464);
                this.mainCamera.startFollow(this.player, null, 1,0);
                this.mainCamera.setScroll(0,0);
            }
            
        }
    }

    onCollisionOverlap(player:any, tile:any):void{
        if(tile.properties.flag == true){
            this.player.anims.play('flag', true);
            console.log(tile);
            console.log(tile.pixelX + " " + tile.pixelY);
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

}