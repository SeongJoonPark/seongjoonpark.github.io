const USER_LS = "currentUser";
const SHOWING_CN = "showing";

const userNameDiv = document.querySelector(".js-userNameDiv");
const userNameForm = userNameDiv.querySelector(".js-userNameForm")
const userNameInput = userNameDiv.querySelector(".js-userNameInput")
const userNameTextElement = userNameDiv.querySelector(".js-greetings");


function saveName (name) {
    localStorage.setItem(USER_LS,name);
}

function handleSubmit(event) {
    event.preventDefault();
    const nameValue = userNameInput.value;
    paintGreetings(nameValue);
    saveName(nameValue);
}

function askForName() {
    userNameForm.classList.add(SHOWING_CN);
    userNameForm.addEventListener("submit", handleSubmit);
}

function paintGreetings(userName) {
    userNameForm.classList.remove(SHOWING_CN);
    userNameTextElement.classList.add(SHOWING_CN);
    userNameTextElement.innerHTML = `Hello ${userName}!`
}

function loadName () {
    const userName = localStorage.getItem(USER_LS);
    if (userName === null) {
        askForName();
    }
    else {
        paintGreetings(userName);
    }
}

function init() {
    loadName();
}
init();