export default {
    init() {

        let canvas = document.getElementById('snake');

        canvas.width = this.canvasSize;
        canvas.height = this.canvasSize;

        this.ctx = canvas.getContext('2d');

        this.makeFood();

        this.head = {
            x: Math.floor(this.scale / 2) * this.blockSize,
            y: Math.floor(this.scale / 2) * this.blockSize
        };

        // initialize the tail with one block
        this.tail.push({
            x: this.head.x - this.blockSize,
            y: this.head.y - this.blockSize
        });

        //attach the events handler for keydown
        window.addEventListener('keydown', (e) => {
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }else {
                return ;
            }
            this.handleInput(e.key);
        });

        this.holdInput = false;
        this.intrv = setInterval(() => {
            this.update();
        }, this.speed);
    }
}