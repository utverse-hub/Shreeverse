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
const typedLetterPageOne = document.getElementById("typedLetterPageOne");
const typedLetterPageTwo = document.getElementById("typedLetterPageTwo");
const letterPageOne = document.getElementById("letterPageOne");
const letterPageTwo = document.getElementById("letterPageTwo");
const letterNextPage = document.getElementById("letterNextPage");
const letterSignature = document.getElementById("letterSignature");
const letterContinue = document.getElementById("letterContinue");
const letterSkip = document.getElementById("letterSkip");
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
const finalBlackout = document.getElementById("finalBlackout");
const finalGiftScene = document.getElementById("finalGiftScene");
const giftBox = document.getElementById("giftBox");
const cinematicEnding = document.getElementById("cinematicEnding");
const starCanvas = document.getElementById("starCanvas");
const endingMessage = document.getElementById("endingMessage");
const endingTimeline = document.getElementById("endingTimeline");
const shootingWish = document.getElementById("shootingWish");
const replayStory = document.getElementById("replayStory");
const secretStar = document.getElementById("secretStar");
const secretNote = document.getElementById("secretNote");
const closeSecretNote = document.getElementById("closeSecretNote");

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
let letterTypingFrameId = null;
let letterSkipTimerId = null;
let isLetterSkipped = false;
let activeLetterPage = 1;
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
let endingAnimationFrame = null;
let endingSecretTimer = null;
let endingHasStarted = false;
let starField = [];
let starMode = "sky";
let giftInteractionStep = 0;
let giftInteractionBusy = false;

const letterPageOneText = "Shree ❤️\n\nHappy Girlfriend's Day.\n\nPata hai... jab main ye letter likhne baitha tha na, tab samajh hi nahi aa raha tha ki shuru kahan se karun. Kyunki jo bhi main feel karta hoon, usse words mein likhna itna easy nahi hota.\n\nBas itna jaanta hoon ki jab se aap meri life mein aaye ho, bahut si cheezein bina bataye hi badal gayi hain.\n\nPehle din bas nikal jaata tha...\n\nAb din tab complete lagta hai jab aapse baat ho jaati hai.\n\nPehle phone uthana bas ek habit thi...\n\nAb har notification dekhte hi sabse pehle ye umeed hoti hai ki shayad aapka message hoga.\n\nAur jab sach mein aapka naam screen par dikhta hai na...\n\nToh bina wajah hi smile aa jaati hai.\n\nAapko shayad kabhi realise bhi na ho...\n\nLekin aapki hasi...\n\nAapki care...\n\nAapka gussa...\n\nAur hamari woh choti choti baatein...\n\nYe sab meri favourite memories ban chuki hain.\n\nThank you...";
const letterPageTwoText = "Mujhe samajhne ke liye.\n\nMera saath dene ke liye.\n\nMeri choti choti baaton par bhi muskuraane ke liye.\n\nAur sabse zyada...\n\nMeri zindagi ko itna khoobsurat banane ke liye.\n\nMain perfect nahi hoon.\n\nAur shayad kabhi ban bhi na paun.\n\nKabhi hum ladenge...\n\nKabhi misunderstandings bhi hongi...\n\nLekin ek baat ka promise hai...\n\nMain hamesha aapka saath dunga.\n\nChahe waqt kaisa bhi ho.\n\nYe website sirf ek gift nahi hai.\n\nYe meri feelings ka ek chhota sa hissa hai.";
const interactiveButtons = document.querySelectorAll("button");

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

    window.setTimeout(() => {
        app.style.display = "block";
        app.classList.add("welcome-reveal", "curtain-reveal");

        const finishCurtainReveal = (event) => {
            if (event.propertyName !== "transform") {
                return;
            }

            leftDoor.removeEventListener("transitionend", finishCurtainReveal);
            prologue.style.display = "none";
            app.classList.remove("curtain-reveal");
        };

        leftDoor.addEventListener("transitionend", finishCurtainReveal);
        leftDoor.classList.add("open-left");
        rightDoor.classList.add("open-right");
    }, 320);

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

