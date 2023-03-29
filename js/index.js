let game = new Game();

//start game
document
    .querySelector("#start")
    .addEventListener('click', function (e) {
        game.start()
        e.stopPropagation()
    })

//--------------credits
document
    .querySelector('#menu_credits')
    .addEventListener('click', function (e) {
        game.menu.style.display = "none";
        game.container.style.background = "black"
        //show credits
        game.credits.style.display = "flex";
        e.stopPropagation()
    })

document
    .querySelector('#credits>span')
    .addEventListener('click', function (e) {
        game.menu.style.display = "flex";
        game.container.style.background = "url('./img/bg-menu.gif')"
        //hide credits
        game.credits.style.display = "none";
        e.stopPropagation()

    })