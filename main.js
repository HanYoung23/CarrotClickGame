// 벌레, 당근 이미지 랜덤 배치 기능
// 벌레, 당근 클릭 기능
// 당근 카운트 + 출력
// 상태 창 기능
// 리플레이 버튼 기능

const playBtn = document.querySelector(".fa-play");
const timerAlarm = document.querySelector(".timer");
const counter = document.querySelector(".carrotCounter");
const field = document.querySelector(".field");
const alert = document.querySelector(".alert");
const replayBtn = document.querySelector(".fa-redo-alt");
const message = document.querySelector(".message");
const bugImg = document.querySelector(".bugImg");
const carrotImg = document.querySelector(".carrotImg");

// 플레이 버튼 기능 - 누르고 난 후 사라짐
playBtn.addEventListener("click", () => {
  displayBugs();
  displayCarrots();
  countDown();
});

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

function gameStart() {
  // 벌레, 당근 이미지 랜덤 배치 기능
}
