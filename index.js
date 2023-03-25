const pixel = document.querySelector(".pixel");
const table = document.querySelector("#game");

console.log(pixel);
console.log(table);

//---------OBSTACLES
const trees = [
    {
        top: 150,
        left: 130,
        width: 40,
        height: 40,
    },{
        top: 285,
        left: 150,
        width: 40,
        height: 40,
    },{
        top: 390,
        left: 155,
        width: 40,
        height: 40,
    },{
        top: 225,
        left: 350,
        width: 140,
        height: 165,
    },
    {
        top: 290,
        left: 590,
        width: 100,
        height: 125,
    },
    {
        top: 200,
        left: 700,
        width: 100,
        height: 140,
    },
]

let pos_x = 0;
let pos_y = 0;
let collision = false;

//---------MOVEMENTS
function down() {
    if (pos_y + 80 < 800) { pos_y += 5; }
}

function up() {
    if (pos_y > 0) { pos_y -= 5; }
}

function right() {
    if (pos_x + 80 < 800) { pos_x += 5; }
}

function left() {
    if (pos_x > 0) { pos_x -= 5; }
}

//-------UPDATE CHARACTER POSITION
function updateCharacterPosition() {
    pixel.style.top = pos_y + "px";
    pixel.style.left = pos_x + "px";
    collision = false;
}

//CHECK IF CHARACTER COLLIDES WITH OBSTACLES
function checkCollision(d) {
    let separator = 2;
    let dir;
    switch (d) {
        case "KeyA":
        case "ArrowLeft":
            dir = "left";
            break
        case "KeyW":
        case "ArrowUp":
            dir = "top";
            break
    }

    trees.forEach(function(tree) {
        //check for overlap in x-axis and y-axis
        const overlapX = ( pos_x < ((tree.left + tree.width) - separator) ) && ( (pos_x + 80) > (tree.left + separator) );
        const overlapY = ( pos_y < ((tree.top + tree.height) - separator) )&& ( (pos_y + 80) > (tree.top + separator) );

        //---Calculates the minimum distance between both axles to avoid collision
        if (overlapX && overlapY) {
            const distanceX = Math.min((pos_x + 80) - tree.left, (tree.left + tree.width) - pos_x);
            const distanceY = Math.min((pos_y + 80) - tree.top, (tree.top + tree.height) - pos_y);
            
            //-----CHECK DIRECTION TO MOVE THE CHARACTER TO
            if (distanceX < distanceY) {
                if (dir === 'left') {
                    pos_x += distanceX;
                } else {
                    pos_x -= distanceX;
                }
            } else {
                if (dir === 'top') {
                    pos_y += distanceY;
                } else {
                    pos_y -= distanceY;
                }
            }       
            //---collision to true
            collision = true;
        }
    })
}


//-------Eventos
window.addEventListener('keydown', function (e) {
    checkCollision(e.code);
    if (!collision) {
        switch (e.code) {
            case "KeyA":
            case "ArrowLeft":
                left();
                break
            case "KeyD":
            case "ArrowRight":
                right();
                break
            case "KeyW":
            case "ArrowUp":
                up();
                break
            case "KeyS":
            case "ArrowDown":
                down();
                break
        }
    }
    updateCharacterPosition();
});
