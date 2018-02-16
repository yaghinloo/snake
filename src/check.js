export default {
    checkFood() {
        if (this.head.x == this.food.x
            && this.head.y == this.food.y) {
            this.makeFood();
            // update the score
            this.score++;
            this.speed = (this.speed > 50) ? this.speed - 5 : this.speed;
            this.tail.push({x: this.head.x, y: this.head.y});

            // update the score value on the DOM
            document.querySelector('.score > span').innerHTML = this.score;
        } else {
            this.checkForCollision();
        }
    },

// verify if the snake is hitting the borders
    checkBorders() {
        if (this.head.x < 0
            || this.head.x > this.canvasSize - this.blockSize
            || this.head.y < 0
            || this.head.y > this.canvasSize - this.blockSize) {
            this.death();
        }

    },


    checkForCollision() {
        if (this.tail.filter((pos, idx) => {
                return (pos.x == this.head.x
                    && pos.y == this.head.y && idx)
            }).length) {
            this.death();
        }
    }
}
