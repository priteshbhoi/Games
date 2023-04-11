const words = ["javascript", "html", "css", "nodejs", "react", "angular", "vue", "typescript"];

let word = words[Math.floor(Math.random() * words.length)];
let remainingGuesses = 6;
let guessedLetters = [];

const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 2;

function drawHead() {
  ctx.beginPath();
  ctx.arc(250, 100, 40, 0, Math.PI * 2);
  ctx.stroke();
}

function drawBody() {
  ctx.beginPath();
  ctx.moveTo(250, 140);
  ctx.lineTo(250, 280);
  ctx.stroke();
}

function drawLeftArm() {
  ctx.beginPath();
  ctx.moveTo(250, 180);
  ctx.lineTo(220, 220);
  ctx.stroke();
}

function drawRightArm() {
  ctx.beginPath();
  ctx.moveTo(250, 180);
  ctx.lineTo(280, 220);
  ctx.stroke();
}

function drawLeftLeg() {
  ctx.beginPath();
  ctx.moveTo(250, 280);
  ctx.lineTo(220, 330);
  ctx.stroke();
}

function drawRightLeg() {
  ctx.beginPath();
  ctx.moveTo(250, 280);
  ctx.lineTo(280, 330);
  ctx.stroke();
}

function drawHangman() {
  switch (remainingGuesses) {
    case 6:
      drawHead();
      break;
    case 5:
      drawBody();
      break;
    case 4:
      drawLeftArm();
      break;
    case 3:
      drawRightArm();
      break;
    case 2:
      drawLeftLeg();
      break;
    case 1:
      drawRightLeg();
      break;
    default:
      break;
  }
}

function updateWordText() {
  let displayWord = "";
  for (let letter of word) {
    if (guessedLetters.includes(letter)) {
      displayWord += letter + " ";
    } else {
      displayWord += "_ ";
    }
  }
  document.getElementById("word-text").innerText = displayWord;
}

function updateLettersButtons() {
  let lettersButtonsHTML = "";
  for (let i = 65; i <= 90; i++) {
    let letter = String.fromCharCode(i).toLowerCase();
    if (!guessedLetters.includes(letter)) {
      lettersButtonsHTML += `<button onclick="handleGuess('${letter}')">${letter}</button>`;
    } else {
      lettersButtonsHTML += `<button class="disabled">${letter}</button>`;
    }
  }
  document.getElementById("letters-buttons").innerHTML = lettersButtonsHTML;
}

function handleGuess(letter) {
  guessedLetters.push(letter);
  if (word.includes(letter)) {
    updateWordText();
  } else {
    remainingGuesses--;
    drawHangman();
  }
  updateLettersButtons();
  checkWinOrLose();
}

function checkWinOrLose() {
  if (remainingGuesses === 0) {
    alert(`You lost! The word was "${word}".`);
    restart();
  } else if (!document.getElementById("word-text").innerText.includes("_")) {
    alert("You won!");
    restart();
  }
}

function restart() {
  word = words[Math.floor(Math.random() * words.length)];
  remainingGuesses = 6;
  guessedLetters = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateWordText();
  updateLettersButtons();
}

updateWordText();
updateLettersButtons();
