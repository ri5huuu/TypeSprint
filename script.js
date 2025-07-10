const texts = [
    "Typing is a fundamental skill in the digital world.",
    "Practice makes perfect, so keep typing every day!",
    "Improve your typing speed and accuracy here at TypeSprint.",
    "Focus on accuracy first, speed will follow automatically.",
    "JavaScript adds life to your web pages."
];

let index = 0;
let startTime;
let timerInterval;
let typedCharacters = 0;

// DOM elements
const textDisplay = document.querySelector(".Text");
const accuracyDisplay = document.getElementById("accuracy");
const wpmDisplay = document.getElementById("wpm");
const timerDisplay = document.getElementById("timer");
const textAreaContainer = document.querySelector(".textarea");

// Load first text
loadText();

function loadText() {
    clearInterval(timerInterval);
    const sentence = texts[index];
    textDisplay.innerHTML = "";
    sentence.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        textDisplay.appendChild(span);
    });
    typedCharacters = 0;
    startTime = null;
    updateStats(0, 0);
    timerDisplay.innerText = "0s";
}

// Typing input handler
document.addEventListener("keydown", function (e) {
    const spans = textDisplay.querySelectorAll("span");
    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }

    let currentChar = spans[typedCharacters];
    if (!currentChar) return;

    if (e.key.length === 1) {  // Ignore Shift, Ctrl etc.
        if (e.key === currentChar.innerText) {
            currentChar.classList.add("correct");
        } else {
            currentChar.classList.add("wrong");
        }
        typedCharacters++;

        if (typedCharacters === spans.length) {
            clearInterval(timerInterval);
        }

        calculateStats();
    }
});

function calculateStats() {
    const spans = textDisplay.querySelectorAll("span");
    const correct = textDisplay.querySelectorAll(".correct").length;
    const wrong = textDisplay.querySelectorAll(".wrong").length;
    const total = correct + wrong;

    const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
    const timeTaken = (new Date() - startTime) / 1000 / 60; // minutes
    const wpm = timeTaken > 0 ? Math.round(correct / 5 / timeTaken) : 0;

    updateStats(accuracy, wpm);
}

function updateStats(accuracy, wpm) {
    accuracyDisplay.innerText = `${accuracy}%`;
    wpmDisplay.innerText = `${wpm}`;
}

function updateTimer() {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    timerDisplay.innerText = `${elapsed}s`;
}

// Buttons
document.querySelector(".reset").addEventListener("click", () => {
    loadText();
});

document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % texts.length;
    loadText();
});

document.querySelector(".previous").addEventListener("click", () => {
    index = (index - 1 + texts.length) % texts.length;
    loadText();
});
