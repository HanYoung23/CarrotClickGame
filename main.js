// 당근 카운트 + 출력

const header = document.querySelector(".header");
const headerBtn = document.querySelector(".headerBtn");
const playBtn = document.querySelector(".fa-play");
//const pauseBtn = document.querySelector(".fa-square");
const timerAlarm = document.querySelector(".timer");
const counter = document.querySelector(".carrotCounter");
const field = document.querySelector(".field");
const resultAlert = document.querySelector(".alert");
//const replayBtn = document.querySelector(".fa-redo-alt");
//const imgList = document.querySelector(".imgList");
const message = document.querySelector(".message");
const bugImg = document.querySelector(".bugImg");
const carrotImg = document.querySelector(".carrotImg");

// 게임 실행 시 기능
function playGame() {
  removeImgs();
  changeBtn(); // 플레이 버튼 사라지고 정지버튼 출력
  //countDown(); // 카운트 다운 + 카운트 끝나면 패배 창 출력////
  creatImgs(); // 이미지들 출력 + 랜덤 기능 추가 ////
  //carrotCount(); // 당근 갯수 파악 + 0되면 승리 창 출력 ////
  let time = 5;
  const count = setInterval(() => {
    if (time > -1) {
      timerAlarm.innerText = `0 : ${time}`;
    } else if (time === -1) {
      displayMessage(`YOU LOST 🤣`);
      clearInterval(count);
    }
    time--;
  }, 1000);
}

// 플레이 버튼 동작
playBtn.addEventListener("click", playGame);

// 플레이 버튼 교체
function changeBtn() {
  headerBtn.insertAdjacentHTML("afterbegin", `<i class="fas fa-square"></i>`);
  playBtn.remove();
}

// 타이머 기능(출력)
// 알림 창 점멸 시
//function countDown() {
/*
let time = 5;
const count = setInterval(() => {
  if (time > -1) {
    timerAlarm.innerText = `0 : ${time}`;
  } else if (time === -1) {
    displayMessage(`YOU LOST 🤣`);
    clearInterval(count);
  }
  time--;
}, 1000);
*/
//}
//
//
// 벌레, 당근 이미지 생성 + 랜덤 배치 기능
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
      const bugImg = document.querySelector(".bugImg");
      if (bugImg) {
        bugImg.addEventListener("click", bugClicked);
      }
    }
    divRow.insertAdjacentHTML(
      "afterbegin",
      `<img class="carrotImg" src="img/carrot.png" data-id="${i}"/>`
    );
    const carrotImg = document.querySelector(".carrotImg");
    if (carrotImg) {
      carrotImg.addEventListener("click", carrotClicked);
    }
    randomCoord("carrotImg", i);
  }
}
function randomCoord(imgName, i) {
  const element = document.querySelector(`.${imgName}[data-id="${i}"]`);
  element.style.left = Math.round(Math.random() * field.offsetWidth) + "px";
  element.style.top = Math.round(Math.random() * field.offsetHeight) + "px";
}

// 메세지 출력 창 + 리플레이 버튼 기능
function displayMessage(message) {
  field.insertAdjacentHTML(
    "afterbegin",
    `<div class="alert">
  <i class="fas fa-redo-alt"></i>
  <div class="message">${message}</div>
</div>`
  );
  const replayBtn = document.querySelector(".fa-redo-alt");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      replayBtn.parentNode.remove();
      playGame();
    });
  }
  const pauseBtn = document.querySelector(".fa-square");
  if (pauseBtn) {
    pauseBtn.remove();
  }
}

// 벌레 클릭 기능
function bugClicked() {
  displayMessage(`YOU LOST 🤣`);
  this.remove();
}

// 당근 클릭 기능
function carrotClicked() {
  console.log("asdf");
}

// 기존 벌레, 당근 이미지 제거
function removeImgs() {
  const imgList = document.querySelector(".imgList");
  if (imgList) {
    imgList.remove();
  }
}

// 타이머 멈추기 부터
