// eslint-disable-next-line no-undef
const game = new Game()

// start game
document
  .querySelector('#start')
  .addEventListener('click', function (e) {
    game.start()
    e.stopPropagation()
  })

// --------------credits
document
  .querySelector('#menu_credits')
  .addEventListener('click', function (e) {
    // remove menu and change container background
    game.menu.style.display = 'none'
    // show credits
    game.credits.style.display = 'block'
    e.stopPropagation()
  })

document
  .querySelector('#exitCredits')
  .addEventListener('click', function (e) {
    // show menu and change container to bg img
    game.menu.style.display = 'flex'
    // hide credits
    game.credits.style.display = 'none'
    e.stopPropagation()
  })
