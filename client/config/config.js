const config = {};
config.default = {};
config.default.gameSpecs = {
    width: 812,
    height: 372,
    renderType: Phaser.AUTO,
    parentID : "gameContainer",
    version: "1.0.0"
};
config.default.graphics = {
    font: {
        key: "carrierCommand",
        image: "assets/font/carrierCommand.png",
        map: "assets/font/carrierCommand.xml"
    },
    fontStyle: {

    },
    spriteSheet: {
        img: "assets/img/fireball.png",
        json: "assets/img/fireball.json"
    },
    themeTint: 0xf57dc5
};

config.default.discord = {}
config.default.discord.logo = {
    x: 30,
    y: 275,
    width: 100,
    height: 72,
    spriteKey: "discordLogo",
    spriteSrc: "assets/external/discordLogo.png"
};

config.default.fetchQuest = {};
config.default.fetchQuest.apprenticeIcon = {
    x: 50,
    y: 225,
    width: 75,
    height: 75,
    spriteKey: "apprenticeIcon",
    spriteSrc: "assets/img/apprenticeIcon.png"
};
config.default.fetchQuest.logo = {
    x: 250,
    y: 15,
    width: 150,
    height: 150,
    spriteKey: "gameLogo",
    spriteSrc: "assets/img/fetchQuestLogo.png"
};

config.default.fetchQuest.lamp = {
    x: 0,
    y: 0,
    width: 150,
    height: 150,
    spriteKey: "lamp1",
    spriteSrc: "assets/img/loadingLamp.png",
};

config.default.audio = {
    root: "assets/audio/",
    settings: {
        volume: 0.5
    },
};

config.default.audio.game = {
    background1: {
        src: "assets/audio/tooCrazy.mp3",
        key: "background1"
    },
   menu1: {
        src: "assets/audio/warmLight.mp3",
        key: "menu1"
    },
    confirm1 : {
        src: "assets/audio/confirmSound1.mp3",
        key: "confirm1"
    },
    fireball1: {
        src: "assets/audio/fireWhoosh.mp3",
        key: "fireball"
    },
    bookCollect1: {
        src: "assets/audio/bookCollect1.ogg",
        key: "bookCollect1"
    },
    bookLand1: {
        src: "assets/audio/bookLand1.ogg",
        key: "bookLand"
    },
    deathCry1: {
        src: "assets/audio/funnyYellEdit.mp3",
        key: "deathCry1"
    }
};

config.loadState = {
    style: {
        font: "30px Courier",
        fill: "#fff"
    },
    label: {
        text : {
            x: 80,
            y: 150,
            print: "loading..."
        }
    }
};
config.bootState = {};
config.menuState = {
    logo : {
        x: config.default.gameSpecs.width * 0.5 - 150,
        y: 50,
        spriteKey: "menuLogo",
        spriteSrc: "assets/img/antPixelLogo.png"
    }
};


config.default.stateManager = {
    bootState: "boot",
    loadState: "load",
    menuState: "menu",
    level1State: "level1",
    scoreMenuState: "scoreMenu"
}
config.level1State = {
    player: {
        x: 0,
        y: 0,
        varX: 0,
        varY: 0,
        panX: 0,
        panY: 10,
        shadowX: 0,
        shadowY: 5,
        width: 125,
        height: 125,
        spriteKey: "playerSprite",
        spriteSrc: "assets/img/apprenticeNewSprite.png"
    },
    gridPanel: {
        x: 0,
        y: 0,
        spriteKey: "gridPanel",
        spriteSrc: "assets/img/whiteSquare.png"
    },
    crosshairPanel: {
        x: 0,
        y: 0,
        spriteKey: "crosshairPanel",
        spriteSrc: "assets/img/crosshairSquare.png"
    },
    book1: {
        x: 0,
        y: 0,
        varX: 25,
        varY: 2,
        panX: 0,
        shadowX: 0,
        shadowY: 0,
        panY: -200,
        width: 25,
        height: 25,
        weight: 0.5,
        scoreValue: 6,
        spriteKey: "book1",
        spriteSrc: "assets/img/goodBook.png",
        magicColors: [
            0x89cff0,
            0x66ff00,
            0xFF0000
        ]
    },
    scoreDisplay: {
        x: 20,
        y: 280,
        text: "score: "
    },
    shadow: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        spriteKey: "shadow",
        spriteSrc: "assets/img/shadow.png"
    },
    fog:{
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        spriteKey: "fog",
        spriteSrc: "assets/img/fogParticle.png"
    },
    background: {
        x: 0,
        y: 0,
        width: config.default.gameSpecs.width,
        height: config.default.gameSpecs.height,
        spriteKey: "background",
        spriteSrc: "assets/img/background.png"
    },
    background2a: {
        x: 0,
        y: 0,
        width: config.default.gameSpecs.width,
        height: config.default.gameSpecs.height,
        spriteKey: "background2a",
        spriteSrc: "assets/img/background2a.png"
    },
    background2b: {
        x: 0,
        y: 0,
        width: config.default.gameSpecs.width,
        height: config.default.gameSpecs.height,
        spriteKey: "background2b",
        spriteSrc: "assets/img/background2b.png"
    },
    fireKey: "fireball",
    fireballDown: {
        x: -1,
        y: -100,
        type: "down"
    },
    fireballLeft: {
        x: 400,
        y: -1,
        type: "left"
    },
    fireballRight: {
        x: -400,
        y: -1,
        type: "right"
    },
    fireballDownLeft: {
        x: 400,
        y: -400,
        type: "downLeft"
    },
    fireballDownRight: {
        x: -400,
        y: -400,
        type: "downRight"
    },
};

