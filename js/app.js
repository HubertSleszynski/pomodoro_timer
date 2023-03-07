const minutes = document.querySelector(".clock__part--minutes");
const seconds = document.querySelector(".clock__part--seconds");
const control = document.querySelector(".buttons__control");
const reset = document.querySelector(".buttons__reset");
const add60 = document.querySelector(".buttons__add60");
const add5 = document.querySelector(".buttons__add5");
const remove60 = document.querySelector(".buttons__remove60");
const remove5 = document.querySelector(".buttons__remove5");
const bell = document.getElementById("audioBell");
const btnClicked = document.getElementById("btn-click");

let interval = null;
let timeInSeconds = 1500;
let remainingSeconds = timeInSeconds;

updateInterfaceTime();
updateInterfaceControls();

control.addEventListener("click", () => {
  btnClicked.play();
  if (interval === null) {
    start();
  } else {
    stop();
  }
});

reset.addEventListener("click", () => {
  btnClicked.play();
  stop();
  remainingSeconds = timeInSeconds;
  updateInterfaceTime();
});

add60.addEventListener("click", () => {
  btnClicked.play();
  remainingSeconds += 60;
  updateInterfaceTime();
});
add5.addEventListener("click", () => {
  btnClicked.play();
  remainingSeconds += 5;
  updateInterfaceTime();
});
remove60.addEventListener("click", () => {
  btnClicked.play();
  if (remainingSeconds >= 60) {
    remainingSeconds -= 60;
  }
  updateInterfaceTime();
});
remove5.addEventListener("click", () => {
  btnClicked.play();
  if (remainingSeconds >= 5) {
    remainingSeconds -= 5;
  }
  updateInterfaceTime();
});

function updateInterfaceTime() {
  let minutesSplitted = Math.floor(remainingSeconds / 60);
  if (remainingSeconds >= 60) {
    let secondsSplitted = remainingSeconds % 60;
    minutes.textContent = minutesSplitted.toString().padStart(2, "0");
    seconds.textContent = secondsSplitted.toString().padStart(2, "0");
  } else {
    seconds.textContent = remainingSeconds.toString().padStart(2, "0");
    minutes.textContent = minutesSplitted.toString().padStart(2, "0");
  }
}

function updateInterfaceControls() {
  if (interval === null) {
    control.innerHTML = `<span class="material-icons">play_arrow</span>`;
  } else {
    control.innerHTML = `<span class="material-icons">pause</span>`;
  }
}

function start() {
  if (remainingSeconds === 0) return;

  interval = setInterval(() => {
    remainingSeconds--;
    updateInterfaceTime();

    if (remainingSeconds === 0) {
      stop();
      bell.play();
    }
  }, 1000);
  updateInterfaceControls();
}

function stop() {
  clearInterval(interval);
  interval = null;
  updateInterfaceControls();
}
