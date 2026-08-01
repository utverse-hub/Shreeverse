(() => {
    "use strict";

    const AMBIENT_VOLUME = 0.12;

    const soundManifest = {
        "night-ambience": { src:"assets/sounds/ambient/night-ambience.mp3", volume:AMBIENT_VOLUME, loop:true },
        "curtain-open": { src:"assets/sounds/transitions/curtain-open.mp3", volume:0.45 },
        "paper-open": { src:"assets/sounds/paper/paper-open.mp3", volume:0.40 },
        "page-turn": { src:"assets/sounds/paper/page-turn.mp3", volume:0.35 },
        "typewriter": { src:"assets/sounds/paper/typewriter.mp3", volume:0.18 },
        "button-click": { src:"assets/sounds/ui/button-click.mp3", volume:0.25 },
        "soft-click": { src:"assets/sounds/ui/soft-click.mp3", volume:0.20 },
        "micro-click": { src:"assets/sounds/ui/micro-click.mp3", volume:0.15 },
        "keyboard-key": { src:"assets/sounds/ui/keyboard-key.mp3", volume:0.12 },
        "intro-impact": { src:"assets/sounds/effects/intro-impact.mp3", volume:0.70 },
        "magic-rise": { src:"assets/sounds/effects/magic-rise.mp3", volume:0.55 },
        "gift-knock": { src:"assets/sounds/effects/gift-knock.mp3", volume:0.45 },
        "gift-open": { src:"assets/sounds/effects/gift-open.mp3", volume:0.70 },
        "star-formation": { src:"assets/sounds/effects/star-formation.mp3", volume:0.55 },
        "shooting-star": { src:"assets/sounds/effects/shooting-star.mp3", volume:0.45 }
    };

    const sounds = new Map();
    const activeFades = new Map();
    let isUnlocked = false;
    let ambientRequested = false;

    function clampVolume(value) {
        return Math.min(1, Math.max(0, Number(value) || 0));
    }

    function cancelFade(name) {
        const frameId = activeFades.get(name);
        if (frameId) {
            window.cancelAnimationFrame(frameId);
            activeFades.delete(name);
        }
    }

    function resolveFallbackSource(audio, definition) {
        if (audio.dataset.fallbackTried === "true") {
            return;
        }

        audio.dataset.fallbackTried = "true";
        audio.src = `${definition.src}.mp3`;
        audio.load();
    }

    function preloadSound(name, definition) {
        const audio = new Audio();
        audio.preload = "auto";
        audio.loop = Boolean(definition.loop);
        audio.volume = clampVolume(definition.volume);
        audio.src = definition.src;
        audio.addEventListener("error", () => resolveFallbackSource(audio, definition), { once:false });
        audio.load();
        sounds.set(name, audio);
    }

    Object.entries(soundManifest).forEach(([name, definition]) => preloadSound(name, definition));

    function unlockAudio() {
        if (isUnlocked) {
            return;
        }

        isUnlocked = true;
        document.removeEventListener("pointerdown", unlockAudio, true);
        document.removeEventListener("keydown", unlockAudio, true);
        document.removeEventListener("touchstart", unlockAudio, true);

        if (ambientRequested) {
            playAmbient();
        }
    }

    document.addEventListener("pointerdown", unlockAudio, true);
    document.addEventListener("keydown", unlockAudio, true);
    document.addEventListener("touchstart", unlockAudio, true);

    function playSound(name) {
        const audio = sounds.get(name);
        if (!audio || !isUnlocked) {
            return Promise.resolve(false);
        }

        cancelFade(name);

        if (!audio.loop) {
            audio.pause();
            audio.currentTime = 0;
        }

        audio.volume = clampVolume(soundManifest[name].volume);
        return audio.play().then(() => true).catch(() => false);
    }

    function stopSound(name) {
        const audio = sounds.get(name);
        if (!audio) {
            return;
        }

        cancelFade(name);
        audio.pause();
        audio.currentTime = 0;
    }

    function playAmbient() {
        ambientRequested = true;
        return playSound("night-ambience");
    }

    function stopAmbient() {
        ambientRequested = false;
        stopSound("night-ambience");
    }

    function fadeAmbient(toVolume, duration = 1000) {
        const name = "night-ambience";
        const audio = sounds.get(name);
        if (!audio) {
            return Promise.resolve(false);
        }

        cancelFade(name);
        const fromVolume = audio.volume;
        const targetVolume = clampVolume(toVolume);
        const startedAt = performance.now();

        return new Promise((resolve) => {
            const step = (now) => {
                const progress = Math.min(1, (now - startedAt) / Math.max(1, duration));
                audio.volume = fromVolume + ((targetVolume - fromVolume) * progress);

                if (progress < 1) {
                    activeFades.set(name, window.requestAnimationFrame(step));
                    return;
                }

                activeFades.delete(name);
                resolve(true);
            };

            activeFades.set(name, window.requestAnimationFrame(step));
        });
    }

    function fadeInAmbient(duration = 1000) {
        ambientRequested = true;
        const ambient = sounds.get("night-ambience");
        if (!ambient || !isUnlocked) {
            return Promise.resolve(false);
        }

        ambient.volume = 0;
        return ambient.play().then(() => fadeAmbient(AMBIENT_VOLUME, duration)).catch(() => false);
    }

    function fadeOutAmbient(duration = 1000) {
        const ambient = sounds.get("night-ambience");
        if (!ambient) {
            return Promise.resolve(false);
        }

        return fadeAmbient(0, duration).then(() => {
            ambient.pause();
            ambient.currentTime = 0;
            ambient.volume = AMBIENT_VOLUME;
            ambientRequested = false;
            return true;
        });
    }

    window.AudioManager = Object.freeze({
        sounds,
        playSound,
        stopSound,
        playAmbient,
        stopAmbient,
        fadeInAmbient,
        fadeOutAmbient,
        unlockAudio
    });

    window.playSound = playSound;
    window.stopSound = stopSound;
    window.playAmbient = playAmbient;
    window.stopAmbient = stopAmbient;
    window.fadeInAmbient = fadeInAmbient;
    window.fadeOutAmbient = fadeOutAmbient;
})();
