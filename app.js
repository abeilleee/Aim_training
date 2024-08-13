const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

const colorsGradients = ['linear-gradient(90deg, rgba(57,49,233,1) 35%, rgba(0,229,255,1) 100%)',
    'linear-gradient(90deg, rgba(233,49,147,1) 35%, rgba(255,0,0,1) 100%)',
    'linear-gradient(90deg, rgba(233,205,49,1) 35%, rgba(169,255,0,1) 100%)',
    'linear-gradient(90deg, rgba(49,233,178,1) 35%, rgba(169,255,0,1) 100%)',
    'linear-gradient(90deg, rgba(233,134,49,1) 35%, rgba(255,0,70,1) 100%)',
    'linear-gradient(90deg, rgba(49,233,171,1) 35%, rgba(0,109,255,1) 100%)'];


startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {

    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        startGame();
        screens[1].classList.add('up');
    }
});


board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
    }
});


function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime(){
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;



    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colorsGradients[Math.floor(Math.random() * colorsGradients.length)];
}