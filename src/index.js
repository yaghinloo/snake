import Game from './game';

document.getElementById('game-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let speed = parseInt(e.srcElement.elements[0].value);
    let blockSize = parseInt(e.srcElement.elements[1].value);
    let gameScale = parseInt(e.srcElement.elements[2].value);

    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-play').style.display = 'block';

    new Game(speed, blockSize, gameScale)
})