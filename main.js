// 벌레, 당근 클릭 기능
// 당근 카운트 + 출력
const header = document.querySelector(".header");
const playBtn = document.querySelector(".fa-play");
const pauseBtn = document.querySelector(".fa-search");
const timerAlarm = document.querySelector(".timer");
const counter = document.querySelector(".carrotCounter");
const field = document.querySelector(".field");
const alert = document.querySelector(".alert");
const replayBtn = document.querySelector(".fa-redo-alt");
const message = document.querySelector(".message");
const bugImg = document.querySelectorAll(".bugImg");
const carrotImg = document.querySelectorAll(".carrotImg");

// 게임 실행 시 기능
function playGame() {
  changeBtn(); // 플레이 버튼 사라지고 정지버튼 출력
  countDown(); // 카운트 다운 + 카운트 끝나면 패배 창 출력////
  creatImgs(); // 이미지들 출력 + 랜덤 기능 추가 ////
  //carrotCount(); // 당근 갯수 파악 + 0되면 승리 창 출력 ////
}

// 플레이 버튼 동작
playBtn.addEventListener("click", playGame);

// 플레이 버튼 교체
function changeBtn() {
  header.insertAdjacentHTML("afterbegin", `<i class="fas fa-square"></i>`);
  playBtn.style.display = "none";
}

// 타이머 기능(출력)
function countDown() {
  let i = 10;
  (function count() {
    timerAlarm.innerText = `0 : ${i}`;
    if (i > 0) {
      setTimeout(count, 1000);
    }
    i--;
  })();
}

// 벌레, 당근 이미지 생성 + 랜덤 배치 기능
function creatImgs() {
  for (let i = 0; i < 10; i++) {
    if (i < 7) {
      field.insertAdjacentHTML(
        "afterbegin",
        `<img class="bugImg" src="img/bug.png" data-id="${i}"/>`
      );
      randomCoord("bugImg", i);
    }
    field.insertAdjacentHTML(
      "afterbegin",
      `<img class="carrotImg" src="img/carrot.png" data-id="${i}"/>`
    );
    randomCoord("carrotImg", i);
  }
}
function randomCoord(imgName, i) {
  const element = document.querySelector(`.${imgName}[data-id="${i}"]`);
  element.style.left = Math.round(Math.random() * field.offsetWidth) + "px";
  element.style.top = Math.round(Math.random() * field.offsetHeight) + "px";
}

// 각 이미지들에 속성 부여
function bugclicked() {
  console.log("asdf");
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
    replayBtn.addEventListener("click", playGame, false);
  }
}
displayMessage("You Win or lost");
