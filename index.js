const pixel = document.querySelector(".pixel");
const table = document.querySelector("#game");

console.log(pixel);
console.log(table);

const tree = [
    {
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
    }
]

let pos_x = 0;
let pos_y = 0;

//---------MOVIMIENTOS
function down() {
    if (pos_y + 100 < 800) {
        pos_y += 10;
        pixel.style.top = pos_y + "px"; 
    }
}

function up() {
    if (pos_y > 0) {
        pos_y -= 10;
        pixel.style.top = pos_y + "px";
        console.log(pos_x);
        console.log(pos_y)
    }
}

function right() {
    if (pos_x + 100 < 800) {
        pos_x += 10;
        pixel.style.left = pos_x + "px";
    }
}

function left() {
    if (pos_x > 0) {
        pos_x -= 10;
        pixel.style.left = pos_x + "px";
    }
}

//-------
window.addEventListener('keydown', function (e) {
    console.log(e.code) ;
    switch (e.code) {
        case "ArrowLeft":
            left();
            break
        case "ArrowRight":
            right();
            break
        case "ArrowUp":
            up();
            break
        case "ArrowDown":
            down();
            break
    }
});
