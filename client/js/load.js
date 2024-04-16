const loadState = {};

loadState.loadAudio = () => {
    let sfxUI = Object.keys(config.default.audio.game);

    sfxUI.forEach((sfx) => {
        let sound = config.default.audio.game[sfx];
        game.load.audio(sound.key, sound.src);
    });
}

loadState.preload = () => {
    
    loadState.discordLogo = loadState.createDiscordLogo();

    loadState.createLoadingLamp();
    game.load.onFileComplete.add(loadState.onFileLoaded, loadState);
    game.load.onLoadComplete.add(loadState.onComplete, loadState)

    /*
    Load all game assets
    Place your load bar, some messages.
    In this case of loading, only text is placed...
    */
    
    //Load your images, spritesheets, bitmaps...
    let spriteJsonData = [
        config.level1State.fireKey,
        config.default.graphics.spriteSheet.img,
        config.default.graphics.spriteSheet.json
    ];
    game.load.atlasJSONHash(...spriteJsonData);

    game.load.image(config.default.fetchQuest.logo.spriteKey, config.default.fetchQuest.logo.spriteSrc);
    game.load.image(config.menuState.logo.spriteKey, config.menuState.logo.spriteSrc);
    game.load.image(config.level1State.player.spriteKey, config.level1State.player.spriteSrc);
    game.load.image(config.level1State.book1.spriteKey, config.level1State.book1.spriteSrc);
    game.load.image(config.level1State.gridPanel.spriteKey, config.level1State.gridPanel.spriteSrc);
    game.load.image(config.level1State.crosshairPanel.spriteKey, config.level1State.crosshairPanel.spriteSrc);
    game.load.image(config.level1State.background.spriteKey, config.level1State.background.spriteSrc);
    game.load.image(config.level1State.background2a.spriteKey, config.level1State.background2a.spriteSrc);
    game.load.image(config.level1State.background2b.spriteKey, config.level1State.background2b.spriteSrc);
    game.load.image(config.level1State.shadow.spriteKey, config.level1State.shadow.spriteSrc);
    game.load.image(config.level1State.fog.spriteKey, config.level1State.fog.spriteSrc);
    game.load.image(config.default.fetchQuest.apprenticeIcon.spriteKey, config.default.fetchQuest.apprenticeIcon.spriteSrc);
    game.load.image(mobileGui.controls.spriteKey, mobileGui.controls.spriteSrc);
    game.load.image(mobileGui.guide.arrowKey, mobileGui.guide.arrowSrc);
    
    //Load your sounds, efx, music...
    //Example: game.load.audio('rockas', 'assets/snd/rockas.wav');
    loadState.loadAudio();

    //Load your data, JSON, Querys...
    //Example: game.load.json('version', 'http://phaser.io/version.json');
};

loadState.createDiscordLogo = () => {
    let discordCreds = loadState.getQueryVariable(window.location.href);
    if (discordCreds.hasOwnProperty("access_token")){
        return
    }
	let namespace = config.default.discord.logo;
	let disData = [namespace.x, namespace.y, namespace.spriteKey];
	let disLogo = game.add.image(...disData);
					
	disLogo.width  = namespace.width;
	disLogo.height = namespace.height;

	let request = "https://discord.com/api/oauth2/authorize?response_type=token&client_id=770744303685337089&scope=identify%20email";
	disLogo.inputEnabled = true;
	disLogo.events.onInputDown.add(() => {
		window.location.href = request;
	});

    disLogo.width  *= 0.5;
    disLogo.height *= 0.5;

    let loginTextData = [
		disLogo.x, 
		disLogo.y - 15, 
		config.default.graphics.font.key,
		"login",
		10
	];
    loadState.loginText = game.add.bitmapText(...loginTextData);
    loadState.loginText.tint = 0xf57dc5;
    let blinkText = game.add.tween(loadState.loginText)
        .to({alpha: 0}, 1, null, true, 0, -1, true)
	return disLogo;
};

loadState.createLoadingLamp = () => {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    let statusData = [
		500, 
		15, 
		config.default.graphics.font.key,
		"...Loading.",
		10
	];
    loadState.statusText = game.add.bitmapText(...statusData);
    loadState.statusText.tint = 0xf57dc5;

    let percentData = [
		30, 
		15, 
		config.default.graphics.font.key,
		"0%",
		10
	];
    loadState.percentText = game.add.bitmapText(...percentData);
    loadState.percentText.tint = 0xf57dc5;

    let loadingLabel = game.add.text(
        config.loadState.label.x,
        config.loadState.label.y,
        config.loadState.label.print,
        config.loadState.style
    );

    let lampData = [
        0,
        0,
        config.default.fetchQuest.lamp.spriteKey
    ]
    
    lampX = 388.5
    lampY = 238;
    loadState.f0 = Firefly(game, lampX, lampY, 12, 12, 40, 350, false);
    loadState.f1 = Firefly(game, lampX, lampY, 10, 5, 50, 600, false);
    loadState.f2 = Firefly(game, lampX, lampY, 3, 3, Math.floor(Math.random() * 55), 300, false);
    loadState.f3 = Firefly(game, lampX, lampY, 7, 3, 30, 4150, false); 
    let lamp = game.add.image(...lampData)
    lamp.x = (game.width * .5) - lamp.width * .5;
    lamp.alpha = .95
    loadState.f4 = Firefly(game, lampX, lampY, 2, 2, 46, 1000, false);
};


loadState.loadUpdate = () => {
    loadState.f0.update();
    loadState.f1.update();
    loadState.f2.update();
    loadState.f3.update();
    loadState.f4.update();
};

loadState.update = () => {
    loadState.f0.update();
    loadState.f1.update();
    loadState.f2.update();
    loadState.f3.update();
    loadState.f4.update();
}
loadState.onFileLoaded = (progress, cacheKey, success, totalLoaded, totalFiles) => {
    loadState.statusText.setText("...Loading: " + cacheKey);
    loadState.percentText.setText(progress + "%");
};
loadState.onComplete = () => {
    let discordCreds = loadState.getQueryVariable(window.location.href);
    loadState.statusText.setText("Finished Loading! =]");
    loadState.statusText.x += 50;
    game.state.start('menu', true, false, discordCreds);
};
loadState.getQueryVariable = (queryString) => {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};