const table = document.querySelector("#game");

//NEW CHARACTER 
let jhonny = new Character();


//-------LISTENERS
window.addEventListener('keydown', function (e) {
    jhonny.updateCharacterPosition(e.code);
});
