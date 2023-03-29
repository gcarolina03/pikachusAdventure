function Game() {
    this.timer;
    this.timeLeft = 99999999;
    this.key = 1;
    this.level = 1;
    this.obstacles = [];
    this.chests = [];
    this.chestKey = Math.floor(Math.random() * 3);
    this.backgroundMusic = new Audio('../music/pokemonGame.mp3')
    this.introMusic = new Audio('../music/pokemon-opening.mp3')
   

    //elementos principales en el menu
    this.menu = document.getElementById('menu');
    this.level = document.getElementById('level');
    this.container = document.getElementById('container')
    this.game = document.getElementById('game');
    this.game_over = document.getElementById('game_over');
    this.win = document.getElementById('win');
    this.credits = document.getElementById('credits');
}

Game.prototype.start = function () {
    console.log('inicio')
    //remove menu and change container background
    this.menu.style.display = "none";
    this.container.style.background = "black"
    //shows the game board and the level
    this.game.style.display = "flex"
    this.level.style.display = "block"
    

    //The game starts after two seconds.
    setTimeout(() => {
        this.play();
    }, 1000);
}

Game.prototype.play = function () {
    //hide level div
    this.level.style.display = "none";
 

    //----TIMER
    this.timer = setInterval(()=>{this.updateTimer()}, 1000);
    this.updateTimer();
    console.log(timer);

    //NEW CHARACTER 
    let jhonny = new Character();

    //TREES
    this.obstacles.push(new Obstacles(115, 85, 85, 240));
    this.obstacles.push(new Obstacles(155, 370, 85, 135));
    this.obstacles.push(new Obstacles(95, 505, 75, 125));
    this.obstacles.push(new Obstacles(370, 10, 130, 115));
    this.obstacles.push(new Obstacles(495, 120, 150, 130));
    this.obstacles.push(new Obstacles(365, 405, 30, 30));
    this.obstacles.push(new Obstacles(400, 580, 220, 70));
    this.obstacles.push(new Obstacles(405, 645, 75, 50))

    //WATER
    this.obstacles.push(new Obstacles(205, 165, 70, 160));
    this.obstacles.push(new Obstacles(455, 315, 140, 135));

    //CHESTS
    this.chests = document.querySelectorAll(".pokeClose");

    //-------LISTENER KEY
    window.addEventListener('keydown', function (e) {
        jhonny.updateCharacterPosition(e.code);
        console.log(jhonny.pos.x);
        console.log(jhonny.pos.y);
    });
};

Game.prototype.nextLevel = function () {
    this.obstacles = [];
    this.key = 0;
    this.obstacles = [];
    this.chests = [];

    if (this.level === 2) {
        //CHANGES BG
        document
            .querySelector("#board>img")
            .setAttribute("src", "./img/level2.png");
    }
}

//TIMER IN PROGRESS ( NOT WORKING)
Game.prototype.updateTimer = function () {
    this.timeLeft--;
    if (this.timeLeft >= 0)
        document
            .querySelector("#timer>span")
            .innerText = this.timeLeft;
    else {
        this.gameOver();
    }

}

Game.prototype.gameOver = function () {
    // This cancels the setInterval, so the updateTimer stops getting called
    clearInterval(this.timer);
    console.log("end")
    //show you lose
    this.game_over.style.display = "block"
} 
/* 
Game.prototype.startSound = function() {
    var sonido = document.getElementById("pokemonOpening");
    document.body.addEventListener("mousemove", function () {
        sonido.muted = false;
        sonido.play()
    })
} */