/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
function Game () {
  this.timer
  this.timeLeft = 90
  this.key = 0
  this.obstacles = []
  this.pokeballs = []
  this.medal = Math.floor(Math.random() * 3)
  this.enemy
  this.backgroundMusic = new Audio('./music/pokemonGame.mp3')
  this.introMusic = new Audio('./music/pokemon-opening.mp3')

  // MENU
  this.menu = document.querySelector('#menu')
  this.level = document.querySelector('#level')
  this.container = document.querySelector('#container')
  this.game = document.querySelector('#game')
  this.game_over = document.querySelector('#game_over')
  this.win = document.querySelector('#win')
  this.credits = document.querySelector('#credits')
}

Game.prototype.start = function () {
  // remove menu and change container background
  this.menu.style.display = 'none'
  this.container.style.background = 'black'
  // shows the game board and the level
  this.game.style.display = 'flex'
  this.level.style.display = 'block'
  this.introMusic.play()

  // The game starts after seven seconds.
  setTimeout(() => {
    this.play()
  }, 7000)
}

Game.prototype.play = function () {
  // hide level div
  this.level.style.display = 'none'
  this.introMusic.pause()
  this.backgroundMusic.play()

  // ----TIMER
  this.timer = setInterval(() => { this.updateTimer() }, 1000)
  this.updateTimer()

  // NEW CHARACTER
  const pikachu = new Character()

  // TREES
  this.obstacles.push(new Obstacles(125, 90, 80, 230))
  this.obstacles.push(new Obstacles(160, 375, 70, 120))
  this.obstacles.push(new Obstacles(105, 515, 55, 105))
  this.obstacles.push(new Obstacles(375, 10, 115, 110))
  this.obstacles.push(new Obstacles(500, 125, 130, 115))
  this.obstacles.push(new Obstacles(365, 405, 25, 25))
  this.obstacles.push(new Obstacles(410, 585, 205, 50))
  this.obstacles.push(new Obstacles(405, 645, 65, 50))

  // WATER
  this.obstacles.push(new Obstacles(200, 175, 68, 145))
  this.obstacles.push(new Obstacles(460, 320, 128, 125))

  // pokeballs
  this.pokeballs = document.querySelectorAll('.pokeClose')

  // ENEMY
  this.enemy = new Enemys(270, 1, 200)
  this.enemy.TimerId = setInterval(() => { this.enemy.move() }, this.enemy.speed)

  // -------LISTENER KEY
  window.addEventListener('keydown', function (e) {
    pikachu.updateCharacterPosition(e.code)
  })
}

// TIMER
Game.prototype.updateTimer = function () {
  this.timeLeft--;
  (this.timeLeft >= 0) ? document.querySelector('#timer>span').innerText = this.timeLeft : this.gameOver()
}

// GAME OVER INTERFACE WHEN TIMER IS 0
Game.prototype.gameOver = function () {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(this.timer)
  // show game over
  this.game_over.style.display = 'block'
}

// YOU WIN INTERFACE
Game.prototype.youWin = function () {
  clearInterval(this.timer)
  // show you win
  this.win.style.display = 'block'
}
