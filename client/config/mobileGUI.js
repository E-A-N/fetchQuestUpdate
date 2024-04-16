mobileGui = {};
mobileGui.controls = {};
mobileGui.controls.spriteSrc = "assets/img/arrowR.png";
mobileGui.controls.spriteKey = "arrowButton";
mobileGui.alpha = 0.0;
mobileGui.guide = {};
mobileGui.guide.arrowSrc = "assets/img/rightGuide.png";
mobileGui.guide.arrowKey = "guideArrow";

//up direction mobile input gui data
mobileGui.controls.upInput = {
    y: 25,
    width: config.default.gameSpecs.width * 0.50,
    height: config.default.gameSpecs.height * 0.25
};

mobileGui.controls.upInput.x = (config.default.gameSpecs.width * 0.5) - (mobileGui.controls.upInput.width * 0.5);


//down direction mobile input gui data
mobileGui.controls.downInput = {
    x: mobileGui.controls.upInput.x,
    width: mobileGui.controls.upInput.width,
    height: mobileGui.controls.upInput.height
};

mobileGui.controls.downInput.y = config.default.gameSpecs.height - 25 - mobileGui.controls.downInput.height

//left direction mobile input gui data
mobileGui.controls.leftInput = {
    x: 25,
    width: config.default.gameSpecs.width * 0.17,
    height: config.default.gameSpecs.height * 0.75
};

mobileGui.controls.leftInput.y = (config.default.gameSpecs.height * 0.5) - (mobileGui.controls.leftInput.height * 0.5)

//right direction mobile input gui data
mobileGui.controls.rightInput = {
    x: config.default.gameSpecs.width - 25 -mobileGui.controls.leftInput.width,
    width: config.default.gameSpecs.width * 0.17,
    height: config.default.gameSpecs.height * 0.75
};

mobileGui.controls.rightInput.y = (config.default.gameSpecs.height * 0.5) - (mobileGui.controls.leftInput.height * 0.5)

mobileGui.guide.timeUntilCheck = 10000;
mobileGui.guide.autoFade = true;
mobileGui.guide.startAlpha = 0;
mobileGui.guide.arrowHeight  = 75;
mobileGui.guide.arrowWidth   = 75;
mobileGui.guide.arrowRight = {
    x: mobileGui.controls.rightInput.x + (mobileGui.guide.arrowWidth * 0.5),
    y: config.default.gameSpecs.height * 0.5,
    angle: 0,
};

mobileGui.guide.arrowLeft = {
    x: mobileGui.controls.leftInput.x + mobileGui.controls.leftInput.width - (mobileGui.guide.arrowWidth * 0.5),
    y: config.default.gameSpecs.height * 0.5,
    angle: 180,
};

mobileGui.guide.arrowUp = {
    x: config.default.gameSpecs.width * 0.5,
    y: mobileGui.controls.upInput.y * 0.5 + mobileGui.guide.arrowHeight,
    angle: 270,
};

mobileGui.guide.arrowDown = {
    x: config.default.gameSpecs.width * 0.5,
    y: mobileGui.controls.downInput.y * 0.5 + mobileGui.controls.downInput.height + mobileGui.guide.arrowHeight,
    angle: 90,
};