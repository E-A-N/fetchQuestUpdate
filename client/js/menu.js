let menuState = {}
menuState.canProceed = false;
menuState.playerInfo = {};
menuState.init = (auth) => {
	menuState.canProceed = true;
	return //eandebugtest
	if (typeof auth !== "undefined" && auth !== null){
		if (auth.hasOwnProperty("access_token")){
			// menuState.getDiscordInfo(auth);
		}
		else if (auth.loggedIn){
			menuState.canProceed = true;
			menuState.loggedIn = true;
			menuState.playerInfo = auth;
			menuState.greetPlayer(auth.name, false);
		}
		else {
			menuState.canProceed = true;
		}
	}
}

menuState.preload = () => {
	let pointer = game.add.bitmapData(25, 25);
    //fills the graphic according to rbga
	let color = [0, 0, 0,  1]
	pointer.fill(...color);

    //add graphics to the game storage
    game.cache.addBitmapData('fadeOutBlock', pointer);
}

menuState.create = () => {
	menuState.cursors = game.input.keyboard.createCursorKeys();
	menuState.wasd = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: game.input.keyboard.addKey(Phaser.Keyboard.D),
	}
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	let backgroundSfx = [
		config.default.audio.game.menu1.key,
		config.default.audio.settings.volume,
		true
	]
	menuState.backgroundMusic = game.add.audio(...backgroundSfx);
	menuState.backgroundMusic.play();

	menuState.background1 = game.add.image(0, 0, config.level1State.background2a.spriteKey);
	menuState.background1.scale.x = -1
	menuState.background1.x = 1100
	menuState.background1.y = -200;
	menuState.background2 = game.add.image(0, 0, config.level1State.background2a.spriteKey);
	menuState.background2.tint = 0xADFF2F; //dark yellow

	let slowFade = game.add.tween(menuState.background2)
        .to({alpha: 0}, 20000, Phaser.Easing.Linear.InOut, true, 0, -1, true)
	
	ParticleRise(game, 1, 1);
	menuState.createEntryLogo();
	// menuState.discordLogo = menuState.createDiscordLogo();
	

	//
	game.input.onDown.add( () => {
		menuState.startGame();
    });
};

menuState.createEntryLogo = () => {
	let logoData = [
		config.default.fetchQuest.logo.x, 
		config.default.fetchQuest.logo.y,
		config.default.fetchQuest.logo.spriteKey
	];
	let logo = game.add.image(...logoData);

	let slowFloat = game.add.tween(logo)
        .to({y: logoData[1] + 50}, 10000, Phaser.Easing.Linear.InOut, true, 0, -1, true)
	logo.inputEnabled = true;
	let magicBookSfx = [
		config.default.audio.game.bookLand1.key,
		config.default.audio.settings.volume,
		false
	]
	let clickSound = game.add.audio(...magicBookSfx);
	logo.events.onInputDown.add(() => {
		//update database
		menuState.fadeOut(menuState, () => {
			menuState.showTutorial();
			logo.inputEnabled = false;
		});
		return //eandebug
		if (menuState.canProceed) {
			let query = "GameData";
			let db = firebase.database();
			db.ref(query)
				.once('value')
				.then((data) => {      
					let dbKey = db.ref(query)
					dbKey.set({
						plays: data.val().plays + 1,
					})
					//start the game after database has been updated
					
					clickSound.play();
					if (!menuState.tutorialDisplayed){
						menuState.fadeOut(menuState, () => {
							menuState.showTutorial();
							logo.inputEnabled = false;
						});
					}
				});
		}		
	});

	return logo;
};

menuState.greetPlayer = (name, firstPlay = true) => {
	let namespace = config.default.discord.logo;
	let welcome = firstPlay ? "Welcome, " : "try again, "
	let disData = [
		game.width * 0.5 - 175, 
		game.height - 35, 
		config.default.graphics.font.key,
		welcome + name,
		15
	];
	let nameDisplay = game.add.bitmapText(...disData);
	if (firstPlay) {
		menuState.discordLogo.inputEnabled = false;
		menuState.discordLogo.visible = false;
		menuState.loginText.visible = false;
	}
}

menuState.createDiscordLogo = () => {
	if (menuState.loggedIn){
		return;
	}
	let namespace = config.default.discord.logo;
	let disData = [namespace.x, namespace.y, namespace.spriteKey];
	let disLogo = game.add.image(...disData);	
	disLogo.width  *= 0.5;
	disLogo.height *= 0.5;
	
	let loginTextData = [
		disLogo.x, 
		disLogo.y - 15, 
		config.default.graphics.font.key,
		"login",
		10
	];
    menuState.loginText = game.add.bitmapText(...loginTextData);
    let blinkText = game.add.tween(menuState.loginText)
        .to({alpha: 0}, 1000, null, true, 0, -1, true)

	let request = "https://discord.com/api/oauth2/authorize?response_type=token&client_id=770744303685337089&scope=identify%20email";
	disLogo.inputEnabled = true;
	disLogo.events.onInputDown.add(() => {
		window.location.href = request;
	});

	return disLogo;
};

