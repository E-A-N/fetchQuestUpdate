const bootState = {};
bootState.preload = () => {
    
    let loadingLabel = game.add.text(
        config.loadState.label.x,
        config.loadState.label.y,
        config.loadState.label.print,
        config.loadState.style
    );
    let mainFont = [
        config.default.graphics.font.key,
        config.default.graphics.font.image,
        config.default.graphics.font.map
    ];
    game.load.bitmapFont(...mainFont);
    game.load.image(config.default.fetchQuest.lamp.spriteKey, config.default.fetchQuest.lamp.spriteSrc);
    game.load.image(config.default.discord.logo.spriteKey, config.default.discord.logo.spriteSrc);
}

bootState.create = () => {    
    game.state.start('load');
};