config.level1State.grid = {
    width: 80,
    height: 30,
    gridSprite: config.level1State.gridPanel.spriteKey,
    rowAmount: 3,
    columnAmount: 5,
    xGap: 15,
    yGap: 10,
    startX: 215,
    startY: 150
};

config.default.type = {
    player: 0,
    book: 1,
    fireballDown:  2,
    fireballLeft:  3,
    fireballRight:  4,
    fireballDownLeft: 5,
    fireballDownRight: 6
};

config.default.fireballTypes = {
    down:  2,
    left:  3,
    right:  4,
    downLeft: 5,
    downRight: 6
};

config.level1State.fireSpawns1 = [
    [0, 4, config.default.type.fireballLeft, 3000],
    [1, 4, config.default.type.fireballLeft, 3000],
    [2, 4, config.default.type.fireballLeft, 3000]
];

config.level1State.fireSpawns2 = [
    [2, 0, config.default.type.fireballRight, 3000],
    [1, 0, config.default.type.fireballRight, 3000],
    [0, 0, config.default.type.fireballRight, 3000]
];

config.level1State.fireSpawns3 = [
    [0, 0, config.default.type.fireballDown, 3000],
    [0, 1, config.default.type.fireballDown, 3000],
    [0, 2, config.default.type.fireballDown, 3000],
    [0, 3, config.default.type.fireballDown, 3000],
    [0, 4, config.default.type.fireballDown, 3000]
];

config.level1State.fireSpawns4 = [
    [1, 0, config.default.type.fireballDownRight, 1000],
    [1, 1, config.default.type.fireballDownRight, 1000],
    [1, 2, config.default.type.fireballDownRight, 1000],
    [1, 3, config.default.type.fireballDownRight, 1000],
    [1, 4, config.default.type.fireballDownRight, 1000]
];

config.level1State.fireSpawns5 = [
    [2, 0, config.default.type.fireballDownLeft, 1000],
    [2, 1, config.default.type.fireballDownLeft, 1000],
    [2, 2, config.default.type.fireballDownLeft, 1000],
    [2, 3, config.default.type.fireballDownLeft, 1000],
    [2, 4, config.default.type.fireballDownLeft, 1000]
];

config.level1State.bookSpawns1 = [
    [0, 0, config.default.type.book, 250],
    [0, 1, config.default.type.book, 250],
    [0, 2, config.default.type.book, 250],
    [0, 3, config.default.type.book, 250],
    [0, 4, config.default.type.book, 250],
];

config.level1State.bookSpawns2 = [
    [2, 4, config.default.type.book, 250],
    [0, 1, config.default.type.book, 500],
    [0, 4, config.default.type.book, 1000]
];

config.level1State.bookSpawns3 = [
    [0, 2, config.default.type.book, 250],
    [0, 3, config.default.type.book, 1000],
    [0, 4, config.default.type.book, 250],
    [1, 2, config.default.type.book, 1000],
];

config.level1State.bookSpawns4 = [
    [1, 0, config.default.type.book, 250],
    [1, 3, config.default.type.book, 1000],
    [1, 4, config.default.type.book, 250],
    [1, 1, config.default.type.book, 1000],
];

config.level1State.bookSpawns5 = [
    [2, 4, config.default.type.book, 250],
    [0, 2, config.default.type.book, 1000],
    [2, 0, config.default.type.book, 250],
    [2, 1, config.default.type.book, 1000],
];

config.level1State.allSpawns = [
    config.level1State.bookSpawns1,
    config.level1State.bookSpawns2,
    config.level1State.bookSpawns3,
    config.level1State.bookSpawns4,
    config.level1State.bookSpawns5
];





let isNodeJsCompatible = typeof module !== "undefined"
if (isNodeJsCompatible)  {
    module.exports = config;
}
