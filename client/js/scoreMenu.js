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
    
    //Initial Load State
    let discord = scoreMenuState.createDiscordLogo();
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
            score[1].score + "....." + score[1].name,
            fontSize
        ]
        //console.log(index, renderData[3].length)
        let display = game.add.bitmapText(...renderData);

        if (score[1].name === scoreMenuState.playerInfo.username){
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

scoreMenuState.createDiscordLogo = () => {
    let namespace = config.default.fetchQuest.apprenticeIcon
	let disData = [namespace.x, namespace.y, namespace.spriteKey];
	let disLogo = game.add.image(...disData);	

	let loginTextData = [
		disLogo.x, 
		disLogo.y - 15, 
		config.default.graphics.font.key,
		"Join us!",
		10
	];
    //menuState.loginText = game.add.bitmapText(...loginTextData);
    let loginText = game.add.bitmapText(...loginTextData);
    //loginText.tint = config.default.graphics.themeTint;
    let blinkLogin = game.add.tween(loginText)
        .to({alpha: 0}, 250, null, true, 0, -1, true);

    let becomeA = game.add.bitmapText(...loginTextData);
    becomeA.text = "Become a Game";
    becomeA.y = disLogo.y + 85;
    becomeA.x = disLogo.x - 25;

    let tester = game.add.bitmapText(...loginTextData);
    tester.tint = config.default.graphics.themeTint;
    tester.alpha = 0;
    tester.text = "Tester";
    tester.y = becomeA.y + 15
    let blinkTester = game.add.tween(tester)
        .to({alpha: 1}, 1000, null, false, 0, 0, true);

    let designer = game.add.bitmapText(...loginTextData);
    designer.tint = config.default.graphics.themeTint;
    designer.alpha = 0;
    designer.text = "Designer";
    designer.y = becomeA.y + 15
    let blinkdesigner = game.add.tween(designer)
        .to({alpha: 1}, 1000, null, false, 0, 0, true);

    let programmer = game.add.bitmapText(...loginTextData);
    programmer.tint = config.default.graphics.themeTint;
    programmer.alpha = 0;
    programmer.text = "Programmer";
    programmer.y = becomeA.y + 15
    let blinkprogrammer = game.add.tween(programmer)
        .to({alpha: 1}, 1000, null, false, 0, 0, true);

    blinkTester.chain(blinkdesigner);
    blinkdesigner.chain(blinkprogrammer);
    blinkprogrammer.chain(blinkTester);

    blinkTester.start();


	let request = "https://discord.gg/QZhShsx";
	disLogo.inputEnabled = true;
	disLogo.events.onInputDown.add(() => {
		window.location.href = request;
	});

	return disLogo;
};