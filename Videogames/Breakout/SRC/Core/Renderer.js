import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";

export default class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;

        this.canvas.width = this.GAME_WIDTH;
        this.canvas.height = this.GAME_HEIGHT;

        this.resize();
    }

    resize() {
        const container = this.canvas.parentElement;
        const style = getComputedStyle(container);

        const availableWidth = container.clientWidth
            - parseFloat(style.paddingLeft)
            - parseFloat(style.paddingRight);

        const availableHeight = container.clientHeight
            - parseFloat(style.paddingTop)
            - parseFloat(style.paddingBottom);

        const scale = Math.min(
            availableWidth / this.GAME_WIDTH,
            availableHeight / this.GAME_HEIGHT
        );

        this.canvas.style.width = `${this.GAME_WIDTH * scale}px`;
        this.canvas.style.height = `${this.GAME_HEIGHT * scale}px`;
    }

    setupResizeListener() {
        window.addEventListener("resize", () => { this.resize(); });
    }

    clear() {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawCircle(x, y, r, color){
        this.ctx.beginPath();

        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);

        this.ctx.fill();
        this.ctx.closePath();
    }
}