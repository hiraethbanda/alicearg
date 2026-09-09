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

    const commands = {
        "ondeestavoce": "Estou em 30.465633, 130.497257, <br> na direção em que o sol nasce...",
        "osolseposeondeestavoce": "Estou em 30°27'56.3'N 130°29'50.1'E, <br> na direção onde o sol nasce...",
        "futatsunokokoro": "...revivendo assuntos pra outra vida. E você? Onde está?",
        "distantedetudo": "https://youtube.com/[url]"
    };
    const dicas = {
        "coracoes": "1234567890",
        "doiscoracoes": "Onde estamos?"
    };
    const commandsTroll = {        
        "six": "seven",
        "gato": "miau",
        "bora": "bill",
        "ai": "que delicia cara",
        "pudim": "https://pudim.com.br"
    };

    // add
    history.innerHTML += `<div class="historyLine"><span class="prefix">></span><span class="content">${value}</span></div>`;;

    // casos especiais
    if (value === "clear") {
        history.innerHTML = "";
    }
    else if (value === "help") {
        history.innerHTML +=
            `<p id="answerPrefix">
            As respostas aceitas não contém acentos, letras maiúsculas ou pontuação. <br>
            Tente fazer perguntas. <br><br>
            Boa sorte.
            <br><br>
            
            help: Mostra esta mensagem. <br>
            clear: Limpa o histórico. <br>
                
            <p id="msgHelp">Anoitecer </p>
        </p>`
    }

    // resposta
    if (value in commands) {
        history.innerHTML +=
            `<div class="answerLine">
            <span id="answerPrefix">
                lagarta: 
            </span>
                ${commands[value]}
        </div>`;
    }
    else if (value in dicas) {
        history.innerHTML +=
            `<div class="answerLine">
            <span id="answerPrefix">
                Dica: 
            </span>
                ${dicas[value]}
        </div>`;
    }
    else if (value in commandsTroll) {
        history.innerHTML +=
            `<div class="answerLine">
                ${commandsTroll[value]}
        </div>`;
    }

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