interface IGiocatori{
    name: string, 
    livello: number, 
    puntiVita: number
}

function myFunc(giocatori:Array<IGiocatori>, n:number):Array<string>{
    let names:Array<string> = [];
    giocatori.forEach((item, index)=>{
        if(item.livello >= n){
            names.push(item.name);
        }
    })
    return names;
}

let giocatori:Array<IGiocatori> = [
    {
        name: "francesco", 
        livello: 3,
        puntiVita: 200
    },
    {
        name: "luigi", 
        livello: 4,
        puntiVita: 200
    },
    {
        name: "carmine", 
        livello: 5,
        puntiVita: 1000
    },
    {
        name: "ezio", 
        livello: 2,
        puntiVita: 600
    },
    {
        name: "christian", 
        livello: 1,
        puntiVita: 300
    },
];
console.log(myFunc(giocatori, 3));