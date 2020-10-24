"use strict";

const headerBtn = document.querySelector(".headerBtn");
const playBtn = document.querySelector(".fa-play");
const timerAlarm = document.querySelector(".timer");
const carrotCounter = document.querySelector(".carrotCounter");
const field = document.querySelector(".field");
const bgSound = new Audio();
bgSound.src = "sound/bg.mp3";
const bugPullSound = new Audio();
bugPullSound.src = "sound/bug_pull.mp3";
const carrotPullSound = new Audio();
carrotPullSound.src = "sound/carrot_pull.mp3";
const gameWinSound = new Audio();
gameWinSound.src = "sound/game_win.mp3";

playBtn.addEventListener("click", playGame);
function playGame() {
  bgSound.play();
  removeImgs();
  changeBtn();
  countDown();
  creatImgs();
  carrotCounter.innerText = "10";
  carrotCount = 10;
}

function removeImgs() {
  const imgList = document.querySelector(".imgList");
  if (imgList) {
    imgList.remove();
  }
}

function changeBtn() {
  headerBtn.insertAdjacentHTML("afterbegin", `<i class="fas fa-square"></i>`);
  playBtn.remove();
}

let count;
function countDown() {
  let time = 10;
  count = setInterval(() => {
    if (time > -1) {
      timerAlarm.innerText = `0 : ${time}`;
    } else if (time === -1) {
      displayMessage(`YOU LOST 🤣`);
      clearInterval(count);
    }
    time--;
  }, 1000);
}

function creatImgs() {
  const divRow = document.createElement("div");
  divRow.setAttribute("class", "imgList");
  field.appendChild(divRow);
  for (let i = 0; i < 10; i++) {
    if (i < 7) {
      divRow.insertAdjacentHTML(
        "afterbegin",
        `<img class="bugImg" src="img/bug.png" id="bugImg${i}"/>`
      );
      randomCoord("bugImg", i);
      bugImgEvent();
    }
    divRow.insertAdjacentHTML(
      "afterbegin",
      `<img class="carrotImg" src="img/carrot.png" id="carrotImg${i}"/>`
    );
    randomCoord("carrotImg", i);
    carrotImgEvent();
  }
}

function randomCoord(imgName, i) {
  const element = document.querySelector(`.${imgName}[id="${imgName}${i}"]`);
  element.style.left = Math.round(Math.random() * field.offsetWidth) + "px";
  element.style.top = Math.round(Math.random() * field.offsetHeight) + "px";
}

const bugImgEvent = function () {
  const bugImg = document.querySelector(".bugImg");
  bugImg.addEventListener("click", bugClicked);
};

const carrotImgEvent = function () {
  const carrotImg = document.querySelector(".carrotImg");
  carrotImg.addEventListener("click", carrotClicked);
};

function displayMessage(message) {
  for (let i = 0; i < 7; i++) {
    const bugImg = document.querySelector(`.bugImg[id="bugImg${i}"]`);
    bugImg.removeEventListener("click", bugClicked);
  }
  const resultAlert = document.querySelector(".alert");
  if (resultAlert) {
    resultAlert.remove();
  }
  field.insertAdjacentHTML(
    "afterbegin",
    `<div class="alert">
  <i class="fas fa-redo-alt"></i>
  <div class="message">${message}</div>
</div>`
  );
  createReplayEvent();
  removePauseBtn();
  clearInterval(count);
}

function createReplayEvent() {
  const replayBtn = document.querySelector(".fa-redo-alt");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      replayBtn.parentNode.remove();
      playGame();
    });
  }
}

function removePauseBtn() {
  const pauseBtn = document.querySelector(".fa-square");
  if (pauseBtn) {
    pauseBtn.remove();
  }
}

function bugClicked() {
  bugPullSound.play();
  displayMessage(`YOU LOST 🤣`);
  for (let i = 0; i < 10; i++) {
    const bugImg = document.querySelector(`.bugImg[id="bugImg${i}"]`);
    const carrotImg = document.querySelector(`.carrotImg[id="carrotImg${i}"]`);
    if (i < 7) {
      bugImg.removeEventListener("click", bugClicked);
    }
    carrotImg.removeEventListener("click", carrotClicked);
  }
  this.remove();
}

let carrotCount = 10;
function carrotClicked() {
  carrotPullSound.play();
  carrotCount--;
  carrotCounter.innerText = `${carrotCount}`;
  if (carrotCount === 0) {
    displayMessage(`YOU WON 👍`);
    gameWinSound.play();
    clearInterval(count);
  }
  this.remove();
}
