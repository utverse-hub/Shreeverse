// ===============================
// ELEMENTS
// ===============================

const introText = document.getElementById("introText");
const keyContainer = document.getElementById("keyContainer");
const key = document.getElementById("key");
const door = document.getElementById("door");
const prologue = document.getElementById("prologue");
const app = document.getElementById("app");
const beginJourney = document.getElementById("beginJourney");
const welcomeScreen = document.getElementById("welcomeScreen");
const letterScreen = document.getElementById("letterScreen");
const letterAssembly = document.getElementById("letterAssembly");
const letterPaper = document.getElementById("letterPaper");
const envelopeTrigger = document.getElementById("envelopeTrigger");
const typedLetter = document.getElementById("typedLetter");
const letterSignature = document.getElementById("letterSignature");
const letterContinue = document.getElementById("letterContinue");
const storyPlaceholder = document.getElementById("storyPlaceholder");
const storyPlaceholderTitle = document.getElementById("storyPlaceholderTitle");
const timelineCards = document.querySelectorAll(".timeline-card");
const storyContinue = document.getElementById("storyContinue");
const memoriesScreen = document.getElementById("memoriesScreen");
const memoriesTitle = document.getElementById("memoriesTitle");
const memoryCards = document.querySelectorAll(".memory-card");
const memoryPrevious = document.getElementById("memoryPrevious");
const memoryNext = document.getElementById("memoryNext");
const memoryProgress = document.getElementById("memoryProgress");
const memoryContinue = document.getElementById("memoryContinue");
const memoryViewport = document.getElementById("memoryViewport");
const reasonsScreen = document.getElementById("reasonsScreen");
const reasonsTitle = document.getElementById("reasonsTitle");
const reasonCards = document.querySelectorAll(".reason-card");
const reasonPrevious = document.getElementById("reasonPrevious");
const reasonNext = document.getElementById("reasonNext");
const reasonProgress = document.getElementById("reasonProgress");
const reasonContinue = document.getElementById("reasonContinue");
const promisesScreen = document.getElementById("promisesScreen");
const promisesTitle = document.getElementById("promisesTitle");
const promiseCards = document.querySelectorAll(".promise-card");
const promisePrevious = document.getElementById("promisePrevious");
const promiseNext = document.getElementById("promiseNext");
const promiseProgress = document.getElementById("promiseProgress");
const promiseContinue = document.getElementById("promiseContinue");
const finalSurpriseScreen = document.getElementById("finalSurpriseScreen");
const finalSurpriseTitle = document.getElementById("finalSurpriseTitle");
const lastSurpriseButton = document.getElementById("lastSurpriseButton");
const lastSurprisePanel = document.getElementById("lastSurprisePanel");

const leftDoor = document.getElementById("doorLeft");
const rightDoor = document.getElementById("doorRight");

// ===============================
// INTRO LINES
// ===============================

const introLines = [
    "Some gifts are bought...",
    "Some gifts are wrapped...",
    "Some gifts are remembered forever.",
    "This one was made only for you ❤️"
];

let currentLine = 0;
let isUnlocking = false;
let isLeavingWelcome = false;
let isLetterOpening = false;
let isLetterTypingQueued = false;
let isLeavingLetter = false;
let activeMilestoneIndex = -1;
let isLeavingStory = false;
let isLeavingMemories = false;
let isLeavingReasons = false;
let isLeavingPromises = false;
let currentMemoryIndex = 0;
let currentReasonIndex = 0;
let currentPromiseIndex = 0;
let touchStartX = 0;

const letterPlaceholder = "Dear Shree,\n\n[This is placeholder text for the first paragraph of the letter.]\n\n[This is placeholder text for the second paragraph of the letter.]";

function getTransitionDuration() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
}

function hideScene(scene) {
    scene.style.display = "none";
    scene.style.pointerEvents = "none";
    scene.setAttribute("aria-hidden", "true");
    scene.classList.remove("is-visible", "is-exiting", "scene-enter");
}

function transitionScenes(currentScene, showNextScene) {
    currentScene.style.pointerEvents = "none";
    currentScene.setAttribute("aria-hidden", "true");
    currentScene.classList.add("is-exiting");

    window.setTimeout(() => {
        hideScene(currentScene);
        showNextScene();
    }, getTransitionDuration());
}

// ===============================
// SHOW INTRO
// ===============================

