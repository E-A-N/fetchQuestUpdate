
let level1State = {}

level1State.init = (playerData) => {
	level1State.playerInfo = {};
	if (playerData.loggedIn){
		level1State.playerInfo = playerData;
	}
	else {
		level1State.playerInfo.name = "Apprentice";
	}
}

level1State.create = () => {
	let backgroundSfx = [
		config.default.audio.game.background1.key,
		config.default.audio.settings.volume,
		true
	]
	level1State.backgroundMusic = game.add.audio(...backgroundSfx);
	level1State.backgroundMusic.play();

	let magicBookSfx = [
		config.default.audio.game.confirm1.key,
		config.default.audio.settings.volume,
		false
	]
	level1State.magicBookSfx = game.add.audio(...magicBookSfx);

	let bookLandSfx = [
		config.default.audio.game.bookLand1.key,
		config.default.audio.settings.volume,
		false
	]
	level1State.bookLandSfx = game.add.audio(...bookLandSfx);

	let bookCollectSfx = [
		config.default.audio.game.bookCollect1.key,
		config.default.audio.settings.volume,
		false
	]
	level1State.bookCollectSfx = game.add.audio(...bookCollectSfx);

	let fireSfx = [
		config.default.audio.game.fireball1.key,
		config.default.audio.settings.volume,
		false
	];
	level1State.fireballSound = game.add.audio(...fireSfx);

	level1State.cursors = game.input.keyboard.createCursorKeys();
	level1State.wasd = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: game.input.keyboard.addKey(Phaser.Keyboard.D),
	}
	level1State.background = game.add.image(0, 0, config.level1State.background2a.spriteKey);
	level1State.background.width  = game.width;
	level1State.background.height = game.height;

	
	level1State.background2 = game.add.image(0, 0, config.level1State.background2b.spriteKey);
	level1State.background2.width  = game.width;
	level1State.background2.height = game.height;

	//Add Text Displays
	let scoreSprite = [
		config.level1State.scoreDisplay.x,
		config.level1State.scoreDisplay.y,
		config.default.graphics.font.key,
		config.level1State.scoreDisplay.text,
		20
	]
	level1State.score = {
		sprite: game.add.bitmapText(...scoreSprite),
		name: config.level1State.scoreDisplay.text,
		value: 0,
	};

	let userName = [
		config.level1State.scoreDisplay.x,
		config.level1State.scoreDisplay.y + 60,
		config.default.graphics.font.key,
		level1State.playerInfo.name,
		20
	]

	
	level1State.userName = game.add.bitmapText(...userName);

	let comboSprite = [
		level1State,
		config.level1State.scoreDisplay.x,
		config.level1State.scoreDisplay.y + 30
	]
	level1State.combo = level1State.comboSystem(...comboSprite);

	level1State.fogLeft = {
		emitter: level1State.initParticleSystem(225, 90, config.level1State.fog.spriteKey, 300),
	}

	level1State.fogRight = {
		emitter: level1State.initParticleSystem(700, 90, config.level1State.fog.spriteKey, 300),
	}

	level1State.layer0Sprites = game.add.group();
	level1State.layer1Sprites = game.add.group();
	level1State.layer2Sprites = game.add.group();
	level1State.gridLayers = [
		level1State.layer0Sprites,
		level1State.layer1Sprites,
		level1State.layer2Sprites
	];

	
	
	gs = GridSystem(game, level1State, config.level1State.grid)	
	level1State.gridSystem = gs;
	level1State.player = level1State.addPlayerOccupant(gs, 1, 1, config.level1State.player);
	let mobileInputs = MobileControls(mobileGui, level1State.player);
	//add the grid panel sprites to grid layers
	level1State.gridLayers.forEach((layer, index) => {
		gs.panels[index].forEach((panel) => {
			layer.add(panel.sprite);
		});
	});

	let generateWaves = [
		//spawnConfig.midWaves[2]
		spawnConfig.getRandomWave("easy"),
		spawnConfig.getRandomWave("easy"),
		spawnConfig.getRandomWave("easy"),
		spawnConfig.getRandomWave("medium"),
		spawnConfig.getRandomWave("medium"),
		spawnConfig.getRandomWave("medium"),
	];

	let spawnEx = {
		randomized: true,
		//patternsList: config.level1State.allSpawns,
		patternsList: generateWaves,
		infinite: true,
		waveInterval: 2,
		onSpawn: (row, col, type) => {
			switch (type) {
				case config.default.type.book:
					level1State.addDebrisOccupant(gs, row, col, config.level1State.book1);
				break;

				case config.default.type.fireballDown:
					level1State.createFireball(gs, row, col, config.level1State.fireballDown);
				break;

				case config.default.type.fireballLeft:
					level1State.createFireball(gs, row, col, config.level1State.fireballLeft);
				break;

				case config.default.type.fireballRight:
					level1State.createFireball(gs, row, col, config.level1State.fireballRight);
				break;

				case config.default.type.fireballDownLeft:
					level1State.createFireball(gs, row, col, config.level1State.fireballDownLeft);
				break;

				case config.default.type.fireballDownRight:
					level1State.createFireball(gs, row, col, config.level1State.fireballDownRight);
				break;
			}			
		},
	}

	level1State.spawner = GSSpawnManager(game, level1State, spawnEx);
	level1State.spawner.start(level1State);
	level1State.guides = level1State.drawGuide(level1State, mobileGui);
	level1State.guides.fadeIn();
};

 level1State.createFireball = (gs, row, col, fireConfig) => {

	let fire = {
		x: fireConfig.x,
		y: fireConfig.y,
		direction: fireConfig.type,
		type: fireConfig.type,
		target: gs.panels[row][col],
		game: game,
		hasDestiny: true,
		destiny: [250, 350], //revisit destiny logic
		speed: 3,
		sound: level1State.fireballSound
	};

	let occupant = Fireball(fire);

	level1State.gridLayers[row].add(occupant.sprite);

	//gs.registerOccupant(occupant);
	gs.insertOccupant(row, col, occupant);
 }

