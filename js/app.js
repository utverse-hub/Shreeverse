// ===============================
// ELEMENTS
// ===============================

const introText = document.getElementById("introText");
const keyContainer = document.getElementById("keyContainer");
const key = document.getElementById("key");
const door = document.getElementById("door");

const leftDoor = document.querySelector(".door-left");
const rightDoor = document.querySelector(".door-right");

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

// ===============================
// SHOW INTRO
// ===============================

function showNextLine() {

    if (currentLine >= introLines.length) {

        revealKey();
        return;

    }

    introText.className = "";
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

    keyContainer.style.opacity = "1";
    keyContainer.style.pointerEvents = "auto";

    key.classList.add("float");
    key.classList.add("glow");

}

// ===============================
// KEY CLICK
// ===============================

key.addEventListener("click", () => {

    door.style.display = "flex";

    setTimeout(() => {

        leftDoor.classList.add("open-left");
        rightDoor.classList.add("open-right");

    }, 100);

    setTimeout(() => {

    document.getElementById("prologue").style.display = "none";
    document.getElementById("app").style.display = "block";

}, 2000);

});

// ===============================
// START
// ===============================

window.addEventListener("load", () => {

    setTimeout(showNextLine, 1200);

});