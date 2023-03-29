function Game() {
    this.timer;
    this.timeLeft = 60;
    this.key = 0;
    this.obstacles = [];
    this.chests = [];
    this.chestKey = Math.floor(Math.random() * 3);
    this.backgroundMusic = new Audio('../music/pokemonGame.mp3')
    this.introMusic = new Audio('../music/pokemon-opening.mp3')
   
    //MENU
    this.menu = document.querySelector('#menu');
    this.level = document.querySelector('#level');
    this.container = document.querySelector('#container')
    this.game = document.querySelector('#game');
    this.game_over = document.querySelector('#game_over');
    this.win = document.querySelector('#win');
    this.credits = document.querySelector('#credits');
}

Game.prototype.start = function () {
    console.log('inicio')
    //remove menu and change container background
    this.menu.style.display = "none";
    this.container.style.background = "black"
    //shows the game board and the level
    this.game.style.display = "flex"
    this.level.style.display = "block"
    this.introMusic.play();

    //The game starts after ten seconds.
    setTimeout(() => {
        this.play();
    }, 10000);
}

Game.prototype.play = function () {
    //hide level div
    this.level.style.display = "none";
    this.introMusic.pause();
    this.backgroundMusic.play();
 
    //----TIMER
    this.timer = setInterval(()=>{this.updateTimer()}, 1000);
    this.updateTimer();

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
    });
};

//TIMER
Game.prototype.updateTimer = function () {
    this.timeLeft--;
    (this.timeLeft >= 0) ? document.querySelector("#timer>span").innerText = this.timeLeft : this.gameOver();
}

//GAME OVER INTERFACE WHEN TIMER IS 0
Game.prototype.gameOver = function () {
    // This cancels the setInterval, so the updateTimer stops getting called
    clearInterval(this.timer);
    console.log("end")
    //show game over
    this.game_over.style.display = "block"
} 

//YOU WIN INTERFACE
Game.prototype.youWin = function() {
    clearInterval(this.timer);
    //show you win
    this.win.style.display = "block"
}
