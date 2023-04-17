/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
function Character () {
  this.hearts = 3
  this.pos = { x: 330, y: 665 }
  this.direction = ''
}

Character.prototype.updateCharacterDirection = function (direction) {
  switch (direction) {
    case 'KeyA':
    case 'ArrowLeft':
      this.direction = 'left'
      break
    case 'KeyD':
    case 'ArrowRight':
      this.direction = 'right'
      break
    case 'KeyW':
    case 'ArrowUp':
      this.direction = 'up'
      break
    case 'KeyS':
    case 'ArrowDown':
      this.direction = 'down'
      break
    default:
      this.direction = ''
  }
}

// -------UPDATE CHARACTER POSITION
Character.prototype.updateCharacterPosition = function (key) {
  // CHARACTER ELEMENT
  const pixel = document.querySelector('#player')

  document
    .querySelector('#empty_pokeball')
    .style.display = 'none'

  // CHECK DIRECTION
  this.updateCharacterDirection(key)

  // MOVE
  switch (this.direction) {
    case 'left':
      if (this.pos.x > 0) {
        this.pos.x -= 4.5
        pixel.classList.add('pixeLeft')
        pixel.classList.remove('pixelRight')
      };
      break
    case 'right':
      if (this.pos.x + 50 < 710) {
        this.pos.x += 4.5
        pixel.classList.add('pixelRight')
        pixel.classList.remove('pixeLeft')
      };
      break
    case 'up':
      if (this.pos.y > 0) { this.pos.y -= 4.5 }
      break
    case 'down':
      if (this.pos.y + 38 < 710) { this.pos.y += 4.5 };
      break
  }

  // CHECK OBSTACLES COLLISION
  this.checkCollision()

  // CHECK POKEBALL COLLISION
  this.checkPokeball()
  // CHECK ENEMY
  this.checkEnemy()

  // IF KEY CHECK EXIT COLLISION TO WIN
  if (game.key === 1) { this.checkExit() };

  // -------UPDATE POSITION
  pixel.style.left = this.pos.x + 'px'
  pixel.style.top = this.pos.y + 'px'
}

// CHECK IF CHARACTER COLLIDES WITH OBSTACLES
Character.prototype.checkCollision = function () {
  // CHECK ALL OBSTACLES
  game.obstacles.forEach(function (obs) {
    const overlapX = (this.pos.x - 4.5 <= (obs.left + obs.width)) && ((this.pos.x + 50) >= obs.left)
    const overlapY = (this.pos.y - 4.5 <= (obs.top + obs.height)) && ((this.pos.y + 37) >= obs.top)
    const isColliding = overlapX && overlapY

    if (isColliding) {
      // ADJUST POSITION TO NOT OVERLAP WITH OBSTACLE
      (this.direction === 'left')
        ? this.pos.x = obs.left + obs.width + 4.5
        : (this.direction === 'right')
            ? this.pos.x = obs.left - 50 - 4.5
            : (this.direction === 'up')
                ? this.pos.y = obs.top + obs.height + 4.5
                : (this.direction === 'down')
                    ? this.pos.y = obs.top - 38 - 4.5
                    : null
    };
  }.bind(this))
}

// CHECK CHEST
Character.prototype.checkPokeball = function () {
  for (let i = 0; i < game.pokeballs.length; i++) {
    const chest = getComputedStyle(game.pokeballs[i])

    const overlapX = (this.pos.x - 4.5 <= (parseInt(chest.left) + parseInt(chest.width))) && ((this.pos.x + 50) >= parseInt(chest.left))
    const overlapY = (this.pos.y - 4.5 <= (parseInt(chest.top) + parseInt(chest.height))) && ((this.pos.y + 37) >= parseInt(chest.top))
    const isColliding = overlapX && overlapY

    // IF COLLISION WITH A POKEBALL CHECK IF THE KEY IS INSIDE AND CHANGE IMG TO
    if (isColliding) {
      if (i === game.medal) {
        const gyarados = document.querySelector('#gyarados')
        gyarados.classList.remove('magikarp')
        gyarados.classList.add('gyarados')

        document
          .querySelector('#exit')
          .classList.add('exit')

        game.key = 1
        document
          .querySelector('#keycount')
          .innerText = game.key
      } else {
        document
          .querySelector('#empty_pokeball')
          .style.display = 'block'
      }
      game.pokeballs[i].classList.remove('pokeClose')
      game.pokeballs[i].classList.add('pokeOpen')
    };
  };
}

// CHECK EXIT TO WIN
Character.prototype.checkExit = function () {
  const e = document.querySelector('#exit')
  const exit = getComputedStyle(e)

  const overlapX = (this.pos.x - 4.5 <= (parseInt(exit.left) + parseInt(exit.width))) && ((this.pos.x + 50) >= parseInt(exit.left))
  const overlapY = (this.pos.y - 4.5 <= (parseInt(exit.top) + parseInt(exit.height))) && ((this.pos.y + 37) >= parseInt(exit.top))
  const isColliding = overlapX && overlapY

  if (isColliding) {
    game.youWin()
  }
}

// CHECK COLLISION WITH ENEMY
Character.prototype.checkEnemy = function () {
  const enemy = document.querySelector('#enemy')

  const overlapX = (this.pos.x - 4.5 <= (parseInt(enemy.style.left) + parseInt(28))) && ((this.pos.x + 50) >= parseInt(enemy.style.left))
  const overlapY = (this.pos.y - 4.5 <= (parseInt(260) + parseInt(40))) && ((this.pos.y + 40) >= parseInt(260))
  const isColliding = overlapX && overlapY

  if (isColliding) {
    // check how many lives are left
    if (this.hearts === 3) {
      const heart = document.querySelector('#heart1')
      this.hearts--
      heart.classList.remove('heart')
      heart.classList.add('heartoff')
      this.pos = { x: 330, y: 665 }
    } else if (this.hearts === 2) {
      const heart = document.querySelector('#heart2')
      this.hearts--
      heart.classList.remove('heart')
      heart.classList.add('heartoff')
      this.pos = { x: 330, y: 665 }
    } else {
      const heart = document.querySelector('#heart3')
      this.hearts--
      heart.classList.remove('heart')
      heart.classList.add('heartoff')
      game.gameOver()
    }
  }
}