function typeLetter(page) {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = page === 1 ? typedLetterPageOne : typedLetterPageTwo;
    const text = page === 1 ? letterPageOneText : letterPageTwoText;

    target.textContent = "";
    letterAssembly.classList.remove("skip-complete");
    letterAssembly.classList.add("is-typing");
    letterScreen.classList.add("letter-typing");
    isLetterSkipped = false;
    letterSkip.classList.remove("is-visible");

    if (page === 2) {
        letterSignature.setAttribute("aria-hidden", "true");
    }

    letterSkipTimerId = window.setTimeout(() => {
        if (letterAssembly.classList.contains("is-typing") && !isLetterSkipped) {
            letterSkip.classList.add("is-visible");
        }
    }, 2400);

    if (reduceMotion) {
        target.textContent = text;
        finishLetterPage(page);
        return;
    }

    let characterIndex = 0;
    let lastCharacterTime = 0;

    function typeNextCharacter(timestamp) {
        if (isLetterSkipped) return;

        const previousCharacter = text.charAt(characterIndex - 1);
        let typingDelay = 24 + Math.random() * 28;
        if (previousCharacter === ",") typingDelay = 150 + Math.random() * 90;
        else if (previousCharacter === ".") typingDelay = 300 + Math.random() * 180;
        else if (previousCharacter === "\n") typingDelay = text.charAt(characterIndex - 2) === "\n" ? 620 : 150;

        if (!lastCharacterTime || timestamp - lastCharacterTime >= typingDelay) {
            target.textContent += text.charAt(characterIndex++);
            lastCharacterTime = timestamp;
        }

        if (characterIndex < text.length) letterTypingFrameId = window.requestAnimationFrame(typeNextCharacter);
        else finishLetterPage(page);
    }

    letterTypingFrameId = window.requestAnimationFrame(typeNextCharacter);
}

function beginLetterTyping() {

    if (isLetterTypingQueued || letterAssembly.classList.contains("is-typing") || letterAssembly.classList.contains("typing-complete")) {
        return;
    }

    isLetterTypingQueued = true;
    typeLetter(1);

}

function finishLetterPage(page, skipped = false) {

    function revealContinue() {
        letterScreen.classList.add("continue-visible");
        letterContinue.focus();
    }

    if (letterSkipTimerId) {
        window.clearTimeout(letterSkipTimerId);
        letterSkipTimerId = null;
    }

    letterSkip.classList.remove("is-visible");

    letterAssembly.classList.remove("is-typing");

    if (page === 1) {
        letterAssembly.classList.add("page-one-complete");
        letterNextPage.focus();
        return;
    }

    if (skipped) {
        letterAssembly.classList.add("typing-complete", "skip-complete");
        letterSignature.setAttribute("aria-hidden", "false");
        window.setTimeout(revealContinue, 300);
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealContinue();
    } else {
        letterSignature.addEventListener("animationend", (event) => {
            if (event.target === letterSignature && event.animationName === "signatureInkReveal") {
                revealContinue();
            }
        }, { once:true });
    }

    letterAssembly.classList.add("typing-complete");
    letterSignature.setAttribute("aria-hidden", "false");

}

function skipLetterTyping() {

    if (!letterAssembly.classList.contains("is-typing") || isLetterSkipped) {
        return;
    }

    isLetterSkipped = true;

    if (letterTypingFrameId) {
        window.cancelAnimationFrame(letterTypingFrameId);
        letterTypingFrameId = null;
    }

    const target = activeLetterPage === 1 ? typedLetterPageOne : typedLetterPageTwo;
    target.textContent = activeLetterPage === 1 ? letterPageOneText : letterPageTwoText;
    finishLetterPage(activeLetterPage, true);

}

function showLetterPageTwo() {
    if (!letterAssembly.classList.contains("page-one-complete")) return;

    letterPageOne.classList.add("is-turning");
    function finishPageOneExit(event) {
        if (event.target !== letterPageOne || event.animationName !== "letterPageExit") return;
        letterPageOne.removeEventListener("animationend", finishPageOneExit);
        letterPageOne.classList.remove("is-active", "is-turning");
        letterPageOne.setAttribute("aria-hidden", "true");
        typedLetterPageTwo.textContent = "";
        letterPageTwo.scrollTop = 0;
        letterPageTwo.classList.remove("is-entering");
        letterPageTwo.classList.add("is-active");
        letterPageTwo.setAttribute("aria-hidden", "false");
        letterAssembly.classList.remove("page-one-complete");
        letterAssembly.classList.add("page-two-active");
        activeLetterPage = 2;
        letterPageTwo.classList.add("is-entering");
        function finishPageTwoEnter(pageEvent) {
            if (pageEvent.target === letterPageTwo && pageEvent.animationName === "letterPageEnter") {
                letterPageTwo.removeEventListener("animationend", finishPageTwoEnter);
                letterPageTwo.classList.remove("is-entering");
                typeLetter(2);
            }
        }

        letterPageTwo.addEventListener("animationend", finishPageTwoEnter);
    }

    letterPageOne.addEventListener("animationend", finishPageOneExit);
}

