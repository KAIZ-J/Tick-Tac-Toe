const winningNumbers = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const oBtn = document.getElementById("o-btn");
let boxCheck = {};
let userTurn = true;
let gameWon = false;
let userCharacter = "X";
let pcCharacter = "O";
const boxContainer = document.getElementById("box-container");
const characterSettings = document.getElementById("character-settings")
const home = document.getElementById("home");
const xBtn = document.getElementById("x-btn");
function themeChange(elem) {
  document.body.classList.toggle("dark");
   elem.querySelector("i").style.rotate="0deg"
   setTimeout(()=>{
elem.querySelector("i").style.rotate="360deg";
  elem.querySelector("i").classList.toggle("fa-sun");
   elem.querySelector("i").classList.toggle("fa-moon"); 
   },100)
  
}
function updateCharacter(user, computer) {
  if (user !== userCharacter) {
    xBtn.classList.toggle("active");
    oBtn.classList.toggle("active"); 
  }
  userCharacter = user;
  pcCharacter = computer;
}

function addBoxes(cls) {
  boxContainer.innerHTML = "";
  boxCheck = {};
  for (let i = 1; i < 10; i++) {
    boxContainer.innerHTML += `<button type="button" id="box-${i}" class="box" onclick="${cls}(this)"></button>`;
    document.getElementById(`box-${i}`).style.borderColor = `var(--text)`;
    boxCheck[`box-${i}`] = true;
  }
}

///to make the computer smart enough
function pcTurnBestMove() {
  let num = -1;
  if (boxCheck[`box-${5}`] === true) {
    num = 5;
  }
  if (num === -1) {
    for (let i = 8; i > 6; i--) {
      let array = winningNumbers[i];
      let filteredArray = array.filter(
        (item) => boxCheck[`box-${item + 1}`] === false
      );
      let filteredArrayContent = filteredArray
        .map((item) => document.getElementById(`box-${item + 1}`).textContent)
        .join("");
      if ((filteredArrayContent = "O")) {
        num = array.find((item) => boxCheck[`box-${item + 1}`] === true) + 1;
        break;
      }
    }
  }
  return num;
}
function checkIfAllEmpty() {
  let num = -1;
  if (Object.keys(boxCheck).every((a) => boxCheck[a] === true)) {
    let array = [0, 2, 6, 8];
    num = array[Math.floor(Math.random() * array.length)];
  }
  return num;
}
function onlyCharacter() {
  let num = -1;
  let generalArray = [];
  for (let i = 0; i < winningNumbers.length; i++) {
    let array = winningNumbers[i];
    let filteredArray = array.filter(
      (item) => boxCheck[`box-${item + 1}`] === false
    );
    let filteredArrayContent = filteredArray
      .map((item) => document.getElementById(`box-${item + 1}`).textContent)
      .join("");
    if ((filteredArrayContent = "O")) {
      let trueArray = array.filter(
        (item) => boxCheck[`box-${item + 1}`] === true
      );
      generalArray.push(trueArray);
    }
  }
  for (let j = 0; ; j++) {
    if (boxCheck[`box-${generalArray[0][1] + 1}`] === true)
      num = generalArray[0][1];
    break;
  }
  return num;
}
function centerCaptured() {
  let num = -1;
  if (
    Object.keys(boxCheck).some((a) => boxCheck[a] === false) &&
    boxCheck[`box-5`] === true
  ) {
    num = 4;
  }
  return num;
}
function centerOrCorner() {
  let num = -1;
  if (boxCheck[`box-5`] === true) {
    num = 4;
  } else if (
    Object.keys(boxCheck).some((a) => boxCheck[a] === false) &&
    boxCheck[`box-1`] === true
  ) {
    let array = [0, 2, 6, 8];
    num = array[Math.floor(Math.random() * array.length)];
  }
  return num;
}

