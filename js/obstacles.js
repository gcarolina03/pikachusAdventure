// ---------TREES
function Obstacles (l, t, w, h) {
  this.left = l
  this.top = t
  this.width = w
  this.height = h
}

// ---ENEMYS
function Enemys (l, dir, speed) {
  this.left = l
  this.timerId
  this.direction = dir
  this.speed = speed
}

Enemys.prototype.move = function () {
  const enemy = document.querySelector('#enemy')

  if (game.enemy.left > 705 - 28 || game.enemy.left < 260 + 10) { game.enemy.direction *= -1 }
  game.enemy.left += 10 * game.enemy.direction
  enemy.style.left = game.enemy.left + 'px'

  if (game.enemy.direction === -1) {
    enemy.classList.remove('enemy2')
    enemy.classList.add('enemy1')
  } else {
    enemy.classList.remove('enemy1')
    enemy.classList.add('enemy2')
  }
}