function showNextLine() {

    if (currentLine >= introLines.length) {

        revealKey();
        return;

    }

    introText.classList.remove("fade-in", "fade-out");
    introText.classList.add("fade-in");

    introText.textContent = introLines[currentLine];

    currentLine++;

    setTimeout(() => {

        introText.classList.remove("fade-in");
        introText.classList.add("fade-out");

    }, 2200);

    setTimeout(showNextLine, 3000);

}

// ===============================
// SHOW KEY
// ===============================

function revealKey() {

    introText.textContent = "";

    keyContainer.classList.add("is-visible");

    key.classList.add("float");
    key.classList.add("glow");

}

// ===============================
// KEY CLICK
// ===============================

function unlockJourney() {

    if (isUnlocking) {
        return;
    }

    isUnlocking = true;
    key.setAttribute("aria-disabled", "true");
    keyContainer.style.pointerEvents = "none";
    prologue.classList.add("is-opening");

    key.classList.remove("float", "glow");
    key.classList.add("key-turn");
    door.classList.add("door-visible");

    setTimeout(() => {

        leftDoor.classList.add("open-left");
        rightDoor.classList.add("open-right");

    }, 320);

    setTimeout(() => {

        prologue.style.display = "none";
        app.style.display = "block";
        app.classList.add("welcome-reveal");

    }, 2300);

}

key.addEventListener("click", unlockJourney);

key.addEventListener("keydown", (event) => {

    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        unlockJourney();
    }

});

// ===============================
// ROYAL LETTER
// ===============================

function showRoyalLetter() {

    if (isLeavingWelcome) {
        return;
    }

    isLeavingWelcome = true;

    transitionScenes(welcomeScreen, () => {
        letterScreen.style.display = "grid";
        letterScreen.style.pointerEvents = "auto";
        letterScreen.setAttribute("aria-hidden", "false");
        letterScreen.classList.add("is-visible", "scene-enter");

        setTimeout(() => {
            envelopeTrigger.focus();
        }, getTransitionDuration());
    });

}

function typeLetter() {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    typedLetter.textContent = "";
    letterSignature.setAttribute("aria-hidden", "true");
    letterAssembly.classList.add("is-typing");

    if (reduceMotion) {
        typedLetter.textContent = letterPlaceholder;
        finishTyping();
        return;
    }

    let characterIndex = 0;
    let lastCharacterTime = 0;

    function typeNextCharacter(timestamp) {

        const previousCharacter = letterPlaceholder.charAt(characterIndex - 1);
        let typingDelay = 38;

        if (previousCharacter === ",") {
            typingDelay = 150;
        } else if (previousCharacter === ".") {
            typingDelay = 260;
        } else if (previousCharacter === "\n") {
            typingDelay = 110;
        }

        if (!lastCharacterTime || timestamp - lastCharacterTime >= typingDelay) {
            typedLetter.textContent += letterPlaceholder.charAt(characterIndex);
            characterIndex++;
            lastCharacterTime = timestamp;
        }

        if (characterIndex < letterPlaceholder.length) {
            window.requestAnimationFrame(typeNextCharacter);
        } else {
            finishTyping();
        }

    }

    window.requestAnimationFrame(typeNextCharacter);

}

function beginLetterTyping() {

    if (isLetterTypingQueued || letterAssembly.classList.contains("is-typing") || letterAssembly.classList.contains("typing-complete")) {
        return;
    }

    isLetterTypingQueued = true;

    const contentRevealDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 350;
    window.setTimeout(typeLetter, contentRevealDelay);

}

function finishTyping() {

    letterAssembly.classList.remove("is-typing");
    letterAssembly.classList.add("typing-complete");
    letterSignature.setAttribute("aria-hidden", "false");

    setTimeout(() => {
        letterAssembly.classList.add("continue-visible");
        letterContinue.focus();
    }, 1000);

}

function openRoyalLetter() {

    if (isLetterOpening) {
        return;
    }

    isLetterOpening = true;
    envelopeTrigger.disabled = true;
    letterAssembly.classList.add("is-opening");

    setTimeout(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        letterPaper.addEventListener("animationend", (event) => {
            if (event.animationName === "paperUnfold") {
                beginLetterTyping();
            }
        }, { once:true });

        letterAssembly.classList.add("paper-open");

        if (reduceMotion) {
            window.setTimeout(beginLetterTyping, 0);
        } else {
            window.setTimeout(beginLetterTyping, 1500);
        }
    }, 540);

}

