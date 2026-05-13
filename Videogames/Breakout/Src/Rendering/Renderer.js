import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";

export default class Renderer {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width = width;
        this.height = canvas.height = height;

        window.addEventListener("resize", () => { this.resize(); });
        this.resize();
    }

    clear() {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawCircle(x, y, radius, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawText(x, y, text, options = {}) {
        this.ctx.fillStyle = options.color || "#ffffff";
        this.ctx.font = options.font || "60px Arial";
        this.ctx.textAlign = options.align || "center";
        this.ctx.fillText(text, x, y);
    }

    resize() {
        const parent = this.canvas.parentElement;

        const availableWidth = parent.clientWidth;
        const availableHeight = parent.clientHeight * 0.90;

        const scale = Math.min(
            availableWidth / this.width,
            availableHeight / this.height
        );

        this.canvas.style.width = `${this.width * scale}px`;
        this.canvas.style.height = `${this.height * scale}px`;
    }
}