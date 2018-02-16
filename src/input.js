//change the direction of the snake based on Arrow keys
export default {  handleInput(e) {

    if (this.holdInput) return;

    switch (event.key) {
        case "ArrowUp":
            if (this.lastControlKey !== "ArrowDown") {
                this.direction.x = 0;
                this.direction.y = -1;
                this.lastControlKey = "ArrowUp";
                this.holdInput = true;
            }
            break;
        case "ArrowLeft":
            if (this.lastControlKey !== "ArrowRight") {
                this.direction.x = -1;
                this.direction.y = 0;
                this.lastControlKey = "ArrowLeft";
                this.holdInput = true;
            }
            break;
        case "ArrowRight":
            if (this.lastControlKey !== "ArrowLeft") {
                this.direction.x = 1;
                this.direction.y = 0;
                this.lastControlKey = "ArrowRight";
                this.holdInput = true;
            }
            break;
        case "ArrowDown":
            if (this.lastControlKey !== "ArrowUp") {
                this.direction.x = 0;
                this.direction.y = 1;
                this.lastControlKey = "ArrowDown";
                this.holdInput = true;
            }
            break;
        default :
    }


}
}