//ends here
function pcBestMove(str) {
  let num = -1;
  for (let i = 0; i < winningNumbers.length; i++) {
    let array = winningNumbers[i];
    let filteredArray = array.filter(
      (item) => boxCheck[`box-${item + 1}`] === false
    );
    let filteredArrayContent = filteredArray
      .map((item) => document.getElementById(`box-${item + 1}`).textContent)
      .join("");
    if (filteredArrayContent === str) {
      num = array.find((item) => boxCheck[`box-${item + 1}`] === true);
      break;
    }
  }
  return num;
}
function pcChoiceNumber() {
  let num = pcBestMove(`${pcCharacter}${pcCharacter}`);
  if (num === -1) {
    num = pcBestMove(`${userCharacter}${userCharacter}`);
  }
  if (num === -1) {
    num = centerCaptured();
  }
  if (num === -1) {
    num = checkIfAllEmpty();
  }
  if (num === -1) {
    num = centerOrCorner();
  }
  if (num === -1) {
    num = onlyCharacter();
  }

  return num !== -1 ? num + 1 : Math.floor(Math.random() * 9) + 1;
}
function pcChoice() {
  let bool = Object.keys(boxCheck).some((a) => boxCheck[a] === true);
  if (bool) {
    for (let i = 0; ; i++) {
      let j = pcChoiceNumber();
      if (boxCheck[`box-${j}`] === true) {
        document.getElementById(`box-${j}`).textContent = pcCharacter;
         document.getElementById(`box-${j}`).style.color="var(--accent)"
        boxCheck[`box-${j}`] = false;
        break;
      }
    }
  }
}

addBoxes("addContent");
function addContent(elem) {
  if (boxCheck[elem.id] === true && gameWon === false) {
    elem.textContent = userCharacter;
    elem.style.color = `var(--primary)`;
    characterSettings.style.display = "none";
    boxCheck[elem.id] = false;
    winCheck();
    if (gameWon === false) {
      setTimeout(() => {
        pcChoice();
        winCheck();
        if (
          Object.keys(boxCheck).every((a) => boxCheck[a] === false) &&
          gameWon === false
        ) {
          winMessage("tie");
        }
      }, 200);
    }
  }
  if (
    Object.keys(boxCheck).every((a) => boxCheck[a] === false) &&
    gameWon === false
  ) {
    setTimeout(function () {
      winMessage("tie");
    }, 200);
  }
}
function winCheck() {
  let buttons = [...document.querySelectorAll(".box")];
  let buttonsText = buttons.map((el) => el.textContent);
  for (let i = 0; i < winningNumbers.length; i++) {
    for (let z = 0; z < 1; z++) {
      if (
        buttonsText[winningNumbers[i][z]] ===
          buttonsText[winningNumbers[i][z + 1]] &&
        buttonsText[winningNumbers[i][z + 1]] ===
          buttonsText[winningNumbers[i][z + 2]] &&
        buttonsText[winningNumbers[i][z]] !== ""
      ) {
        gameWon = true;
        buttons[winningNumbers[i][z]].style.animation =
          "scaleAnime .4s ease forwards";
        buttons[winningNumbers[i][z + 1]].style.animation =
          "scaleAnime .4s ease forwards .4s";
        buttons[winningNumbers[i][z + 2]].style.animation =
          "scaleAnime .4s ease forwards .8s";
        setTimeout(function () {
          winMessage(buttonsText[winningNumbers[i][z]]);
        }, 1500);
      }
    }
  }
}
function winMessage(winner) {
    home.style.display = "block";
  if (winner === userCharacter) {
    home.innerHTML = `<h2>You Beat the computer😎</h2>`;
  } else if (winner === pcCharacter) {
    home.innerHTML = `<h2>You lost to the computer😑</h2>`;
  } else {
    home.innerHTML = `<h2>Draw😒</h2>`;
  }
  home.innerHTML += `     <button type="button" id="try" onclick="newGame()">Play again</button> `;
}
function newGame(){
    characterSettings.style.display="block";
    home.style.display = "none";
    addBoxes("addContent");
    gameWon = false;
//   if (userTurn === false) {
//     setTimeout(function () {
//       pcChoice();
//     }, 200);
//     userTurn = true;
//   } else {
//     userTurn = false;
//   }
}