export default class AudioManager {
    constructor() {
        this.sounds = {};
        this.masterVolume = 0.5;
    }

    loadSound(name, path) {
        const audio = new Audio(path);
        audio.volume = this.masterVolume;
        this.sounds[name] = audio;
    }

    playSound(name) {
        if (!this.sounds[name]) {
            console.warn(`Sonido "${name}" no cargado`);
            return;
        }

        const audio = this.sounds[name].cloneNode();
        audio.volume = this.masterVolume;
        audio.play().catch(err => {
            console.error(`Error reproduciendo ${name}:`, err);
        });
    }

    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));

        Object.values(this.sounds).forEach(audio => {
            audio.volume = this.masterVolume;
        });
    }

    stopAll() {
        Object.values(this.sounds).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}