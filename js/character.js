function Character() {
    this.pos = { x: 330, y: 665 };
    this.direction = "";
    this.collision = "";
}

Character.prototype.updateCharacterDirection = function (direction) {
    switch (direction) {
        case "KeyA":
        case "ArrowLeft":
            this.direction = "left";
            break;
        case "KeyD":
        case "ArrowRight":
            this.direction = "right";
            break;
        case "KeyW":
        case "ArrowUp":
            this.direction = "up";
            break;
        case "KeyS":
        case "ArrowDown":
            this.direction = "down";
            break;
        default:
            this.direction = "";
    }
}

//-------UPDATE CHARACTER POSITION
Character.prototype.updateCharacterPosition = function (key) {
    //CHARACTER ELEMENT
    const pixel = document.querySelector("#player");

    document
        .querySelector("#empty_pokeball")
        .style.display = "none";

    //CHECK DIRECTION
    this.updateCharacterDirection(key);
   
    //MOVE
        switch (this.direction) {
            case "left":
                if (this.pos.x > 0) { this.pos.x -= 4;
                    pixel.classList.add("pixeLeft");
                    pixel.classList.remove("pixelRight") };
                break;
            case "right":
                if (this.pos.x + 50 < 710) { this.pos.x += 4; 
                    pixel.classList.add("pixelRight");
                    pixel.classList.remove("pixeLeft") };
                break;
            case "up":
                if (this.pos.y > 0) { this.pos.y -= 4 }
                break;
            case "down":
                if (this.pos.y + 50 < 710) { this.pos.y += 4 };
                break;
        }

    //CHECK OBSTACLES COLLISION
    /* this.checkCollision(); */

    //CHECK POKEBALL COLLISION
    this.checkPokeball();

    //IF KEY CHECK EXIT COLLISION TO WIN
    if (game.key === 1) { this.checkExit() };

    //-------UPDATE POSITION
    pixel.style.left = this.pos.x + "px";
    pixel.style.top = this.pos.y + "px";
}

//CHECK IF CHARACTER COLLIDES WITH OBSTACLES
Character.prototype.checkCollision = function() {

    //CHECK ALL OBSTACLES
    game.obstacles.forEach(function (obs) {
        const overlapX = (this.pos.x - 3 <= (obs.left + obs.width)) && ((this.pos.x + 50) >= obs.left);
        const overlapY = (this.pos.y - 3 <= (obs.top + obs.height)) && ((this.pos.y + 50) >= obs.top);
        const isColliding = overlapX && overlapY;

        if (isColliding) {
            // ADJUST POSITION TO NOT OVERLAP WITH OBSTACLE (Hasta las narices, me vuelvo a los arrays)
            (this.direction === "left") ? this.pos.x = obs.left + obs.width + 4
            : (this.direction === "right") ? this.pos.x = obs.left - 50 - 4
            : (this.direction === "up") ? this.pos.y = obs.top + obs.height + 4
            : (this.direction === "down") ? this.pos.y = obs.top - 50 - 4
            : null;
        };
    }.bind(this));
};

//CHECK CHEST
Character.prototype.checkPokeball = function() {
    for (let i = 0; i < game.chests.length; i++) {
        let chest = getComputedStyle(game.chests[i]);

        const overlapX = (this.pos.x - 3 <= (parseInt(chest.left) + parseInt(chest.width))) && ((this.pos.x + 50) >= parseInt(chest.left));
        const overlapY = (this.pos.y - 3 <= (parseInt(chest.top) + parseInt(chest.height))) && ((this.pos.y + 50) >= parseInt(chest.top));
        const isColliding = overlapX && overlapY;

        //IF COLLISION WITH A POKEBALL CHECK IF THE KEY IS INSIDE AND CHANGE IMG TO
        if (isColliding) {
            if (i === game.chestKey) {
                document.querySelector("#exit").classList.add("exit");
                game.key = 1
                document
                    .querySelector("#keycount")
                    .innerText = game.key;
            } else {
                console.log("not collision")
                document
                    .querySelector("#empty_pokeball")
                    .style.display = "block";
            }
            game.chests[i].classList.remove("pokeClose");
            game.chests[i].classList.add("pokeOpen");
        };
    };
};

//CHECK EXIT TO WIN
Character.prototype.checkExit = function() {
    let e = document.querySelector("#exit");
    let exit = getComputedStyle(e);

    const overlapX = (this.pos.x - 3 <= (parseInt(exit.left) + parseInt(exit.width))) && ((this.pos.x + 50) >= parseInt(exit.left));
    const overlapY = (this.pos.y - 3 <= (parseInt(exit.top) + parseInt(exit.height))) && ((this.pos.y + 50) >= parseInt(exit.top));
    const isColliding = overlapX && overlapY;

    if (isColliding) {
        game.youWin();
    }
}