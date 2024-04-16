let Firefly = (game, x, y, width, height, distance, time, random = false) => {
    let ff = {};
    ff.preload = () => {
        
        if (random){
            // width = width * Math.random();
            // height = height * Math.random();
            distance = distance * Math.random();
            time = time * Math.random();
        }
        //generate sprite graphic, 10x10
       ff.pointer = game.add.bitmapData(width, height);
        //fills the graphic according to rbga
        let purple = [200, 100, 200,  1]
        if (random){
            evens = purple[0] * Math.random() + 30;
            odd = purple[1] * Math.random();
            purple[0] = evens;
            purple[2] = evens;
            purple[1] = odd;
        }
        else if(Math.random() > 0.25) {
            purple = [255, 255, 255, 1]
        }
        ff.pointer.fill(...purple);

        //add graphics to the game
        game.cache.addBitmapData('fireflyjs', ff.pointer);
        //create graphic for shadow moving effect
        bmd = game.add.bitmapData(ff.pointer.width, ff.pointer.height);
        bmd.fill(...purple);
    };

    ff.create = () => {
        game.physics.startSystem(Phaser.Physics.P2JS);
        ff.pointer_sprite = game.add.sprite(x, y, game.cache.getBitmapData('fireflyjs'));
        //pointer_sprite.anchor = new Phaser.Point(0.5, 0.5);
        ff.pointer_sprite.anchor.setTo(0.5,0.5); //alternative to above line

        //add particle emitter, this object will leave trail at character position
        ff.emitter = game.add.emitter(x, y, 500);
        ff.emitter.gravity = 0;
        ff.emitter.maxParticleSpeed = 0;
        ff.emitter.minRotation = 0;
        ff.emitter.maxRotation = 100;
        //emitter.autoScale = false;
        let alpha = random ? Math.random() : 1
        ff.emitter.setAlpha(alpha, 0, 500);
        //emitter.setScale(1,0,1,0,1500,Phaser.Easing.Linear.None);
        ff.emitter.makeParticles(bmd);
        ff.emitter.start(false, 500, 0);
        //ff.emitter.blendMode = Phaser.blendModes.ADD;

        let createPoints = (x, y, diff) => {
            let points = [
                [],
                []
            ];
            
            points[0].push(x);
            points[0].push(x - diff);
            points[0].push(x);
            points[0].push(x + diff);

            points[1].push(y - diff);
            points[1].push(y);
            points[1].push(y + diff);
            points[1].push(y);
            
            return points;
        }

        let points = createPoints (ff.pointer_sprite.x, ff.pointer_sprite.y, distance);
        
        let generateTweens = (spr, points, duration) => {
            //points = points.reverse();
            //points[0] = points[0].reverse();
            //points[1] = points[1].reverse();

            let easeXFunction1 =  Phaser.Easing.Linear.In;
            let easeXFunction2 =  Phaser.Easing.Linear.Out;
            let easeYFunction1 =  Phaser.Easing.Circular.In;
            let easeYFunction2 =  Phaser.Easing.Circular.Out;


            let randyX = Math.random();
            if (randyX > 0.5){
                let temp = points[0][1];
                points[0][1] = points[0][3];
                points[0][3] = temp;
            }

            if (random) {
                let randyY = Math.random();
                if (randyY > 0.5){
                    let temp = points[1][0];
                    points[1][0] = points[1][2];
                    points[1][2] = temp;
                }
            }

            let t1X = game.add.tween(spr).to({x: points[0][0]}, duration, easeXFunction1, false)
            let t2X = game.add.tween(spr).to({x: points[0][1]}, duration, easeXFunction2, false)
            let t3X = game.add.tween(spr).to({x: points[0][2]}, duration, easeXFunction1, false)
            let t4X = game.add.tween(spr).to({x: points[0][3]}, duration, easeXFunction2, false)

            t1X.chain(t2X);
            t2X.chain(t3X);
            t3X.chain(t4X);
            t4X.chain(t1X);

            let t1Y = game.add.tween(spr).to({y: points[1][0]}, duration, easeYFunction2, false)
            let t2Y = game.add.tween(spr).to({y: points[1][1]}, duration, easeYFunction1, false)
            let t3Y = game.add.tween(spr).to({y: points[1][2]}, duration, easeYFunction2, false)
            let t4Y = game.add.tween(spr).to({y: points[1][3]}, duration, easeYFunction1, false)

            t1Y.chain(t2Y);
            t2Y.chain(t3Y);
            t3Y.chain(t4Y);
            t4Y.chain(t1Y);

            return [t1X, t1Y];
        }

        let tweens = generateTweens(ff.pointer_sprite, points, time);
        tweens[0].start();
        tweens[1].start();

        ff.pointer_sprite.alpha = 1;
    }

    ff.update = () => {
        ff.emitter.on = true;
        ff.emitter.x = ff.pointer_sprite.x;
        ff.emitter.y = ff.pointer_sprite.y;
    }

    ff.preload();
    ff.create();
    return ff;
    
}