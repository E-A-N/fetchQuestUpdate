const scoreMenuState = {}

scoreMenuState.init = (data) => {
    scoreMenuState.playerInfo = data;
};

scoreMenuState.create = () => {
    
    let scoreboard;
    getDailyTopScores((scores) => {
        scoreboard = scoreMenuState.createTopScoreDisplay(scores);
        scoreboard.x = 250;
        scoreboard.y = 50;
    });
    
    game.input.onDown.add( () => {
        game.state.start('menu', true, false, scoreMenuState.playerInfo);
    });
}


scoreMenuState.createTopScoreDisplay = (scores) => {
    let container = game.add.group(); 
    let font = config.default.graphics.font.key;
    let fontSize = 10;
    let yOffset = 30;

    let header = game.add.bitmapText(0, 0, font, "Todays Top Scores", fontSize + 5);
    header.tint = config.default.graphics.themeTint;
    container.add(header);
    //game only has room for 30 characters
    scores.forEach((score, index) => {
        let renderData = [
            0,
            (header.height * 3) + yOffset * index,
            font,
            score.score + "....." + score.name,
            fontSize
        ]
        //console.log(index, renderData[3].length)
        let display = game.add.bitmapText(...renderData);

        if (score.name === scoreMenuState.playerInfo.username){
            display.tint = config.default.graphics.themeTint;
            let blinkName = game.add.tween(display)
                .to({alpha: 0}, 500, null, true, 0, -1, true);
        }
        container.add(display);
    });

    let userHasScore = typeof scoreMenuState.playerInfo !== "undefined" && typeof scoreMenuState.playerInfo.score !== "undefined";
    if (userHasScore) {
        let yourData = [
            0,
            (header.height * 7) + yOffset * scores.length,
            font,
            "Your Score:" + scoreMenuState.playerInfo.score,
            fontSize + 5
        ]

        let yours = game.add.bitmapText(...yourData);
        yours.tint = config.default.graphics.themeTint;
        container.add(yours);
    }

    return container;

};