const clockTextElement = document.querySelector(".js-clock");
const xmasclockTextElement = document.querySelector(".js-xmasClock");

function refreshClock() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    clockTextElement.innerText = `${hour<10 ? `0${hour}` : hour}:${min<10 ? `0${min}` : min}:${sec<10 ? `0${sec}` : sec}`;
}

function refreshXmasDay() {
  const xmasDay = new Date("2020-12-25:00:00:00+0900");

  let thisDate = new Date();
  let untilXmasMilliSec = xmasDay.getTime() - thisDate.getTime();
  let untilXmasSec = Math.floor(untilXmasMilliSec / 1000);
  let sec = untilXmasSec % 60;
  let min = Math.floor(((untilXmasSec - sec) % 3600) / 60);
  let hour = Math.floor(((untilXmasSec - sec - min) % 86400) / 3600);
  let day = Math.floor((untilXmasSec - sec - min - hour) / 86400);

  xmasclockTextElement.innerHTML = `${day >= 100 ? day : day >= 10 ? `0${day}` : `00${day}`}d ${
    hour >= 10 ? hour : `0${hour}`
  }h ${min >= 10 ? min : `0${min}`}m ${sec >= 10 ? sec : `0${sec}`}s`;
}

function init() {
    refreshClock();
    setInterval(refreshClock,1000);
    refreshXmasDay();
    setInterval(refreshXmasDay,1000);
}

init();