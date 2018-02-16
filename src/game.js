import draw from './draw';
import handleInput from './input';
import init from './init';
import check from './check';

export default class Game {
    constructor(speed = 180, size = 25, scale = 20) {

        this.speed = speed;
        this.blockSize = size;
        this.scale = scale;

        this.importMethods();

        // default initial direction
        this.direction = {
            x: 1,
            y: 0
        };

        this.canvasSize = this.scale * this.blockSize;

        this.lastControlKey = '';
        this.tail = [];
        this.score = 0;

        // run the canvas and interval
        this.init();
    }

    importMethods() {
        this.drawBlock = draw.drawBlock;
        this.drawSnake = draw.drawSnake;
        this.drawFood = draw.drawFood;
        this.handleInput = handleInput.handleInput;
        this.init = init.init;
        this.checkFood = check.checkFood;
        this.checkBorders = check.checkBorders;
        this.checkForCollision = check.checkForCollision;
    }


    // this method will run intervally
    update() {

        // move the tail
        if (this.tail.length) {
            this.tail.push({x: this.head.x, y: this.head.y})
            this.tail.shift();
        }

        this.head.x += this.direction.x * this.blockSize;
        this.head.y += this.direction.y * this.blockSize;

        // check hitting the borders
        this.checkBorders();

        // check if snake is eating the food
        this.checkFood();

        //clean up the canvas to re-render
        this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

        this.drawSnake();
        this.drawFood();

        this.holdInput = false;
    }

    getRandomPos() {
        return Math.floor(Math.random() * this.scale) * this.blockSize;
    }

    // randomize the food location
    makeFood() {
        this.food = {
            x: this.getRandomPos(),
            y: this.getRandomPos()
        };
    }


    death() {
        clearInterval(this.intrv);
        document.getElementById('message').innerText = "GAME OVER!";

    }


}