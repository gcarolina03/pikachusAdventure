function Character() {
    this.pos = { x: 0, y: 0 };
    this.direction = "left";
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
    }
}

//-------UPDATE CHARACTER POSITION
Character.prototype.updateCharacterPosition = function (direction) {
    //CHECK DIRECTION
    this.updateCharacterDirection(direction);
    //CHECK COLLISION OBSTACLES
    this.checkCollision();

    //MOVE IF COLLISION IS FALSE
    if (!this.collision) {
        switch (this.direction) {
            case "left":
                if (this.pos.x > 0) { this.pos.x -= 5; }
                break
            case "right":
                if (this.pos.x + 80 < 800) { this.pos.x += 5; }
                break
            case "up":
                if (this.pos.y > 0) { this.pos.y -= 5; }
                break
            case "down":
                if (this.pos.y + 80 < 800) { this.pos.y += 5; }
                break
        }
    };

    //-------UPDATE POSITION
    const pixel = document.querySelector(".pixel");
    pixel.style.left = this.pos.x + "px";
    pixel.style.top = this.pos.y + "px";
    this.collision = false;
}

//CHECK IF CHARACTER COLLIDES WITH OBSTACLES
Character.prototype.checkCollision = function () {
    let separator = 2;

    trees.forEach(function (tree) {
        console.log("foreach")

        //check for overlap in x-axis and y-axis
        const overlapX = (this.pos.x < ((tree.left + tree.width) - separator)) && ((this.pos.x + 80) > (tree.left + separator));
        const overlapY = (this.pos.y < ((tree.top + tree.height) - separator)) && ((this.pos.y + 80) > (tree.top + separator));

        //---Calculates the minimum distance between both axles to avoid collision
        if (overlapX && overlapY) {
            const distanceX = Math.min((this.pos.x + 80) - tree.left, (tree.left + tree.width) - this.pos.x);
            const distanceY = Math.min((this.pos.y + 80) - tree.top, (tree.top + tree.height) - this.pos.y);

            //-----CHECK DIRECTION TO MOVE THE CHARACTER TO
            if (distanceX < distanceY) {
                if (this.direction === 'left') {
                    this.pos.x += distanceX;
                } else {
                    this.pos.x -= distanceX;
                }
            } else {
                if (this.direction === 'up') {
                    this.pos.y += distanceY;
                } else {
                    this.pos.y -= distanceY;
                }
            }
            //---collision to true
            this.collision = true;
        }
    }.bind(this))
}