level1State.comboSystem = (state, x, y) => {
	let coSystem = {};
	coSystem.modIncrement = 0.1;
	coSystem.modifyer = 1.0;
	coSystem.bonus = 0;
	coSystem.bonusIncrement = 0;
	coSystem.activeBonus = false;
	coSystem.text = "Combo: ";
	coSystem.display = game.add.bitmapText(x, y, config.default.graphics.font.key, 'testy', 20);
	coSystem.oX = coSystem.display.x;
	coSystem.oY = coSystem.display.y;
	coSystem.oWidth = coSystem.display.width;
	coSystem.oHeight = coSystem.display.height;
	coSystem.bonusTween = null;
	coSystem.display.alpha = 0;
	coSystem.display.tint = 0x7bf44e
	coSystem.count = 0;
	coSystem.minimumCombo = 2;
	coSystem.calculateBonus = (itemValue) => {		
		let bonus = Math.ceil((itemValue + coSystem.bonusIncrement) * coSystem.modifyer);
		coSystem.bonus += bonus;
		coSystem.bonusIncrement += coSystem.modIncrement;
		coSystem.bonusIncrement = Math.min(coSystem.bonusIncrement, 7.1);
	}

	coSystem.break = () => {	
		let bonus = coSystem.bonus
		state.score.value += bonus;
		coSystem.bonus = 0;
		coSystem.count = 0;
		coSystem.bonusIncrement = 0;
		coSystem.timer.stop(false);
		coSystem.display.alpha = 0;
		coSystem.activeBonus = false;
		return bonus;
	}

	coSystem.countUp = (itemValue = 0) => {
		coSystem.count++;
		coSystem.timerRestart();
		if (coSystem.count > coSystem.minimumCombo){
			coSystem.display.alpha = 1;
			coSystem.calculateBonus(itemValue);
			coSystem.display.visible = true;
			coSystem.activeBonus = true;
			if (coSystem.bonusTween === null){
				let tweenItems = {
					x: coSystem.oX + 5,
				}
				coSystem.bonusTween = game.add.tween(coSystem.display)
					.to(tweenItems, 20, Phaser.Easing.Bounce.InOut, true, 0, 2, true);
				coSystem.bonusTween.onComplete.addOnce(() => {
					coSystem.bonusTween = null;
				})

				if (coSystem.count % 10 === 0){
					let bonus10Tween = game.add.bitmapText(x, y, config.default.graphics.font.key, coSystem.text + coSystem.count, 20);
					bonus10Tween.tint = 0x7bf44e
					let items = {
						width: bonus10Tween.width * 2,
						height: bonus10Tween.height * 2,
						x: bonus10Tween.x - 75
					}
					let b10Fade= game.add.tween(bonus10Tween)
						.to(items, 300, Phaser.Easing.Linear.Out, true, 0, 0, false);
					b10Fade.onComplete.addOnce(() => {
						b10Fade = null;
						bonus10Tween.destroy();
						bonus10Tween = null;
					})
				}
			}
		}
		coSystem.display.text = coSystem.text + coSystem.count;
	};

	coSystem.timer = game.time.create(false);
	coSystem.timer.loop(10000, coSystem.break, state);
	coSystem.timerRestart = () => {
		coSystem.timer.stop(false);
		coSystem.timer.start();
	};

	return coSystem;
}

