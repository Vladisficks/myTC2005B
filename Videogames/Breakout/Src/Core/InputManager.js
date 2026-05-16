export default class InputManager {
    constructor() {
        this.keys = {};             // Keys pressed right now
        this.justPressed = {};      // Keys that were pressed in this frame

        this.#setupListeners();
    }

    isKeyDown(key) {
        key = key.toUpperCase();
        return !!this.keys[key];
    }

    isKeyJustPressed(key) {
        key = key.toUpperCase();
        return !!this.justPressed[key];
    }

    flush() { this.justPressed = {}; }

    // Listen the keyboard 
    #setupListeners() {
        window.addEventListener("keydown", (event) => {
            const key = event.key.toUpperCase();
            // If it was not down before, mark it as just pressed
            if (!this.keys[key]) this.justPressed[key] = true;
            this.keys[key] = true;
        });

        window.addEventListener("keyup", (event) => {
            const key = event.key.toUpperCase();
            this.keys[key] = false;
        });
    }
}