menuState.fadeOut = (state, call) => {
	let fade = game.add.sprite(0, 0, game.cache.getBitmapData('fadeOutBlock'));
	fade.width = game.width;
	fade.height = game.height;
	fade.alpha = 0;

	let slowFade = game.add.tween(fade)
        .to({alpha: 0.75}, 1000, null, true, 0, 0, false)
	if (typeof call === "function"){
		slowFade.onComplete.add(() => {
			call();
		}, state);
		
	}
}

menuState.showTutorial = () => {
	if (menuState.tutorialDisplayed) {
		return
	}
	else {
		menuState.tutorialDisplayed = true
	}
	let playerConfig = config.level1State.player;
	let playerData = [playerConfig.x, playerConfig.y, playerConfig.spriteKey];
	let bookConfig = config.level1State.book1;
	let bookData = [bookConfig.x, bookConfig.y, bookConfig.spriteKey];
	let bookColors = config.level1State.book1.magicColors;
	
	//Collect book instructions
	let player = game.add.image(...playerData);	
	player.width  *= 0.25;
	player.height *= 0.25;
	player.x = 50;
	player.y = 125;	
	let bookToCollect = game.add.image(...bookData);
	bookToCollect.x = player.x + 100;
	bookToCollect.y = player.y  - 50;
	bookToCollect.width  *= 0.75;
	bookToCollect.height *=0.75;
	let collectTextData = [
		player.x, 
		player.y - 75, 
		config.default.graphics.font.key,
		"Fetch all books!",
		10
	];
    let collectText = game.add.bitmapText(...collectTextData);

	//Dont let magic books touch floor
	let magic1 = game.add.image(...bookData);
	magic1.x = 375;
	magic1.y = 95;
	magic1.width  *= 0.75;
	magic1.height *=0.75;
	magic1.tint = bookColors[0];

	let magic2 = game.add.image(...bookData);
	magic2.x = magic1.x
	magic2.y = magic1.y + magic1.height - 30;
	magic2.width  = magic1.width;
	magic2.height = magic1.height;
	magic2.tint = bookColors[1];

	let magic3 = game.add.image(...bookData);
	magic3.x = magic2.x
	magic3.y = magic2.y + magic2.height - 30;
	magic3.width  = magic2.width;
	magic3.height = magic2.height;
	magic3.tint = bookColors[2];

	let warningTextData = [
		magic1.x - 50, 
		collectText.y, 
		config.default.graphics.font.key,
		"Don't let magic\nbooks fall!",
		10
	];
    let warningText = game.add.bitmapText(...warningTextData);

	//Fireball Warning!
	let fireball = game.add.image(650, 75, "fireball");
	fireball.width  *= 0.45;
	fireball.height *= 0.45;
	
	let player2 = game.add.image(...playerData);	
	player2.width  *= 0.15;
	player2.height *= 0.15;
	player2.scale.x = -player2.scale.x;
	player2.x = fireball.x + 35;
	player2.y = fireball.y + 85;	

	let warning2TextData = [
		fireball.x - 75, 
		collectText.y, 
		config.default.graphics.font.key,
		"Avoid Fireballs!",
		10
	];
    let warning2Text = game.add.bitmapText(...warning2TextData);
	
	//press start prompt
	let pressStartData = [
		(game.width * 0.5) - 200, 
		game.height - 50, 
		config.default.graphics.font.key,
		"press start to continue",
		15
	];
    let pressStart = game.add.bitmapText(...pressStartData);
    let blinkText = game.add.tween(pressStart)
        .to({alpha: 0}, 1000, null, true, 0, -1, true)
};

menuState.startGame = () => {
	if (menuState.tutorialDisplayed){
		menuState.backgroundMusic.stop();
		game.state.start('level1', true, false, menuState.playerInfo);
	}
};

menuState.update = () => {
	let cursors = menuState.cursors;
	let wasd = menuState.wasd;

	let gameInput = cursors.left.isDown  || wasd.left.isDown  || 
					cursors.right.isDown || wasd.right.isDown || 
					cursors.up.isDown    || wasd.up.isDown    || 
					cursors.down.isDown  || wasd.down.isDown;

	if (gameInput){
		menuState.startGame();
	}	
}