level1State.particleBurst = (emi, type) => {
	if (type === "left") {
		emi.width  = 70;
		emi.height = 50;
		emi.maxRotation = 30;
		emi.minRotation = 0;
		emi.maxParticleScale = 0.50;
		emi.minParticleScale = 0.15;
		emi.setAlpha(0.05, 0.25, 1500);
		emi.setXSpeed(-15,13);
		emi.setYSpeed(0, 0);
		emi.start(true, 12000, null, 1);
		emi.gravity = 0.35;
	}
	else if (type === "right" && Math.random() > 0.9) {
		emi.width  = 90;
		emi.height = 30;
		emi.maxRotation = 30;
		emi.minRotation = 0;
		emi.maxParticleScale = 0.70;
		emi.minParticleScale = 0.20;
		emi.setAlpha(0.15, 0.35, 1500);
		emi.setXSpeed(-20,10);
		emi.setYSpeed(0, 0);
		emi.start(true, 20000, null, 1);
		emi.gravity = 0.10;
	}
};

level1State.initParticleSystem = (startX, startY,spriteKey, amount) => {
	let emitter = game.add.emitter(startX ,startY, amount);
    emitter.makeParticles(spriteKey);
	emitter.gravity = 0;
	emitter.maxRotation = 0;
    return emitter;
};

level1State.addPlayerOccupant = (gs, row, col, playerConfig) => {
	let playerData = [playerConfig.x, playerConfig.y, playerConfig.spriteKey];
	let player = game.add.image(...playerData);
	let inputs = {
		up: false,
		down: false,
		left: false,
		right: false
	}
	player.width = playerConfig.width;
	player.height = playerConfig.height;
	player.anchor.x = 0.5;
	player.anchor.y = 1;
	
	let playerOccupant = {
		sprite: player,
		panX: playerConfig.panX,
		panY: playerConfig.panY,
		varX: playerConfig.varX,
		varY: playerConfig.varY,
		shadowX: playerConfig.shadowX,
        shadowY: playerConfig.shadowY,
		type: config.default.type.player,
		commands: [],
		currentPanel: null,
		gridId: 0,
		onPanel: null,
		shadow: null,
		inputs: inputs,
		coolDownModifier: 0.25,
		canMove: true,
		destroyed: false
	}

	playerOccupant.oScaleX = player.scale.x;
	playerOccupant.oScaleY = player.scale.y;

	let shadow = level1State.addShadow(playerOccupant);
	playerOccupant.shadow = shadow;
	shadow.width  -=  player.width * .20;
	shadow.height -=  player.height * 0.20;

	playerOccupant.destroy = () => {
		let hasPanel = typeof playerOccupant.currentPanel !== "undefined" && playerOccupant.currentPanel !== null;
		if (hasPanel) {
			playerOccupant.currentPanel.gridSystem.destroyOccupant(playerOccupant);
		}
		else {
			player.destroy();
		}
		playerOccupant.destroyed = true;
	}

	playerData.onDestroy = () => {
		player.visible = false;
		player = null;
	}

	level1State.gridLayers[row].add(playerOccupant.sprite);
	level1State.gridLayers[row].add(shadow);
	gs.registerOccupant(playerOccupant);
	gs.insertOccupant(row, col, playerOccupant);

	return playerOccupant;
}