function openRoyalLetter() {

    if (isLetterOpening) {
        return;
    }

    isLetterOpening = true;
    envelopeTrigger.disabled = true;
    letterAssembly.classList.add("is-opening", "is-seal-breaking");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letterContent = document.getElementById("letterContent");

    function advanceAfterAnimation(element, animationName, nextStep) {
        if (reduceMotion) {
            nextStep();
            return;
        }

        element.addEventListener("animationend", (event) => {
            if (event.target === element && event.animationName === animationName) {
                nextStep();
            }
        }, { once:true });
    }

    advanceAfterAnimation(waxSeal, "sealBreak", () => {
        letterAssembly.classList.add("flap-open");

        advanceAfterAnimation(envelopeTrigger, "envelopeFlapOpen", () => {
            letterAssembly.classList.add("paper-sliding");

            advanceAfterAnimation(letterPaper, "paperSlideOut", () => {
                letterAssembly.classList.add("paper-unfolding");

                advanceAfterAnimation(letterPaper, "paperUnfold", () => {
                    letterScreen.classList.add("paper-focus");
                    letterAssembly.classList.add("content-revealing");
                    advanceAfterAnimation(letterContent, "letterContentReveal", beginLetterTyping);
                });
            });
        });
    });

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

function openStoryChapter(index) {

    if (isLeavingStory) {
        return;
    }

    activateMilestone(index);
    const selectedCard = timelineCards[index];
    selectedCard.classList.remove("is-chapter-launching");
    void selectedCard.offsetWidth;
    selectedCard.classList.add("is-chapter-launching");
    isLeavingStory = true;

    window.setTimeout(() => {
        transitionScenes(storyPlaceholder, () => {
            showMemories();
            if (index > 0) {
                showMemory(index);
            }
        });
    }, 320);

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

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function completeLetterTransition() {
        letterScreen.classList.remove("is-simple-exiting", "paper-focus", "letter-typing");
        hideScene(letterScreen);
        showStoryPlaceholder();
    }

    if (reduceMotion) {
        completeLetterTransition();
        return;
    }

    window.setTimeout(() => {
        letterScreen.style.pointerEvents = "none";
        letterScreen.setAttribute("aria-hidden", "true");

        function finishLetterFade(event) {
            if (event.target === letterScreen && event.animationName === "letterSimpleExit") {
                letterScreen.removeEventListener("animationend", finishLetterFade);
                completeLetterTransition();
            }
        }

        letterScreen.addEventListener("animationend", finishLetterFade);
        letterScreen.classList.add("is-simple-exiting");
    }, 180);

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

    const previousReasonCard = reasonCards[currentReasonIndex];
    previousReasonCard.classList.remove("is-active");
    previousReasonCard.classList.add("is-leaving");
    previousReasonCard.addEventListener("animationend", () => {
        previousReasonCard.classList.remove("is-leaving");
    }, { once:true });
    currentReasonIndex = index;

    window.requestAnimationFrame(() => {
        reasonCards[currentReasonIndex].classList.remove("is-leaving");
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

    const previousPromiseCard = promiseCards[currentPromiseIndex];
    previousPromiseCard.classList.remove("is-active");
    previousPromiseCard.classList.add("is-leaving");
    previousPromiseCard.addEventListener("animationend", () => {
        previousPromiseCard.classList.remove("is-leaving");
    }, { once:true });
    currentPromiseIndex = index;

    window.requestAnimationFrame(() => {
        promiseCards[currentPromiseIndex].classList.remove("is-leaving");
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

    const revealDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1100;
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
    finalSurpriseScreen.classList.add("is-entering-surprise");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealGiftScene = () => {
        finalGiftScene.setAttribute("aria-hidden", "false");
        finalSurpriseScreen.classList.add("gift-scene-active");
        finalBlackout.classList.add("is-receding");
    };

    if (reduceMotion) {
        revealGiftScene();
        return;
    }

    window.setTimeout(revealGiftScene, 2800);

}

function waitForGiftMotion(animation) {
    return animation.finished.catch(() => undefined);
}

function animateGiftDust() {

    finalGiftScene.querySelectorAll(".gift-dust i").forEach((particle, index) => {
        particle.animate([
            { opacity:.25, transform:"scale(.8)" },
            { opacity:1, transform:`scale(${1.35 + ((index % 3) * .12)})` },
            { opacity:.3, transform:"scale(1)" }
        ], {
            duration:640,
            delay:index * 36,
            easing:"cubic-bezier(.22,.8,.28,1)"
        });
    });

}

async function playGiftFeedback(step) {

    const motion = [
        [
            { transform:"scale(1) rotate(0deg)", filter:"drop-shadow(0 0 0 rgba(235,193,84,0))" },
            { transform:"scale(.975,1.025) rotate(-.35deg)", filter:"drop-shadow(0 0 8px rgba(235,193,84,.22))", offset:.34 },
            { transform:"scale(1) rotate(0deg)", filter:"drop-shadow(0 0 0 rgba(235,193,84,0))" }
        ],
        [
            { transform:"scale(1) rotate(0deg)", filter:"drop-shadow(0 0 0 rgba(235,193,84,0))" },
            { transform:"scale(.968,1.032) rotate(-.6deg)", filter:"drop-shadow(0 0 13px rgba(235,193,84,.35))", offset:.25 },
            { transform:"scale(1.02,.98) rotate(.45deg)", filter:"drop-shadow(0 0 10px rgba(235,193,84,.22))", offset:.58 },
            { transform:"scale(1) rotate(0deg)", filter:"drop-shadow(0 0 0 rgba(235,193,84,0))" }
        ],
        [
            { transform:"scale(1) rotate(0deg)", filter:"drop-shadow(0 0 0 rgba(235,193,84,0))" },
            { transform:"scale(.96,1.04) rotate(-.8deg)", filter:"drop-shadow(0 0 18px rgba(235,193,84,.48))", offset:.2 },
            { transform:"scale(1.03,.97) rotate(.7deg)", filter:"drop-shadow(0 0 15px rgba(235,193,84,.35))", offset:.54 },
            { transform:"scale(1) rotate(0deg)", filter:"drop-shadow(0 0 0 rgba(235,193,84,0))" }
        ],
        [
            { transform:"scale(1) rotate(0deg)", filter:"drop-shadow(0 0 0 rgba(235,193,84,0))" },
            { transform:"scale(.95,1.05) rotate(-1deg)", filter:"drop-shadow(0 0 24px rgba(235,193,84,.65))", offset:.18 },
            { transform:"scale(1.04,.96) rotate(.95deg)", filter:"drop-shadow(0 0 28px rgba(235,193,84,.7))", offset:.48 },
            { transform:"scale(1) rotate(0deg)", filter:"drop-shadow(0 0 20px rgba(235,193,84,.55))" }
        ]
    ][step - 1];
    const duration = [340, 420, 500, 380][step - 1];
    const vibration = giftBox.animate(motion, { duration, easing:"cubic-bezier(.22,.8,.28,1)" });

    if (step === 2) {
        giftBox.querySelector(".gift-ribbon-horizontal").animate([
            { transform:"rotate(0deg) scaleX(1)" },
            { transform:"rotate(.8deg) scaleX(1.015)" },
            { transform:"rotate(0deg) scaleX(1)" }
        ], { duration, easing:"ease-in-out" });
    }

    if (step === 3) {
        giftBox.querySelector(".gift-lid").animate([
            { transform:"rotateX(0deg)", filter:"brightness(1)" },
            { transform:"rotateX(-5deg)", filter:"brightness(1.08)" },
            { transform:"rotateX(0deg)", filter:"brightness(1)" }
        ], { duration, easing:"cubic-bezier(.22,.8,.28,1)" });
        animateGiftDust();
    }

    await waitForGiftMotion(vibration);

}

async function openGiftBox() {

    if (giftInteractionBusy || giftInteractionStep >= 4 || finalGiftScene.classList.contains("gift-opened")) {
        return;
    }

    giftInteractionBusy = true;
    giftInteractionStep += 1;
    await playGiftFeedback(giftInteractionStep);

    if (giftInteractionStep === 4) {
        await waitForGiftMotion(giftBox.animate([
            { filter:"drop-shadow(0 0 20px rgba(235,193,84,.55))" },
            { filter:"drop-shadow(0 0 30px rgba(235,193,84,.78))" }
        ], { duration:350, fill:"forwards", easing:"ease-in" }));
        animateGiftDust();
        giftBox.classList.add("is-opening");
        finalGiftScene.classList.add("gift-opened");
        giftBox.disabled = true;
    }

    giftInteractionBusy = false;

}

function resizeStarCanvas() {

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    starCanvas.width = Math.floor(window.innerWidth * ratio);
    starCanvas.height = Math.floor(window.innerHeight * ratio);
    starCanvas.style.width = `${window.innerWidth}px`;
    starCanvas.style.height = `${window.innerHeight}px`;

    return ratio;

}

function centerStarTargets(points, width, height) {

    const bounds = points.reduce((result, point) => ({
        minX:Math.min(result.minX, point.x),
        maxX:Math.max(result.maxX, point.x),
        minY:Math.min(result.minY, point.y),
        maxY:Math.max(result.maxY, point.y)
    }), { minX:Infinity, maxX:-Infinity, minY:Infinity, maxY:-Infinity });
    const sourceWidth = Math.max(1, bounds.maxX - bounds.minX);
    const sourceHeight = Math.max(1, bounds.maxY - bounds.minY);
    const padding = Math.max(16, Math.min(width, height) * .045);
    const scale = Math.min(1, (width - (padding * 2)) / sourceWidth, (height - (padding * 2)) / sourceHeight);
    const sourceCenterX = (bounds.minX + bounds.maxX) / 2;
    const sourceCenterY = (bounds.minY + bounds.maxY) / 2;

    return points.map((point) => ({
        x:(width / 2) + ((point.x - sourceCenterX) * scale),
        y:(height / 2) + ((point.y - sourceCenterY) * scale)
    }));

}

function createTextTargets(width, height, text) {

    const targetCanvas = document.createElement("canvas");
    targetCanvas.width = width;
    targetCanvas.height = height;
    const targetContext = targetCanvas.getContext("2d", { willReadFrequently:true });
    const fontSize = Math.min(width * 0.16, height * 0.21, 145);

    targetContext.fillStyle = "#ffffff";
    targetContext.font = `600 ${fontSize}px Cinzel, Georgia, serif`;
    targetContext.textAlign = "center";
    targetContext.textBaseline = "middle";
    targetContext.fillText(text, width / 2, height / 2);

    const pixels = targetContext.getImageData(0, 0, width, height).data;
    const points = [];

    for (let y = 0; y < height; y += 6) {
        for (let x = 0; x < width; x += 6) {
            if (pixels[((y * width) + x) * 4 + 3] > 80) {
                points.push({ x, y });
            }
        }
    }

    return centerStarTargets(points, width, height);

}

function createHeartTargets(width, height) {

    const points = [];
    const scale = Math.min(width, height) * 0.018;

    for (let t = 0; t < Math.PI * 2; t += 0.036) {
        const x = 16 * Math.sin(t) ** 3;
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        points.push({ x:(width / 2) + (x * scale), y:(height / 2) + (y * scale) });
    }

    return centerStarTargets(points, width, height);

}

function setStarTargets(targets) {

    starField.forEach((star, index) => {
        const target = targets[index % targets.length];
        star.targetX = target.x;
        star.targetY = target.y;
    });

}

function startStarCanvas() {

    const ratio = resizeStarCanvas();
    const width = starCanvas.width / ratio;
    const height = starCanvas.height / ratio;
    const count = Math.min(360, Math.max(180, Math.round((width * height) / 5000)));

    starField = Array.from({ length:count }, () => ({
        x:Math.random() * width,
        y:Math.random() * height,
        targetX:Math.random() * width,
        targetY:Math.random() * height,
        size:Math.random() * 1.25 + 0.45,
        phase:Math.random() * Math.PI * 2,
        speed:Math.random() * 0.16 + 0.05,
        born:Math.random() * 4200
    }));
    starMode = "sky";

    const context = starCanvas.getContext("2d");
    let previous = performance.now();
    const startTime = previous;

    const draw = (now) => {
        const scale = Math.min(window.devicePixelRatio || 1, 2);
        const canvasWidth = starCanvas.width / scale;
        const canvasHeight = starCanvas.height / scale;
        const delta = Math.min(32, now - previous);
        previous = now;
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        starField.forEach((star) => {
            if (starMode === "sky") {
                star.x += Math.sin((now * .0003) + star.phase) * star.speed * (delta / 16);
                star.y += Math.cos((now * .00025) + star.phase) * star.speed * (delta / 16);
            } else {
                star.x += (star.targetX - star.x) * 0.028 * (delta / 16);
                star.y += (star.targetY - star.y) * 0.028 * (delta / 16);
            }

            const glow = (.48 + (Math.sin((now * .003) + star.phase) * .28)) * Math.min(1, Math.max(0, (now - startTime - star.born) / 900));
            context.beginPath();
            context.fillStyle = `rgba(255, 232, 160, ${Math.max(.18, glow)})`;
            context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            context.fill();
        });

        endingAnimationFrame = window.requestAnimationFrame(draw);
    };

    window.cancelAnimationFrame(endingAnimationFrame);
    endingAnimationFrame = window.requestAnimationFrame(draw);

}

function showEndingMessage(message) {

    endingMessage.classList.remove("is-visible");
    window.setTimeout(() => {
        endingMessage.textContent = message;
        endingMessage.classList.add("is-visible");
    }, 260);

}

function startCinematicEnding() {

    if (endingHasStarted) {
        return;
    }

    endingHasStarted = true;
    cinematicEnding.setAttribute("aria-hidden", "false");
    cinematicEnding.classList.add("is-active");
    startStarCanvas();

    window.setTimeout(() => {
        starMode = "name";
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        setStarTargets(createTextTargets(starCanvas.width / ratio, starCanvas.height / ratio, "SHREE ❤️"));
    }, 5000);

    window.setTimeout(() => {
        starMode = "heart";
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        setStarTargets(createHeartTargets(starCanvas.width / ratio, starCanvas.height / ratio));
        cinematicEnding.classList.add("heart-formed");
    }, 15000);

    window.setTimeout(() => showEndingMessage("You are my favourite place."), 19000);
    window.setTimeout(() => endingMessage.classList.remove("is-visible"), 22300);
    window.setTimeout(() => showEndingMessage("This website has an ending..."), 23000);
    window.setTimeout(() => showEndingMessage("But..."), 25800);
    window.setTimeout(() => showEndingMessage("I hope our story never does."), 28200);
    window.setTimeout(() => {
        endingMessage.classList.remove("is-visible");
        endingTimeline.classList.add("is-visible");
    }, 32200);
    window.setTimeout(() => {
        shootingWish.classList.add("is-visible");
        shootingWish.querySelector("p").textContent = "Make a wish...";
    }, 37200);
    window.setTimeout(() => {
        shootingWish.querySelector("p").textContent = "I already did.\nAnd it came true.\nIt was you. ❤️";
        shootingWish.classList.add("wish-complete");
    }, 38200);
    window.setTimeout(() => replayStory.classList.add("is-visible"), 41800);

    endingSecretTimer = window.setTimeout(() => secretStar.classList.add("is-visible"), 10000);

}

function replayOurStory() {

    window.location.reload();

}

function showSecretNote() {

    secretNote.setAttribute("aria-hidden", "false");
    secretNote.classList.add("is-visible");

}

function hideSecretNote() {

    secretNote.classList.remove("is-visible");
    secretNote.setAttribute("aria-hidden", "true");

}

beginJourney.addEventListener("click", showRoyalLetter);
envelopeTrigger.addEventListener("click", openRoyalLetter);
letterContinue.addEventListener("click", continueToStoryPlaceholder);
letterSkip.addEventListener("click", skipLetterTyping);
letterNextPage.addEventListener("click", showLetterPageTwo);

timelineCards.forEach((card, index) => {
    card.addEventListener("click", () => openStoryChapter(index));
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
giftBox.addEventListener("click", openGiftBox);
giftBox.addEventListener("animationend", (event) => {
    if (event.animationName === "giftBoxAppear") {
        giftBox.style.opacity = "1";
        giftBox.style.visibility = "visible";
    }
});
finalGiftScene.addEventListener("animationend", (event) => {
    if (event.target === finalGiftScene && event.animationName === "giftSceneFadeToBlack") {
        window.setTimeout(startCinematicEnding, 2000);
    }
});
replayStory.addEventListener("click", replayOurStory);
secretStar.addEventListener("click", showSecretNote);
closeSecretNote.addEventListener("click", hideSecretNote);
window.addEventListener("resize", () => {
    if (endingHasStarted) {
        startStarCanvas();
    }
});

interactiveButtons.forEach((button) => {
    button.addEventListener("pointerdown", () => {
        if (button.disabled) {
            return;
        }

        button.classList.remove("press");
        void button.offsetWidth;
        button.classList.add("press");
    });

    button.addEventListener("animationend", (event) => {
        if (event.animationName === "press") {
            button.classList.remove("press");
        }
    });
});

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
