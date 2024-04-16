let GSSpawnManager = (game, state, cfx) => {

    let spm = {};
    spm.randomized = cfx.randomized; //boolean
    spm.order = cfx.patternsOrder; //order of patterns to appear if it's not randomized
    spm.patternsList = new Array(...cfx.patternsList);
    spm.infinite = cfx.infinite;
    spm.onSpawn = cfx.onSpawn; //function
    spm.waveInterval = cfx.waveInterval; //seconds
    
    //number times randomized patterns will be selected or patternOrders occur
    spm.totalIterations = cfx.patternsList.length;

    spm.currentIteration = 0;
    spm.timer = null;

    //make sure iteration count in correct
    if (!cfx.randomized){
        spm.totalIterations = cfx.patternsList.length;
    }
    spm.spawn = () => {
        if (spm.currentIteration >= spm.totalIterations && !spm.randomized){
            console.log("exiting out of spawner")
            return;
        }

        let choice;
        if (spm.randomized){
            choice = Math.floor(Math.random() * spm.patternsList.length);
        }
        else if (spm.currentIteration < spm.totalIterations) {
            choice = spm.currentIteration++;
        }

        if (spm.infinite && spm.randomized){
            spm.nextSpawn(spm.patternsList[choice], spm.patternsList[choice].length - 1);
        }
        // else if (!spm.infinite && spm.randomized){
        //     spm.nextSpawn(spm.patternsList[choice], spm.patternsList[choice].length - 1);
        // }
        else if (spm.infinite && !spm.randomized && spm.patternsList.length > 0){
            spm.nextSpawn(spm.patternsList[choice], spm.patternsList[choice].length - 1);
        }
        else if (!spm.infinite && !spm.randomized && spm.patternsList.length > 0){
            let nextWave = spm.patternsList.splice(choice, 1)[0];
            spm.nextSpawn(nextWave, nextWave.length - 1)
        }
        else if (spm.infinite && !spm.randomized && spm.patternsList.length < 1){
            spm.patternsList = new Array(...cfx.patternsList);
            let nextWave = spm.patternsList.splice(choice, 1)[0];
            spm.nextSpawn(nextWave, nextWave.length - 1)
        }
    }

    spm.nextSpawn = (wave, spawnIteration) => {
        //find a different implementation in the future that will
        //avoid memory leak
        if (spawnIteration < 0){
            if (spm.infinite === true){
                let nextWave = [
                    Phaser.Timer.SECOND * spm.waveInterval,
                    spm.spawn,
                    state
                ];
    
                game.time.events.add(...nextWave);
            }
            else {
                spm.currentIteration = 0;
                spm.spawn();
            }
            return
        }

        //pass current spawn into current gamestate
        let spawnItem = wave[spawnIteration];
        spm.onSpawn(spawnItem[0], spawnItem[1], spawnItem[2]);

        //recursively que next spawn
        let spawnTimer = [
            spawnItem[3],
            () => {
                spm.nextSpawn(wave, spawnIteration - 1);
            },
            state
        ]
        game.time.events.add(...spawnTimer);
    }

    spm.start = () => {
        spm.spawn();
        return spm;
    };

    spm.stop = () => {
        spm.timer.stop();
    }

    return spm;
}