level1State.addDebrisOccupant = (gs, row, col, debrisConfig) => {
	let onPanel;
	let debrisData = [debrisConfig.x, debrisConfig.y, debrisConfig.spriteKey];
	let debris = game.add.image(...debrisData);
	let inputs = {
		up: false,
		down: false,
		left: false,
		right: false
	}
	debris.width  = debrisConfig.width;
	debris.height = debrisConfig.height;
	debris.anchor.x = 0.5;
	debris.anchor.y = 1;

	let randomValue = Math.random();


	//handle unique item modifiers
	let scoreMod = 1;
	let isMagical = randomValue > 0.96
	if (isMagical){
		let allColors = debrisConfig.magicColors;
		let randomIndex = Math.floor(Math.random() * allColors.length);
		let color = allColors[randomIndex]
		debris.tint = color;
		scoreMod = 6;
	}
	
	let varianceX = debrisConfig.varX * randomValue;
	varianceX = randomValue > 0.5 ? varianceX : varianceX * -1;

	let varianceY = debrisConfig.varY * randomValue;
	varianceY = randomValue > 0.5 ? varianceY : varianceY * -1;
	let hasLanded = false;
	let debrisOccupant = {
		sprite: debris,
		panX: debrisConfig.panX,
		panY: debrisConfig.panY,
		varX: varianceX,
		varY: 0,
		scoreValue: debrisConfig.scoreValue * scoreMod,
		shadowX: debrisConfig.shadowX,
		shadowY: debrisConfig.shadowY,
		isMagical: isMagical,
		type: config.default.type.book,
		commands: [],
		weight: debrisConfig.weight,
		currentPanel: null,
		shadow: null,
		hasLanded: false,
		onPanel: (panel) => {
			if (debrisOccupant.sprite.y !== panel.sprite.y){
				debrisOccupant.panY += debrisOccupant.weight;
			}
			else { //item has landed on floor
				if (isMagical){
					console.log("You lose!!");
					console.log("Your score is:", level1State.score.value)
					
					level1State.gameOver();
					return;
				}
				level1State.combo.break();
				if (!hasLanded){
					hasLanded = true;
					level1State.bookLandSfx.play();
				}
			}
		},
		gridId: 0,  //will be overwritten
		inputs: inputs,
		coolDownModifier: 0.25,
		canMove: true,
	}

	debrisOccupant.sprite.events.onDestroy.add(() => {
		if (debrisOccupant.shadow !== null){
			debrisOccupant.shadow.destroy();
		}
	}, level1State);

	let shadow = level1State.addShadow(debrisOccupant);
	debrisOccupant.shadow = shadow;

	level1State.gridLayers[row].add(debrisOccupant.sprite);
	level1State.gridLayers[row].add(shadow);

	gs.registerOccupant(debrisOccupant);
	gs.insertOccupant(row, col, debrisOccupant);
	return debrisOccupant;

}

level1State.addShadow = (occupant) => {
	let data = [
		occupant.sprite.x,
		occupant.sprite.y - occupant.panY,
		config.level1State.shadow.spriteKey
	];

	let shadow = game.add.image(...data);
	shadow.width  = occupant.sprite.width;
	shadow.height = occupant.sprite.height;
	shadow.anchor.x = occupant.sprite.anchor.x;
	shadow.anchor.y = 0.6//occupant.sprite.anchor.y;
	shadow.update = () => {
		shadow.x = occupant.sprite.x + occupant.shadowX
		shadow.y = occupant.sprite.y + occupant.shadowY - occupant.panY
	};


	return shadow;
}

level1State.update = () => {
	level1State.gridSystem.update(); //update panel grid
	level1State.updatePlayer(level1State.player);
	level1State.particleBurst(level1State.fogLeft.emitter, "left");
	level1State.particleBurst(level1State.fogRight.emitter, "right");
	
	//depth sort each grid sprite in their respective layer
	level1State.gridLayers.forEach((layer) => {
		layer.sort('y', Phaser.Group.SORT_ASCENDING);
	});

	let score = level1State.score.name + level1State.score.value;
	if (level1State.combo.activeBonus) {
		let bonus = ` + ${Math.ceil(level1State.combo.bonus)}`;
		score = score + bonus
	}
	level1State.score.sprite.text = score
}

