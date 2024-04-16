let ParticleRise = (game, pWidth, pHeight) => {
    let rise = {};
    rise.preload = () => {
        
        
        //generate sprite graphic, 10x10
        rise.pointer = game.add.bitmapData(pWidth, pHeight);
        //fills the graphic according to rbga
        let purple = [255, 255, 255, 1]
        rise.pointer.fill(...purple);

        //add graphics to the game
        game.cache.addBitmapData('particleRisejs', rise.pointer);

        //create graphic for shadow moving effect
        bmd = game.add.bitmapData(rise.pointer.width, rise.pointer.height);
        bmd.fill(...purple);
    };

    rise.create = () => {
        game.physics.startSystem(Phaser.Physics.P2JS);

        //add particle emitter, this object will leave trail at character position
        rise.emitter = game.add.emitter(game.width * 0.5, game.height, 300);
        rise.emitter.gravity = -1;
        //rise.emitter.maxParticleSpeed = 0;
        rise.emitter.minRotation = 0;
        rise.emitter.maxRotation = 0;
        //emitter.autoScale = false;
        // let alpha = random ? Math.random() : 1
        // rise.emitter.setAlpha(alpha, 0, 500);
        //emitter.setScale(1,0,1,0,1500,Phaser.Easing.Linear.None);
        rise.emitter.makeParticles(bmd);
        rise.emitter.width = game.width * 1.25;
        rise.emitter.setXSpeed(2, -50);
        rise.emitter.setYSpeed(-1, -50);
        //rise.emitter.blendMode = Phaser.blendModes.ADD;
        rise.emitter.start(true, 10000, 1);
        
        rise.emitter.on = true;
    }


    rise.preload();
    rise.create();
    return rise;
    
}