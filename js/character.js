function Character() {
    this.pos = { x: 330, y: 665 };
    this.direction = "";
    this.collision = ""

}

Character.prototype.updateCharacterDirection = function (direction) {
    switch (direction) {
        case "KeyA":
        case "ArrowLeft":
            this.direction = "left";
            break
        case "KeyD":
        case "ArrowRight":
            this.direction = "right";
            break
        case "KeyW":
        case "ArrowUp":
            this.direction = "up";
            break
        case "KeyS":
        case "ArrowDown":
            this.direction = "down";
            break
        default:
            this.direction = "";
    }
}

//-------UPDATE CHARACTER POSITION
Character.prototype.updateCharacterPosition = function (key) {
    const pixel = document.getElementById("player");
    //CHECK DIRECTION
    this.updateCharacterDirection(key);
   
    //MOVE IF COLLISION IS FALSE
        switch (this.direction) {
            case "left":
                if (this.pos.x > 0) { this.pos.x -= 4;
                    pixel.classList.add("pixeleft");
                    pixel.classList.remove("pixelright");}
                    break
            case "right":
                if (this.pos.x + 50 < 710) { this.pos.x += 4; 
                    pixel.classList.add("pixelright");
                    pixel.classList.remove("pixeleft");}
                break
            case "up":
                if (this.pos.y > 0) { this.pos.y -= 4; }
                break;
            case "down":
                if (this.pos.y + 50 < 710) { this.pos.y += 4; }
                break;
        }

    //CHECK COLLISION OBSTACLES
    this.checkCollision();
    this.checkChest();

    //-------UPDATE POSITION
    pixel.style.left = this.pos.x + "px";
    pixel.style.top = this.pos.y + "px";
}

//CHECK IF CHARACTER COLLIDES WITH OBSTACLES
Character.prototype.checkCollision = function () {

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
        }
    }.bind(this))
}

//IN PROGRESS (NOT WORKING)
Character.prototype.checkChest = function () {

    game.chests.forEach( function(c) {
        let chest = getComputedStyle(c);

        const overlapX = (this.pos.x - 3 <= (parseInt(chest.left) + parseInt(chest.width))) && ((this.pos.x + 50) >= parseInt(chest.left));
        const overlapY = (this.pos.y - 3 <= (parseInt(chest.top) + parseInt(chest.height))) && ((this.pos.y + 50) >= parseInt(chest.top));
        const isColliding = overlapX && overlapY;

        if (isColliding) {
            // ADJUST POSITION TO NOT OVERLAP WITH OBSTACLE (Hasta las narices, me vuelvo a los arrays)
            c.classList.remove("chestClose");
            c.classList.add("chestOpen");
        }
    }.bind(this))
}