level1State.playerInteraction = (occupant) => {
	switch (occupant.type){
        case config.default.type.book:
			gs.destroyOccupant(occupant);
			level1State.score.value += occupant.scoreValue;
			level1State.combo.countUp(occupant.scoreValue);
			level1State.bookCollectSfx.play();
			if (occupant.isMagical){
				level1State.magicBookSfx.play();
			}
		break;

		case config.default.type.fireball:	
		break;
	}
}

level1State.updatePlayer = (player) => {
	if (player.destroyed){
		return;
	}
	let myPanel = player.currentPanel;
	config.default.fireballTypes

	let myPanelIsHot = myPanel.status === 2 ||
					myPanel.status === 3 ||
					myPanel.status === 4 ||
					myPanel.status === 5 ||
					myPanel.status === 6;

	if (myPanelIsHot){
		console.log("Burned!");
		level1State.fireballSound.play();
		level1State.gameOver();
		return;
	}
	if (myPanel.occupants.length > 1) {
		myPanel.occupants.forEach((neighbor) => {
			if (player === neighbor){
				return;
			}
			let isColliding = player.sprite.overlap(neighbor.sprite)
			if (isColliding){
				level1State.playerInteraction(neighbor)
			}
		});
	}
	
	let inputOccured = false;
	let cursors = level1State.cursors;
	let wasd = level1State.wasd;

	if (cursors.left.isDown || player.inputs.left || wasd.left.isDown)
    {
		gs.moveOccupantPanelDirection(player, "left", level1State.changeDepth);
		player.inputs.left = false;
		inputOccured = true;
		player.sprite.scale.x = -player.oScaleX;
    }
    else if (cursors.right.isDown || player.inputs.right || wasd.right.isDown)
    {
		gs.moveOccupantPanelDirection(player, "right", level1State.changeDepth);
		player.inputs.right = false;
		inputOccured = true;
		player.sprite.scale.x = player.oScaleX;
	}
	else if (cursors.up.isDown || player.inputs.up || wasd.up.isDown)
    {
		gs.moveOccupantPanelDirection(player, "up", level1State.changeDepth);
		player.inputs.up = false;
		inputOccured = true;
	}
	else if (cursors.down.isDown || player.inputs.down || wasd.down.isDown)
    {
		gs.moveOccupantPanelDirection(player, "down", level1State.changeDepth);
		player.inputs.down = false;
		inputOccured = true;
	}
	
	if (inputOccured && level1State.guides.autoFade){
		level1State.guides.timerRestart();
	}
}

level1State.changeDepth = (occupant, oldPanel, newPanel) => {
	let oldRow = oldPanel.idAxis[0];
	level1State.gridLayers[oldRow].remove(occupant.sprite);
	level1State.gridLayers[oldRow].remove(occupant.shadow);

	let newRow = newPanel.idAxis[0];
	level1State.gridLayers[newRow].add(occupant.sprite);
	level1State.gridLayers[newRow].add(occupant.shadow);
}

level1State.render = () => {
	
	
}

level1State.debugRender = () => {
	for (let r = 0; r < gs.panels.length; r++){
		let row = gs.panels[r];
		for (let c = 0; c < row.length; c++){
			let pSpr = gs.panels[r][c].sprite;
			game.debug.spriteBounds(pSpr);
			//game.debug.spriteCorners(pSpr, true, true);
		}
	}
	game.debug.spriteBounds(level1State.player.sprite);
}

