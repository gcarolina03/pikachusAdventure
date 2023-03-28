function Character() {
    this.pos = { x: 330, y: 665 };
    this.direction = "";
    this.collision = false;
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

const pixelMove = document.getElementById("player")
//-------UPDATE CHARACTER POSITION
Character.prototype.updateCharacterPosition = function (key) {
    //CHECK COLLISION OBSTACLES
    this.checkCollision(key);
    this.collisionChest();
    //MOVE IF COLLISION IS FALSE
    if (!this.collision) {
        switch (this.direction) {
            case "left":
                if (this.pos.x > 0) { this.pos.x -= 5;
                    pixelMove.classList.add("pixeleft");
                    pixelMove.classList.remove("pixelright");}
                    break
            case "right":
                if (this.pos.x + 50 < 710) { this.pos.x += 5; 
                    pixelMove.classList.add("pixelright");
                    pixelMove.classList.remove("pixeleft");}
                break
            case "up":
                if (this.pos.y > 0) { this.pos.y -= 5; }
                break
            case "down":
                if (this.pos.y + 50 < 714) { this.pos.y += 5; }
                break
        }
    };

    //-------UPDATE POSITION
    const pixel = document.getElementById("player");
    pixel.style.left = this.pos.x + "px";
    pixel.style.top = this.pos.y + "px";
    this.collision = false;
}

//CHECK IF CHARACTER COLLIDES WITH OBSTACLES
Character.prototype.checkCollision = function (key) {
    //CHECK DIRECTION
    this.updateCharacterDirection(key);
    let separator = 10;

    game.obstacles.forEach(function (obs) {
        console.log("foreach")

        //check for overlap in x-axis and y-axis
        const overlapX = (this.pos.x <= (obs.left + obs.width)) && ((this.pos.x + 50) >= obs.left);
        const overlapY = (this.pos.y <= (obs.top + obs.height)) && ((this.pos.y + 50) >= obs.top);

        //---Calculates the minimum distance between both axles to avoid collision
        if (overlapX && overlapY) {

            //-----CHECK DIRECTION TO MOVE THE CHARACTER TO
            /* (this.direction === 'left') ? this.pos.x += separator
                : (this.direction === 'right') ? this.pos.x -= separator
                    : (this.direction === 'down') ? this.pos.y -= separator
                        : (this.direction === 'up') ? this.pos.y += separator
                            : null; */

            //---collision to true
            this.collision = true;
        }
    }.bind(this))
}

//IN PROGRESS (NOT WORKING)
Character.prototype.collisionChest = function () {
    game.chests.forEach(function (chest) {
        console.log((chest.style))

        //check for overlap in x-axis and y-axis
        const overlapX = (this.pos.x < (parseInt(chest.style.left.replace('px', ''), 10) + (parseInt(chest.style.width.replace('px', ''), 10)))) &&
            ((this.pos.x + 50) > (parseInt(chest.style.left.replace('px', ''), 10)))
        const overlapY = (this.pos.y < ((parseInt(chest.style.top.replace('px', ''), 10) + (parseInt(chest.style.height.replace('px', ''), 10))))) &&
            ((this.pos.y + 50) > (parseInt(chest.style.left.replace('px', ''), 10)))

        if (overlapX && overlapY) {
            console.log("overlap chest")
            chest.addEventListener("click", function (e) {
                console.log(e)
            })
        }


    }.bind(this))
}
