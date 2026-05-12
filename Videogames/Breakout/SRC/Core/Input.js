export default class InputManager {
    constructor() {
        this.keys = {};
        this.justPressed = {};
        this.setUpListeners();
    }

    setUpListeners() {
        window.addEventListener("keydown", (event) => {
            const key = event.key.toUpperCase();
            if (!this.keys[key]) this.justPressed[key] = true; 
            this.keys[key] = true;
        });
        window.addEventListener("keyup", (event) => {
            const key = event.key.toUpperCase();
            this.keys[key] = false;
        });
    }

    isKeyDown(key) {
        key = key.toUpperCase();
        return !!this.keys[key];
    }

    isKeyJustPressed(key) {
        key = key.toUpperCase();
        return !!this.justPressed[key];
    }

    flush() {
        this.justPressed = {};
    }
}