function showStoryPlaceholder() {

    storyPlaceholder.style.display = "grid";
    storyPlaceholder.style.pointerEvents = "auto";
    storyPlaceholder.setAttribute("aria-hidden", "false");
    storyPlaceholder.classList.add("is-visible");
    storyPlaceholderTitle.focus();

    window.requestAnimationFrame(startStoryTimeline);

}

function activateMilestone(index) {

    if (activeMilestoneIndex >= 0) {
        timelineCards[activeMilestoneIndex].classList.remove("is-active");
        timelineCards[activeMilestoneIndex].classList.add("is-viewed");
        timelineCards[activeMilestoneIndex].removeAttribute("aria-current");
    }

    timelineCards[index].classList.add("is-active");
    timelineCards[index].setAttribute("aria-current", "step");
    activeMilestoneIndex = index;

}

function startStoryTimeline() {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startDelay = reduceMotion ? 0 : 450;
    const itemDelay = reduceMotion ? 0 : 380;

    timelineCards.forEach((card, index) => {

        setTimeout(() => {
            card.classList.add("is-visible");

            if (index === 0) {
                activateMilestone(index);
            }
        }, startDelay + (index * itemDelay));

    });

    setTimeout(() => {
        storyContinue.classList.add("is-visible");
    }, startDelay + ((timelineCards.length - 1) * itemDelay) + (reduceMotion ? 0 : 850));

}

function continueToStoryPlaceholder() {

    if (isLeavingLetter) {
        return;
    }

    isLeavingLetter = true;

    transitionScenes(letterScreen, showStoryPlaceholder);

}

// ===============================
// OUR MEMORIES
// ===============================

function updateMemoryControls() {

    memoryProgress.textContent = `${currentMemoryIndex + 1} / ${memoryCards.length}`;
    memoryPrevious.disabled = currentMemoryIndex === 0;
    memoryNext.disabled = currentMemoryIndex === memoryCards.length - 1;
    const isFinalMemory = currentMemoryIndex === memoryCards.length - 1;
    memoryContinue.classList.toggle("is-visible", isFinalMemory);
    memoryContinue.disabled = !isFinalMemory;

}

function showMemory(index) {

    if (index < 0 || index >= memoryCards.length || index === currentMemoryIndex) {
        return;
    }

    memoryCards[currentMemoryIndex].classList.remove("is-active");
    currentMemoryIndex = index;

    window.requestAnimationFrame(() => {
        memoryCards[currentMemoryIndex].classList.add("is-active");
    });

    updateMemoryControls();

}

function showMemories() {

    memoriesScreen.style.display = "grid";
    memoriesScreen.style.pointerEvents = "auto";
    memoriesScreen.setAttribute("aria-hidden", "false");
    memoriesScreen.classList.add("is-visible");
    updateMemoryControls();
    memoriesTitle.focus();

}

function continueToMemories() {

    if (isLeavingStory) {
        return;
    }

    isLeavingStory = true;
    transitionScenes(storyPlaceholder, showMemories);

}

// ===============================
// REASONS I LOVE YOU
// ===============================

function updateReasonControls() {

    reasonProgress.textContent = `${currentReasonIndex + 1} / ${reasonCards.length}`;
    reasonPrevious.disabled = currentReasonIndex === 0;
    reasonNext.disabled = currentReasonIndex === reasonCards.length - 1;
    const isFinalReason = currentReasonIndex === reasonCards.length - 1;
    reasonContinue.classList.toggle("is-visible", isFinalReason);
    reasonContinue.disabled = !isFinalReason;

}

function showReason(index) {

    if (index < 0 || index >= reasonCards.length || index === currentReasonIndex) {
        return;
    }

    reasonCards[currentReasonIndex].classList.remove("is-active");
    currentReasonIndex = index;

    window.requestAnimationFrame(() => {
        reasonCards[currentReasonIndex].classList.add("is-active");
    });

    updateReasonControls();

}

function showReasons() {

    reasonsScreen.style.display = "grid";
    reasonsScreen.style.pointerEvents = "auto";
    reasonsScreen.setAttribute("aria-hidden", "false");
    reasonsScreen.classList.add("is-visible");
    updateReasonControls();
    reasonsTitle.focus();

}

function continueToReasons() {

    if (isLeavingMemories) {
        return;
    }

    isLeavingMemories = true;
    transitionScenes(memoriesScreen, showReasons);

}

