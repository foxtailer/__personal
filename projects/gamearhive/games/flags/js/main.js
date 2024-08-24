let container = document.querySelector(".img-container");
let buttons = document.querySelectorAll(".button");
let score = document.querySelector(".score");

let answ = 0;
let questions = 0;
let trueAnswer;
let trueBtn;
let data = {};
let flagList = [];
let buttonClicked = false;

async function loadJSON() {
    try {
        const response = await fetch('js/flags_short.json'); // Path is correct for same directory
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        data = await response.json();
        flagList = Object.keys(data);
        setFlag();
        setButtons(trueAnswer);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

function setFlag() {
    let i = Math.floor(Math.random() * flagList.length);
    let item = data[flagList[i]];
    container.innerHTML = item["1x1"];
    trueAnswer = item["name"];
}

function setButtons(trueAnswer) {
    let i = Math.floor(Math.random() * 4);
    buttons[i].textContent = trueAnswer;

    score.textContent = answ + "/" + questions;

    let asignFalse = 0;
    let awailableBtns = [0, 1, 2, 3];
    let falseList = [];
    awailableBtns.splice(i, 1);

    while (asignFalse < 3) {
        let j = Math.floor(Math.random() * flagList.length);
        let falseAnswer = data[flagList[j]]["name"];

        if ((falseAnswer !== trueAnswer) && !(falseList.includes(falseAnswer))) {
            buttons[awailableBtns[asignFalse]].textContent = falseAnswer;
            asignFalse++;
        }
        falseList.push(falseAnswer);
    }

    trueBtn = i;
}

function reSet() {
    for (const element of buttons) {
        element.style.backgroundColor = "";
    }
    questions++;
    setFlag();
    setButtons(trueAnswer);
    buttonClicked = false;
}

for (let i = 0; i < 4; i++) {
    let btnName = "#btn-" + (i + 1);
    document.querySelector(btnName).addEventListener("click", () => {
        if (!buttonClicked) {
            buttonClicked = true;

            if (i == trueBtn) {
                answ++;
                document.querySelector(btnName).style.backgroundColor = "green";
                setTimeout(reSet, 2500);
            } else {
                document.querySelector(btnName).style.backgroundColor = "red";
                document.querySelector("#btn-" + (trueBtn + 1)).style.backgroundColor = "green";
                setTimeout(reSet, 2500);
            }
        }
    });
}

// Load JSON data and initialize
loadJSON();
