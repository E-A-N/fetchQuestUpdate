/*
For Fullscreen put this code:

let w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;
*/

let game = new Phaser.Game(
    config.default.gameSpecs.width,
    config.default.gameSpecs.height,
    config.default.gameSpecs.renderType,
    config.default.gameSpecs.parentID,
);

game.state.add(config.default.stateManager.bootState, bootState);
game.state.add(config.default.stateManager.loadState, loadState);
game.state.add(config.default.stateManager.menuState, menuState);
game.state.add(config.default.stateManager.level1State, level1State);
game.state.add(config.default.stateManager.scoreMenuState, scoreMenuState);

game.state.start(config.default.stateManager.bootState);
