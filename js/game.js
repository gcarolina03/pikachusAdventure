
function Game() {
    this.timer = 300;
    this.key = 0;
    this.level = 1;
    this.exit = {};
    this.obstacles = [];
}

Game.prototype.start = function() {
    //NEW CHARACTER 
    let jhonny = new Character();

    //Trees
    this.obstacles.push(new Obstacles(115, 85, 85, 240));
    this.obstacles.push(new Obstacles(155, 370, 85, 135));
    this.obstacles.push(new Obstacles(95, 505, 75, 125));
    this.obstacles.push(new Obstacles(370, 10, 130, 115));
    this.obstacles.push(new Obstacles(495, 120, 150, 130));
    this.obstacles.push(new Obstacles(365, 405, 30, 30));
    this.obstacles.push(new Obstacles(400, 580, 220, 70));
    this.obstacles.push(new Obstacles(405, 645, 75, 50))

    //Water
    this.obstacles.push(new Obstacles(205, 165, 70, 160));
    this.obstacles.push(new Obstacles(455, 315, 140, 135));

    //-------LISTENER KEY
    window.addEventListener('keydown', function (e) {
        jhonny.updateCharacterPosition(e.code);
        console.log(jhonny.pos.x);
        console.log(jhonny.pos.y);
    });
};

Game.prototype.nextLevel = function() {
    this.obstacles = [];

    if (this.level === 2) {
        //CHANGES BG
        document
            .querySelector("#board>img")
            .setAttribute("src", "./img/level2.png");
    }
}


