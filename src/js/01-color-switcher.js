const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerStart = null;
const bodyColor = document.querySelector('body');

btnStart.addEventListener('click', () => {
    timerStart = setInterval(() => {
        let hexColor = getRandomHexColor();
        bodyColor.style.backgroundColor = hexColor;
    }, 1000);
    btnStart.setAttribute('disabled', true)
    btnStop.removeAttribute('disabled');
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
btnStop.addEventListener("click", () => {
    clearInterval(timerStart)
    btnStop.setAttribute('disabled', true);
    btnStart.removeAttribute('disabled');

});
