export default class InputManager {
    constructor() {
        this.keys = {};
        this.setUpListeners();
    }

    setUpListeners() {
        window.addEventListener("keydown", (event) => {
            const key = event.key.toUpperCase();
            this.keys[key] = true;
        })

        window.addEventListener("keyup", (event) => {
            const key = event.key.toUpperCase();
            this.keys[key] = false;
        })
    }

    isKeyDown(key){
        key = key.toUpperCase();
        if (!(key in this.keys)) {return false;}

        return this.keys[key];
    }
}