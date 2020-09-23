//const header = document.querySelector(".header");
const headerBtn = document.querySelector(".headerBtn");
const playBtn = document.querySelector(".fa-play");
//const pauseBtn = document.querySelector(".fa-square");
const timerAlarm = document.querySelector(".timer");
const carrotCounter = document.querySelector(".carrotCounter");
const field = document.querySelector(".field");
//const resultAlert = document.querySelector(".alert");
//const replayBtn = document.querySelector(".fa-redo-alt");
//const imgList = document.querySelector(".imgList");
//const message = document.querySelector(".message");
//const bugImg = document.querySelector(".bugImg");
//const carrotImg = document.querySelector(".carrotImg");

playBtn.addEventListener("click", playGame);
function playGame() {
  removeImgs();
  changeBtn();
  countDown();
  creatImgs();
  carrotCounter.innerText = "10";
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

// 타이머 기능
var count;
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

// 벌레, 당근 이미지 생성 + 랜덤 배치 + 클릭이벤트
function creatImgs() {
  const divRow = document.createElement("div");
  divRow.setAttribute("class", "imgList");
  field.appendChild(divRow);
  for (let i = 0; i < 10; i++) {
    if (i < 7) {
      divRow.insertAdjacentHTML(
        "afterbegin",
        `<img class="bugImg" src="img/bug.png" data-id="${i}"/>`
      );
      randomCoord("bugImg", i);
      createImgEvent("bugImg", bugClicked);
    }
    divRow.insertAdjacentHTML(
      "afterbegin",
      `<img class="carrotImg" src="img/carrot.png" data-id="${i}"/>`
    );
    randomCoord("carrotImg", i);
    createImgEvent("carrotImg", carrotClicked);
  }
}

function randomCoord(imgName, i) {
  const element = document.querySelector(`.${imgName}[data-id="${i}"]`);
  element.style.left = Math.round(Math.random() * field.offsetWidth) + "px";
  element.style.top = Math.round(Math.random() * field.offsetHeight) + "px";
}

function createImgEvent(imgName, imgClicked) {
  const img = document.querySelector(`.${imgName}`);
  let clickCount = 0;
  img.addEventListener("click", (event) => {
    imgClicked();
    img.remove();
    if (event.target.className === "bugImg") {
      document.removeEventListener("mousemove", bugClicked);
    } else if (event.target.className === "carrotImg") {
      console.log("asdf");
    }
  });
}
// 버그 클릭 후 -> 나머지 클릭 x
// 당근 클릭 후 -> 버그 클릭 x

function displayMessage(message) {
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
  displayMessage(`YOU LOST 🤣`);
}

let carrotCount = 10;
function carrotClicked() {
  carrotCount--;
  carrotCounter.innerText = `${carrotCount}`;
  if (carrotCount === 0) {
    displayMessage(`YOU WiN 👍`);
    clearInterval(count);
    carrotCount = 10;
  }
}

// 소리 기능 추가