level1State.gameOver = () => {
	level1State.player.destroy();
	level1State.combo.break();
	level1State.backgroundMusic.stop();
	let defaultName = "random apprentice";
	let defaultEmail = "apprentice";
	let whenScoreIsSet = () => {
		let entryModel = {
			email: level1State.playerInfo.email || defaultEmail,
			name: level1State.playerInfo.name,
			score: level1State.score.value,
		}

		entryModel.name = level1State.playerInfo.loggedIn ? entryModel.name : defaultName;
		let highScoreEntry = [0, entryModel];
		level1State.playerInfo.score = level1State.score.value;
		submitNewEntryForTopScore(highScoreEntry, () => {
			game.state.start('scoreMenu', true, false, level1State.playerInfo);
		});
	};

	if (level1State.playerInfo.loggedIn){
		setUserScore(level1State.playerInfo.name, level1State.playerInfo.email, level1State.score.value, whenScoreIsSet);
	}
	else {
		setUserScore(defaultName, defaultEmail, level1State.score.value, whenScoreIsSet);
	};
}

level1State.drawGuide = (state, mobile) => {
	let layout = mobile.controls;
	let guides = mobile.guide;
	let leftX  = layout.leftInput.x + layout.leftInput.width;
	let topY   = layout.upInput.y   + layout.upInput.height;
	let rightX = layout.rightInput.x;
	let bottomY = layout.downInput.y;
	let leftStart = [leftX, 0];
	let leftEnd   = [leftX, game.height];
	let rightStart = [rightX, 0];
	let rightEnd   = [rightX, game.height];
	let topStart  = [leftX, topY];
	let topEnd    = [rightX, topY];
	let bottomStart = [leftX, bottomY];
	let bottomEnd   = [rightX, bottomY];

	let tweenTime   = 3500;
	let tweenDelay  = 0;
	let tweenAmount = 3;
	let tweenType = Phaser.Easing.Cubic.Out;
	let delta = 0.50;
	let fontSize = 35;
	
	

	//RIGHT INPUTS GUIDE
	let signRightData = [
		guides.arrowRight.x,
		guides.arrowRight.y,
		guides.arrowKey
	];
	let signRight = game.add.sprite(...signRightData);
	signRight.anchor.setTo(0.5, 0.5);
	signRight.width  = guides.arrowWidth
	signRight.height = guides.arrowHeight;
	signRight.angle  = guides.arrowRight.angle;
	signRight.alpha  = guides.startAlpha;
	let srTween = game.add.tween(signRight);
	let signRightShell = {
		sprite: signRight,
		tween: srTween,
		tweenArgs: [{ x: signRight.x + (signRight.width * delta) }, tweenTime, tweenType, false]
	}
	let dKeyData = [
		signRight.x - 20,
		signRight.y - 85,
		config.default.graphics.font.key,
		"D",
		fontSize
	]
	let dKey = game.add.bitmapText(...dKeyData);
	dKey.alpha = guides.startAlpha
	let dKeyShell = {
		sprite: dKey,
		tween: null,
		tweenArgs: null
	}
	

	//LEFT INPUTS GUIDE
	let signLeftData = [
		guides.arrowLeft.x,
		guides.arrowLeft.y,
		guides.arrowKey
	];
	let signLeft = game.add.sprite(...signLeftData);
	signLeft.anchor.setTo(0.5, 0.5);
	signLeft.width  = guides.arrowWidth;
	signLeft.height = guides.arrowHeight;
	signLeft.angle  = guides.arrowLeft.angle;
	signLeft.alpha  = guides.startAlpha;
	let slTween = game.add.tween(signLeft);
	let signLeftShell = {
		sprite: signLeft,
		tween: slTween,
		tweenArgs: [{ x: signLeft.x - (signLeft.width * delta) }, tweenTime, tweenType, false]
	}
	let aKeyData = [
		signLeft.x - 10,
		signLeft.y - 80,
		config.default.graphics.font.key,
		"A",
		fontSize
	]
	let aKey = game.add.bitmapText(...aKeyData);
	aKey.alpha = guides.startAlpha;
	let aKeyShell = {
		sprite: aKey,
		tween: null,
		tweenArgs: null
	}

	//UP INPUTS GUIDE
	let signUpData = [
		guides.arrowUp.x,
		guides.arrowUp.y,
		guides.arrowKey
	];
	let signUp = game.add.sprite(...signUpData);
	signUp.anchor.setTo(0.5, 0.5);
	signUp.width  = guides.arrowWidth;
	signUp.height = guides.arrowHeight;
	signUp.angle = guides.arrowUp.angle;
	signUp.alpha  = guides.startAlpha;
	let suTween = game.add.tween(signUp)
	let signUpShell = {
		sprite: signUp,
		tween: suTween,
		tweenArgs: [{ y: signUp.y - (signUp.height * delta) }, tweenTime, tweenType, false]
	}
	let wKeyData = [
		signUp.x - 85,
		signUp.y - 20,
		config.default.graphics.font.key,
		"W",
		fontSize
	]
	let wKey = game.add.bitmapText(...wKeyData);
	wKey.alpha = guides.startAlpha
	let wKeyShell = {
		sprite: wKey,
		tween: null,
		tweenArgs: null
	}

	//DOWN INPUTS GUIDE
	let signDownData = [
		guides.arrowDown.x,
		guides.arrowDown.y,
		guides.arrowKey
	];
	let signDown = game.add.sprite(...signDownData);
	signDown.anchor.setTo(0.5, 0.5);
	signDown.width  = guides.arrowWidth;
	signDown.height = guides.arrowHeight;
	signDown.angle = guides.arrowDown.angle;
	signDown.alpha  = guides.startAlpha;
	let sdTween = game.add.tween(signDown)
	let signDownShell = {
		sprite: signDown,
		tween: sdTween,
		tweenArgs: [{ y: signDown.y + (signDown.height * delta) }, tweenTime, tweenType, false]
	}
	let sKeyData = [
		signDown.x - 85,
		signDown.y - 20,
		config.default.graphics.font.key,
		"S",
		fontSize
	]
	let sKey = game.add.bitmapText(...sKeyData);
	sKey.alpha = guides.startAlpha
	let sKeyShell = {
		sprite: sKey,
		tween: null,
		tweenArgs: null
	}

	let bmd = game.add.bitmapData(game.width, game.height);	
	bmd.ctx.beginPath();
    bmd.ctx.lineWidth = 4;
	bmd.ctx.strokeStyle = 'white';
	bmd.ctx.setLineDash([10,10]);
	bmd.ctx.moveTo(...leftStart);    
	bmd.ctx.lineTo(...leftEnd);
	bmd.ctx.moveTo(...rightStart);    
	bmd.ctx.lineTo(...rightEnd);
	bmd.ctx.moveTo(...topStart);    
	bmd.ctx.lineTo(...topEnd);
	bmd.ctx.moveTo(...bottomStart);    
	bmd.ctx.lineTo(...bottomEnd);
    bmd.ctx.stroke();
	bmd.ctx.closePath();
	
	let lineGuides = game.add.sprite(0, 0, bmd);
	lineGuides.alpha = 0;

	
	let shell = {
		guides: [signUpShell, signDownShell, signLeftShell, signRightShell, dKeyShell, wKeyShell, aKeyShell, sKeyShell],
		grid: lineGuides,
		active: false,
		autoFade: guides.autoFade
	};

	shell.fadeOut = () => {
		shell.guides.forEach((gell) => {
			game.add.tween(gell.sprite)
				.to({ alpha: 0 }, tweenTime, tweenType, true, false)
		});

		let tween = game.add.tween(shell.grid)
			.to({ alpha: 0 }, tweenTime, tweenType, true, false);

		tween.onComplete.add(() => {
			shell.active = false;
			if (shell.autoFade) {
				shell.timer.start();
			}
		});
	};

	shell.fadeIn = () => {
		if (shell.active === false){
			shell.timer.stop(false);
			shell.active = true;
			shell.guides.forEach((gell) => {
				game.add.tween(gell.sprite)
					.to({ alpha: 0.50 }, tweenTime, tweenType, true, false);
					
			});

			let tween = game.add.tween(shell.grid)
				.to({ alpha: 0.50 }, tweenTime, tweenType, true, false)
				.onComplete.add(() => {
					shell.fadeOut();
				}, state);
		}
	};

	if (shell.autoFade) {
		let inputTimer = game.time.create(false);
		inputTimer.loop(guides.timeUntilCheck, () =>{
			shell.fadeIn();
		}, state);

		inputTimer.start();
		shell.timer = inputTimer;
		shell.timerRestart = () => {
			shell.timer.stop(false);
			shell.timer.start();
		}
	}
	

    return shell;
}