// ===============================
// OUR PROMISES
// ===============================

function updatePromiseControls() {

    promiseProgress.textContent = `${currentPromiseIndex + 1} / ${promiseCards.length}`;
    promisePrevious.disabled = currentPromiseIndex === 0;
    promiseNext.disabled = currentPromiseIndex === promiseCards.length - 1;
    const isFinalPromise = currentPromiseIndex === promiseCards.length - 1;
    promiseContinue.classList.toggle("is-visible", isFinalPromise);
    promiseContinue.disabled = !isFinalPromise;

}

function showPromise(index) {

    if (index < 0 || index >= promiseCards.length || index === currentPromiseIndex) {
        return;
    }

    promiseCards[currentPromiseIndex].classList.remove("is-active");
    currentPromiseIndex = index;

    window.requestAnimationFrame(() => {
        promiseCards[currentPromiseIndex].classList.add("is-active");
    });

    updatePromiseControls();

}

function showPromises() {

    promisesScreen.style.display = "grid";
    promisesScreen.style.pointerEvents = "auto";
    promisesScreen.setAttribute("aria-hidden", "false");
    promisesScreen.classList.add("is-visible");
    updatePromiseControls();
    promisesTitle.focus();

}

function continueToPromises() {

    if (isLeavingReasons) {
        return;
    }

    isLeavingReasons = true;

    transitionScenes(reasonsScreen, showPromises);

}

// ===============================
// FINAL SURPRISE
// ===============================

function showFinalSurprise() {

    finalSurpriseScreen.style.display = "grid";
    finalSurpriseScreen.style.pointerEvents = "auto";
    finalSurpriseScreen.setAttribute("aria-hidden", "false");
    finalSurpriseScreen.classList.add("is-visible");
    finalSurpriseTitle.focus();

    const revealDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2800;
    window.setTimeout(() => {
        lastSurpriseButton.classList.add("is-visible");
    }, revealDelay);

}

function continueToFinalSurprise() {

    if (isLeavingPromises) {
        return;
    }

    isLeavingPromises = true;
    transitionScenes(promisesScreen, showFinalSurprise);

}

function revealLastSurprise() {

    lastSurpriseButton.disabled = true;
    lastSurprisePanel.classList.add("is-visible");
    lastSurprisePanel.setAttribute("aria-hidden", "false");

}

beginJourney.addEventListener("click", showRoyalLetter);
envelopeTrigger.addEventListener("click", openRoyalLetter);
letterContinue.addEventListener("click", continueToStoryPlaceholder);

timelineCards.forEach((card, index) => {
    card.addEventListener("click", () => activateMilestone(index));
});

storyContinue.addEventListener("click", continueToMemories);
memoryPrevious.addEventListener("click", () => showMemory(currentMemoryIndex - 1));
memoryNext.addEventListener("click", () => showMemory(currentMemoryIndex + 1));
memoryContinue.addEventListener("click", continueToReasons);
reasonPrevious.addEventListener("click", () => showReason(currentReasonIndex - 1));
reasonNext.addEventListener("click", () => showReason(currentReasonIndex + 1));
reasonContinue.addEventListener("click", continueToPromises);
promisePrevious.addEventListener("click", () => showPromise(currentPromiseIndex - 1));
promiseNext.addEventListener("click", () => showPromise(currentPromiseIndex + 1));
promiseContinue.addEventListener("click", continueToFinalSurprise);
lastSurpriseButton.addEventListener("click", revealLastSurprise);

document.addEventListener("keydown", (event) => {

    if (memoriesScreen.getAttribute("aria-hidden") === "false") {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showMemory(currentMemoryIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showMemory(currentMemoryIndex + 1);
        }
    }

    if (promisesScreen.getAttribute("aria-hidden") === "false") {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPromise(currentPromiseIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showPromise(currentPromiseIndex + 1);
        }
    }

    if (reasonsScreen.getAttribute("aria-hidden") === "false") {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showReason(currentReasonIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showReason(currentReasonIndex + 1);
        }
    }

});

memoryViewport.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
}, { passive:true });

memoryViewport.addEventListener("touchend", (event) => {

    const swipeDistance = event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(swipeDistance) > 40) {
        showMemory(currentMemoryIndex + (swipeDistance < 0 ? 1 : -1));
    }

}, { passive:true });

// ===============================
// START
// ===============================

window.addEventListener("load", () => {

    setTimeout(showNextLine, 1200);

});
