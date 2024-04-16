Fireball = (fireConfig) => {

    let x = fireConfig.x;
    let y = fireConfig.y;
    let direction = fireConfig.direction;

        

    let shell = {};
    shell.type = fireConfig.direction;
	shell.config = fireConfig;
	shell.hasDestiny = fireConfig.hasDestiny;
    shell.destiny = fireConfig.destiny //configs with destiny need an orgin
    shell.speed   = fireConfig.speed;
	shell.type    = fireConfig.type;
	shell.sound   = fireConfig.sound;
	shell.target  = fireConfig.target;
	shell.heatDistance = 25;
	shell.firstIntro   = false;
	shell.destroy = () => {
		shell.target.updatePursuers(-1);
		let hasPanel = typeof shell.currentPanel !== "undefined" && shell.currentPanel !== null;
		if (hasPanel) {
			shell.currentPanel.gridSystem.destroyOccupant(shell);
		}
		else {
			fireball.destroy();
		}
	}
	
	let fireball = fireConfig.game.add.image(fireConfig.x, fireConfig.y, "fireball");
	let fireballAnimation = [
		"fireFly", 
		Phaser.Animation.generateFrameNames("fb", 0, 8, ".png"), 
		20, 
		true
	];
	let graphicalAngleOffset = 60;
	fireball.animations.add(...fireballAnimation);
	let animationSpeed = Math.max(15, Math.floor(Math.random() * 60))
	fireball.play("fireFly", animationSpeed);
	fireball.width  = 50;
	fireball.height = 50;
	
	shell.target.updatePursuers(1);
	let update;
	switch(direction){
		case "left":
			fireball.angle = 0 + graphicalAngleOffset;
			fireball.anchor.x = 0.3;
			fireball.anchor.y = 1;
			shell.heatDistance = 50;
			shell.speed = 4; //reset speed
			shell.onPanel = (panel) => {
				if (shell.hasDestiny) {
					fireball.x = shell.currentPanel.sprite.x + fireball.x;
					fireball.y = shell.currentPanel.sprite.y - (fireball.height * 0.25);
					shell.destiny[1] = shell.currentPanel.sprite.y;
				}
				shell.onPanel = null;
			} 
			update = () => {
				fireball.x += shell.speed * -1;
				let onStage = fireball.x > 0 && fireball.x < fireConfig.game.width && fireball.y > 0 && fireball.y < fireConfig.game.height;
                if (onStage && fireball.inCamera && !shell.firstIntro){
					shell.firstIntro = true;
					shell.sound.play();
				}
				if (shell.currentPanel !== null && typeof shell.currentPanel !== "undefined") {
					let hasLeftNeighbor = shell.currentPanel.neighbors.left !== null;
					if (hasLeftNeighbor){
						let neigh = shell.currentPanel.neighbors.left.sprite
						if (fireball.x < neigh.x + (neigh.width * 0.6)){
							gs.moveOccupantPanelDirection(shell, "left", () => {});
						}
					}
				}
				
				if (typeof shell.destiny !== "undefined" && fireball.y > shell.destiny[1]){
					shell.destroy();
					return;
				}
				let outOfBounds = fireball.x + fireball.width < 0;
				if (outOfBounds){
					shell.destroy();
				}
			}
		break;

		case "right":
			fireball.angle = 180 + graphicalAngleOffset;
			fireball.anchor.x = 0.7;
			fireball.anchor.y = 1;
			shell.heatDistance = 50;
			shell.speed = 4; //reset speed
			shell.onPanel = (panel) => {
				if (shell.hasDestiny) {
					fireball.x = shell.currentPanel.sprite.x + fireball.x;
					fireball.y = shell.currentPanel.sprite.y - (fireball.height * 0.75);
					shell.destiny[1] = shell.currentPanel.sprite.y;
				}
				shell.onPanel = null;
			} 
			update = () => {
				fireball.x += shell.speed;
				let onStage = fireball.x > 0 && fireball.x < fireConfig.game.width && fireball.y > 0 && fireball.y < fireConfig.game.height;
                if (onStage && fireball.inCamera && !shell.firstIntro){
					shell.firstIntro = true;
					shell.sound.play();
				}
				if (shell.currentPanel !== null && typeof shell.currentPanel !== "undefined") {
					let hasRightNeighbor = shell.currentPanel.neighbors.right !== null;
					if (hasRightNeighbor){
						let neigh = shell.currentPanel.neighbors.right.sprite
						if (fireball.x + fireball.width > neigh.x){
							gs.moveOccupantPanelDirection(shell, "right", () => {});
						}
					}
				}
				
				if (typeof shell.destiny !== "undefined" && fireball.y > shell.destiny[1]){
					shell.destroy();
					return;
				}
				let outOfBounds = fireball.x - fireball.width > game.width;
				if (outOfBounds){
					shell.destroy();
				}
			}
		break;

		case "down":
			fireball.angle = 270 + graphicalAngleOffset;
			fireball.anchor.x = 0.3;
			fireball.anchor.y = 1;
			shell.speed = 2; //reset speed
			shell.heatDistance = 50;
			shell.onPanel = (panel) => {
				//set destiny based
				if (shell.hasDestiny) {
					fireball.x = shell.currentPanel.sprite.x;
					fireball.y = fireball.y + -shell.currentPanel.sprite.y;
					shell.destiny[1] = shell.currentPanel.sprite.y;
				}
				shell.onPanel = null;
			}     
			update = () => {
				fireball.y += shell.speed;
				let onStage = fireball.x > 0 && fireball.x < fireConfig.game.width && fireball.y > 0 && fireball.y < fireConfig.game.height;
                if (onStage && fireball.inCamera && !shell.firstIntro){
					shell.firstIntro = true;
					shell.sound.play();
				}
                if (typeof shell.destiny !== "undefined" && fireball.y > shell.destiny[1]){
					shell.destroy();
					return;
                }

                let outOfBounds = fireball.y - fireball.height > fireConfig.game.height;
				if (outOfBounds){
					shell.destroy();
					return;
				}
			}
		break;

		case "downRight":
			fireball.angle = 225 + graphicalAngleOffset;
			fireball.anchor.x = 0.3;
			fireball.anchor.y = 1;
			shell.speed = 2;
			shell.onPanel = (panel) => {
				if (shell.hasDestiny) {
					fireball.x = shell.currentPanel.sprite.x + fireball.x;
					fireball.y = shell.currentPanel.sprite.y + fireball.y;
					shell.destiny[1] = shell.currentPanel.sprite.y;
				}
				shell.onPanel = null;
			}    
			update = () => {
				fireball.y += shell.speed;
				fireball.x += shell.speed;
				let onStage = fireball.x > 0 && fireball.x < fireConfig.game.width && fireball.y > 0 && fireball.y < fireConfig.game.height;
                if (onStage && fireball.inCamera && !shell.firstIntro){
					shell.firstIntro = true;
					shell.sound.play();
				}
				if (typeof shell.destiny !== "undefined" && fireball.y > shell.destiny[1]){
					shell.destroy();
					return;
				}
				let outOfBounds = fireball.y - fireball.height > fireConfig.game.height;
				if (outOfBounds){
					shell.destroy();
					return;
				}
			}
		break;

		case "downLeft":
			fireball.angle = 315 + graphicalAngleOffset;
			fireball.anchor.x = 0.5;
			fireball.anchor.y = 1;
			shell.speed = 2;
			shell.onPanel = (panel) => {
				//set destiny based
				if (shell.hasDestiny) {
					fireball.x = shell.currentPanel.sprite.x + fireball.x;
					fireball.y = shell.currentPanel.sprite.y + fireball.y;
					shell.destiny[1] = shell.currentPanel.sprite.y;
				}
				shell.onPanel = null;
			}    
			update = () => {
				fireball.y += shell.speed;
				fireball.x += shell.speed * -1;
				let onStage = fireball.x > 0 && fireball.x < fireConfig.game.width && fireball.y > 0 && fireball.y < fireConfig.game.height;
                if (onStage && fireball.inCamera && !shell.firstIntro){
					shell.firstIntro = true;
					shell.sound.play();
				}
                if (typeof shell.destiny !== "undefined" && fireball.y > shell.destiny[1]){
                    shell.destroy();
                }
				let outOfBounds = fireball.y - fireball.height > fireConfig.game.height;
				if (outOfBounds){
					shell.destroy();
				}
			}
		break;
	}

	
    fireball.update = update;
    shell.sprite = fireball;
    


	return shell;
}