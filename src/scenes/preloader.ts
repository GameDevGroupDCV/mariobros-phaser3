import { GameData } from "../GameData";
import WebFontFile from "./webFontFile";
export default class Preloader extends Phaser.Scene{
    constructor(){
        super({key:"preloader"});
    }
    init(){
        console.log("preloader");
        
    }
    preload(){
        this.loadAssets();
        this.load.css('google-font', 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        let _graphics = this.add.graphics();
        let _graphics1: Phaser.GameObjects.Graphics = this.add.graphics();
        _graphics1.fillStyle(0x000000, .7);
        _graphics1.fillRect(0,0,9000,6000);
        _graphics1.generateTexture("layer", 900, 600);
        _graphics1.fillStyle(0xffffff,1);
        _graphics1.fillRoundedRect(0,0,600,300,20);
        _graphics1.generateTexture("modal",600,300);
        _graphics1.destroy();

    }
    create(){
        this.scene.stop();
        this.scene.start("gameplay");
        this.scene.start("hud");
        this.scene.bringToTop("hud")
        
    }


    loadAssets(): void {
        console.log("sono nella funzione");
        if (GameData.fonts != null) {
        let _fonts: Array<string> = [];
        GameData.fonts.forEach((element: FontAsset) => {
            _fonts.push(element.key);
        });
        this.load.addFile(new WebFontFile(this.load, _fonts));
        }
        //SCRIPT
        if (GameData.scripts != null)
        GameData.scripts.forEach((element: ScriptAsset) => {
            this.load.script(element.key, element.path);
        });

        // IMAGES
        if (GameData.images != null)
        GameData.images.forEach((element: ImageAsset) => {
            this.load.image(element.name, element.path);
            console.log("caricato" + element.name);
        });

        // TILEMAPS
        if (GameData.tilemaps != null)
        GameData.tilemaps.forEach((element: TileMapsAsset) => {
            this.load.tilemapTiledJSON(element.key, element.path);
        });

        // ATLAS
        if (GameData.atlas != null)
        GameData.atlas.forEach((element: AtlasAsset) => {
            this.load.atlas(element.key, element.imagepath, element.jsonpath);
        });

        // SPRITESHEETS
        if (GameData.spritesheets != null)
        GameData.spritesheets.forEach((element: SpritesheetsAsset) => {
            this.load.spritesheet(element.name, element.path, {
            frameWidth: element.width,
            frameHeight: element.height,
            endFrame: element.frames,
            });
        });

        //video 
        if (GameData.videos != null) {
        GameData.videos.forEach((element: VideoAsset) => {
            this.load.video(element.name, element.path, true);
        });
        }

        //bitmap fonts
        if (GameData.bitmapfonts != null)
        GameData.bitmapfonts.forEach((element: BitmapfontAsset) => {
            this.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
        });
        // SOUNDS
        if (GameData.sounds != null)
        GameData.sounds.forEach((element: SoundAsset) => {
            this.load.audio(element.name, element.paths);
        });

        // Audio
        if (GameData.audios != null)
        GameData.audios.forEach((element: AudioSpriteAsset) => {
            this.load.audioSprite(
            element.name,
            element.jsonpath,
            element.paths,
            element.instance
            );
        });
    }
}