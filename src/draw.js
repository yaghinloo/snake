// draw one block of food, head or the tail


export default {
    drawBlock(x, y) {
        this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
    }, drawSnake() {
        this.ctx.fillStyle = "#FF0000";
        this.drawBlock(this.head.x, this.head.y);

        this.tail.forEach((tailbox) => {
            this.drawBlock(tailbox.x, tailbox.y);
        })
    }, drawFood() {
        this.ctx.fillStyle = "#FFFF00";
        this.drawBlock(this.food.x, this.food.y);
    }
}