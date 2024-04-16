let MobileControls = (configIn, ioModel) => {
    let upButtonConfig = [
        configIn.controls.upInput.x,
        configIn.controls.upInput.y,
        configIn.controls.spriteKey
    ]
    let upButton = game.add.sprite(...upButtonConfig)
    upButton.width  = configIn.controls.upInput.width;
    upButton.height = configIn.controls.upInput.height;
    upButton.alpha = configIn.alpha;
    upButton.inputEnabled = true;
    upButton.events.onInputDown.add(() => {
        ioModel.inputs.up = true;
    });
    
    let downButtonConfig = [
        configIn.controls.downInput.x,
        configIn.controls.downInput.y,
        configIn.controls.spriteKey
    ]
    let downButton = game.add.sprite(...downButtonConfig)
    downButton.width  = configIn.controls.downInput.width;
    downButton.height = configIn.controls.downInput.height;
    downButton.alpha = configIn.alpha;
    downButton.inputEnabled = true;
    downButton.events.onInputDown.add(() => {
        ioModel.inputs.down = true;
    });
    
    let leftButtonConfig = [
        configIn.controls.leftInput.x,
        configIn.controls.leftInput.y,
        configIn.controls.spriteKey
    ]
    let leftButton = game.add.sprite(...leftButtonConfig)
    leftButton.width  = configIn.controls.leftInput.width;
    leftButton.height = configIn.controls.leftInput.height;
    leftButton.alpha = configIn.alpha;
    leftButton.inputEnabled = true;
    leftButton.events.onInputDown.add(() => {
        ioModel.inputs.left = true;
    });
    
    let rightButtonConfig = [
        configIn.controls.rightInput.x,
        configIn.controls.rightInput.y,
        configIn.controls.spriteKey
    ]
    let rightButton = game.add.sprite(...rightButtonConfig)
    rightButton.width  = configIn.controls.rightInput.width;
    rightButton.height = configIn.controls.rightInput.height;
    rightButton.alpha = configIn.alpha;
    rightButton.inputEnabled = true;
    rightButton.events.onInputDown.add(() => {
        ioModel.inputs.right = true;
    });
}

