//---------TREES
function Obstacles(l,t,w,h){
    this.left = l;
    this.top = t;
    this.width = w;
    this.height = h;
}

//---ENEMYS
function Enemys(l, dir, speed){
    this.left = l;
    this.timerId;
    this.direction = dir;
    this.speed = speed;
}

Enemys.prototype.move = function () {
    var enemy = document.querySelector('#enemy');

    if (game.enemy.left > 705 - 28 || game.enemy.left < 260+10) { game.enemy.direction *= -1; }
    game.enemy.left += 10 * game.enemy.direction;
    enemy.style.left = game.enemy.left + 'px';

    if (game.enemy.direction === -1) {
        enemy.style.backgroundImage = "url('../img/objects/teamrocket.png')"
    } else {
        enemy.style.backgroundImage = "url('../img/objects/teamrocket2.png')"
    }
}
