function bindSound(button) {
    let sound = document.getElementById(button.dataset["sound"]);
    return function () {
        sound.play();
    }
}

function bindButtonClickEvents(){
    let buttons = [...document.getElementsByClassName("sound-test")];
    buttons.forEach(function(button){
        button.addEventListener("click", bindSound(button))
    });
}

function soundTestSetUp() {
    bindButtonClickEvents();
}

window.addEventListener("load", soundTestSetUp);
