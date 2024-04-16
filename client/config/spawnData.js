let spawnConfig = {};

//intro wave should last 30 seconds
spawnConfig.introWaves = [
    [
        //clock wise
        [0, 4, config.default.type.book, 3000],
        [0, 3, config.default.type.book, 3000],
        [0, 2, config.default.type.book, 3000],
        [0, 1, config.default.type.book, 3000],
        [0, 0, config.default.type.book, 3000],
        [1, 0, config.default.type.fireballRight, 3000],
        [2, 0, config.default.type.book, 0],
        [2, 1, config.default.type.book, 3000],
        [2, 2, config.default.type.book, 3000],
        [2, 3, config.default.type.book, 3000],
        [2, 4, config.default.type.book, 3000],
    ],
    [
        //top skip middle bottom and reverse
        [0, 4, config.default.type.book, 3000],
        [2, 3, config.default.type.book, 3000],
        [0, 2, config.default.type.book, 3000],
        [2, 1, config.default.type.book, 3000],
        [0, 0, config.default.type.book, 3000],
        [2, 0, config.default.type.book, 3000],
        [0, 1, config.default.type.book, 3000],
        [2, 2, config.default.type.book, 3000],
        [0, 3, config.default.type.book, 3000],
        [2, 4, config.default.type.book, 3000],
    ],

    [
        //end to end back and forth
        [0, 4, config.default.type.book, 500],
        [2, 4, config.default.type.book, 0],

        [0, 0, config.default.type.book, 500],
        [2, 0, config.default.type.book, 0],

        [0, 4, config.default.type.book, 1000],
        [2, 4, config.default.type.book, 0],

        [0, 0, config.default.type.book, 1000],
        [2, 0, config.default.type.book, 0],

        [0, 4, config.default.type.book, 2000],
        [2, 4, config.default.type.book, 0],

        [0, 0, config.default.type.book, 2000],
        [2, 0, config.default.type.book, 0],

        [0, 4, config.default.type.book, 3000],
        [2, 4, config.default.type.book, 0],

        [0, 0, config.default.type.book, 3000],
        [2, 0, config.default.type.book, 0]   
    ],

    [//top skip middle bottom and reverse
        [0, 0, config.default.type.book, 1500],
        [0, 1, config.default.type.book, 1500],
        [0, 2, config.default.type.book, 1500],
        [0, 3, config.default.type.book, 1500],
        [0, 4, config.default.type.book, 1500],
        [1, 4, config.default.type.book, 1500],
        [1, 3, config.default.type.book, 1500],
        [1, 2, config.default.type.book, 1500],
        [1, 1, config.default.type.book, 1500],
        [1, 0, config.default.type.book, 1500],
        [2, 0, config.default.type.book, 1500],
        [2, 1, config.default.type.book, 1500],
        [2, 2, config.default.type.book, 1500],
        [2, 3, config.default.type.book, 1500],
        [2, 4, config.default.type.book, 1500],
    ]


];
spawnConfig.midWaves = [
    [//clockwise fireballs and books
    
        [0, 4, config.default.type.fireballDown, 0],
        [2, 0, config.default.type.book, 1000],
        [0, 3, config.default.type.fireballDown, 0],
        [2, 0, config.default.type.book, 3000],
        [0, 2, config.default.type.fireballDown, 0],
        [2, 0, config.default.type.book, 3000],
        [0, 1, config.default.type.fireballDown, 0],
        [1, 0, config.default.type.book, 3000],
        [0, 0, config.default.type.fireballDown, 0],
        [0, 0, config.default.type.book, 3000],
        [2, 0, config.default.type.fireballDown, 0],
        [0, 2, config.default.type.book, 3000],
        [2, 1, config.default.type.fireballDown, 0],
        [1, 2, config.default.type.book, 3000],
        [2, 2, config.default.type.fireballDown, 0],
        [2, 2, config.default.type.book, 3000],
        [2, 3, config.default.type.fireballDown, 0],
        [2, 2, config.default.type.book, 3000],
        [2, 4, config.default.type.fireballDown, 0],
    ],

    [//vision block
        [2, 1, config.default.type.fireballDownLeft, 0],
        [0, 0, config.default.type.book, 1000],
    
        [2, 3, config.default.type.fireballDownRight, 0],
        [0, 1, config.default.type.book, 3000],     

        [2, 2, config.default.type.fireballDownLeft, 0],
        [0, 2, config.default.type.book, 3000],
    
        [2, 1, config.default.type.fireballDownRight, 0],
        [0, 3, config.default.type.book, 3000],    

        [2, 4, config.default.type.fireballDownLeft, 0],
        [0, 4, config.default.type.book, 3000],
    
        [0, 0, config.default.type.fireballDownRight, 0],
        [0, 4, config.default.type.book, 3000],    
    
        [0, 3, config.default.type.fireballDownLeft, 0],
        [0, 4, config.default.type.book, 3000],
    ],

    [//get out of the middle
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 4, config.default.type.book, 0],
        [0, 0, config.default.type.book, 1000],
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 3, config.default.type.book, 0],
        [0, 1, config.default.type.book, 4000],
    
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 2, config.default.type.book, 0],
        [0, 2, config.default.type.book, 4000],
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 1, config.default.type.book, 0],
        [0, 3, config.default.type.book, 4000],
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 0, config.default.type.book, 0],
        [0, 4, config.default.type.book, 4000],
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 1, config.default.type.book, 0],
        [0, 3, config.default.type.book, 4000],
    
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 2, config.default.type.book, 0],
        [0, 2, config.default.type.book, 4000],
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 3, config.default.type.book, 0],
        [0, 1, config.default.type.book, 4000],
    
        [1, 0, config.default.type.fireballRight, 0],
        [1, 4, config.default.type.fireballLeft, 0],
        [2, 4, config.default.type.book, 0],
        [0, 0, config.default.type.book, 4000],
    ]
];

spawnConfig.getRandomWave = (difficulty) => {
    let choice
    let waveList = spawnConfig.introWaves;
    switch (difficulty){
        case "easy":
            waveList = spawnConfig.introWaves;
        break;

        case "medium":
            waveList = spawnConfig.midWaves;
        break;

        case "hard":

        break;
    }

    choice = Math.floor(Math.random() * waveList.length);
    return waveList[choice];
}