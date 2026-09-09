// caret
// completamente copiado do claude / gpt
// sim eu sou uma bichinha

const userInput = document.getElementById("userInput");
const caret = document.getElementById("caret");

const measurer = document.createElement("span");
measurer.style.font = getComputedStyle(userInput).font;
measurer.style.visibility = "hidden";
measurer.style.position = "absolute";
measurer.style.whiteSpace = "pre";
document.body.appendChild(measurer);

measurer.textContent = "M";
const charWidth = measurer.getBoundingClientRect().width;

function updateCaretPosition() {
    caret.style.left = `${
        userInput.offsetLeft +
        userInput.value.length * charWidth -
        userInput.scrollLeft +
        2
    }px`;
}

function showCaret() {
    caret.style.display = "inline";
    updateCaretPosition();
}

userInput.addEventListener("input", updateCaretPosition);
userInput.addEventListener("focus", showCaret);
userInput.addEventListener("blur", () => caret.style.display = "none");

window.addEventListener("DOMContentLoaded", () => {
    if (document.activeElement === userInput) showCaret();
});

// check

const ans = document.getElementById("answer");



function check() {
    let value = document.getElementById("userInput").value;
    const history = document.getElementById("history");
    const wrapperInput = document.getElementById("wrapperInput");

    // sanitizar input
    value = value.toLowerCase();
    value = value.replace(/[^a-z]/g, "");
    
    // add
    history.innerHTML += `<div class="historyLine"><span class="prefix">></span><span class="content">${value}</span></div>`;;

    fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value })
    });

    document.getElementById("userInput").value = "";
    showCaret();
}


userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        check();
    }
});

document.body.addEventListener('click', () => {
    userInput.focus();
    setTimeout(updateCaretPosition, 0);
});