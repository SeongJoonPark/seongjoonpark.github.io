const clockTextElement = document.querySelector(".js-clock");

function refreshClock() {
    const date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    clockTextElement.innerText = `${hour<10 ? `0${hour}` : hour} :${min<10 ? `0${min}` : min}:${sec<10 ? `0${sec}` : sec}`;
}



function init() {
    refreshClock();
    setInterval(refreshClock,1000);
}

init();