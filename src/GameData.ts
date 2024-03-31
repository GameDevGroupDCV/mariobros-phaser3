export let GameData: gameData = {
  globals: {
    gameWidth: 1280,
    gameHeight: 560,
    bgColor: "#ffffff",
    debug: true
  },

  preloader: {
    bgColor: "ffffff",
    image: "logo",
    imageX: 1280 / 2,
    imageY: 800 / 2,
    loadingText: "Caricamento...",
    loadingTextFont: "roboto",
    loadingTextComplete: "Tappa/clicca per iniziare!!",
    loadingTextY: 700,
    loadingBarColor: 0xff0000,
    loadingBarY: 630,
  },

  spritesheets: [
    {
      name:"mariobros-extruded",
      path:"assets/tileset/mariobros-extruded.png",
      width:32, 
      height:32,
      spacing:2,
      margin:1
    },
    {
      name:"mario",
      path:"assets/images/mario-small.png",
      width:16.53,
      height:26,
      frames:30,
    }
  ],
  images: [
    
  ],
  
  sounds: [
  ],

  videos: [

  ],
  audios: [

  ],

  scripts: [],
  fonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }, {key:'Oswald'}],
  bitmapfonts: [],
  tilemaps:[
    {
      key:'level-0',
      path:'assets/tileset/mariobros-level0.json'
    }
  ]
};
