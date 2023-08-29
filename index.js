const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

const generatePasswordsButtonEl = document.querySelector(".generate-passowords-btn");
const firstPasswordEl = document.querySelector(".first-password");
const secondPasswordEl = document.querySelector(".second-password");
const passwordsContainerEl = document.querySelector(".password-btns-container-hidden");

const passwordLengthEl = document.getElementById("password-length-input");
const numbersToggleButtonEL = document.querySelector(".toggle-numbers-btn");
const symbolsToggleButtonEl = document.querySelector(".toggle-symbols-btn");



function createTooltip() {
    const tooltipEl = document.createElement("span");
    tooltipEl.classList.add("password-tooltip");
    tooltipEl.textContent = "Password copied!";
    return tooltipEl;
}

function appendTooltip(copiedEl) {
    const tooltipEl = createTooltip()
    copiedEl.parentElement.appendChild(tooltipEl);
    return tooltipEl;
}

function showTooltip(tooltipEl) {
    tooltipEl.style.visibility = "visible";
    setTimeout(function() {
        tooltipEl.style.visibility = "hidden";
    }, 1000);
}

function toggleNumbers() {
    if (numbersToggleButtonEL.value === "ON") {
        numbersToggleButtonEL.value = "OFF";
        numbersToggleButtonEL.textContent = "Numbers OFF";
        numbersToggleButtonEL.classList.toggle("toggle-btn-off");
    } else if (numbersToggleButtonEL.value === "OFF") {
        numbersToggleButtonEL.value = "ON";
        numbersToggleButtonEL.textContent = "Numbers ON";
        numbersToggleButtonEL.classList.toggle("toggle-btn-off");
    }
}

function toggleSymbols() {
    if (symbolsToggleButtonEl.value === "ON") {
        symbolsToggleButtonEl.value = "OFF";
        symbolsToggleButtonEl.textContent = "Symbols OFF"
        symbolsToggleButtonEl.classList.toggle("toggle-btn-off")
    } else if (symbolsToggleButtonEl.value === "OFF") {
        symbolsToggleButtonEl.value = "ON";
        symbolsToggleButtonEl.textContent = "Symbols ON"
        symbolsToggleButtonEl.classList.toggle("toggle-btn-off")
    }
}

function generateRandomCharacter() {
    let charactersArray = characters;

    if (numbersToggleButtonEL.value === "ON") {
        charactersArray = charactersArray.concat(numbers);
    }

    if (symbolsToggleButtonEl.value === "ON") {
        charactersArray = charactersArray.concat(symbols);
    }

    let randomNumber = Math.floor(Math.random() * charactersArray.length);
    let randomCharacter = charactersArray[randomNumber];
    return randomCharacter;
}

function generateSinglePassword() {
    let password = "";
    
    for (i = 0; i < parseInt(passwordLengthEl.value); i++) {
        password += generateRandomCharacter();
    }
    return password;
}

function generatePasswords() {
    firstPasswordEl.textContent = generateSinglePassword();
    secondPasswordEl.textContent = generateSinglePassword();
    const passwordsContainerEl = document.querySelector(".password-btns-container-hidden");
    passwordsContainerEl.classList.add("password-btns-container");
}

function copyPassword(password) {
    navigator.clipboard.writeText(password.textContent);
}

numbersToggleButtonEL.addEventListener("click", toggleNumbers);

symbolsToggleButtonEl.addEventListener("click", toggleSymbols);

generatePasswordsButtonEl.addEventListener("click", generatePasswords);

firstPasswordEl.addEventListener("click", () => {
    copyPassword(firstPasswordEl);
    showTooltip(appendTooltip(firstPasswordEl));
});

secondPasswordEl.addEventListener("click", () => {
    copyPassword(secondPasswordEl);
    showTooltip(appendTooltip(secondPasswordEl));
});