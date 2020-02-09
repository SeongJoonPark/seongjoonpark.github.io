const DECIMAL = 10;
const div = document.querySelector(".js-randomNumDiv");
const rangeText = div.querySelector(".js-rangeText");
const rangeInput = div.querySelector(".js-rangeInput");
const userInput = div.querySelector(".js-userInput");
const playBtn = div.querySelector(".js-playBtn");
const infoText = div.querySelector(".js-infoText");
const gameResultText = div.querySelector(".js-gameResultText");

function generateMachineChose(value) {
  return Math.ceil(Math.random() * value);
}

function handlePlayBtn() {
  const rangeInputValue = parseInt(rangeInput.value, DECIMAL);
  const userInputValue = parseInt(userInput.value, DECIMAL);
  const machineChoseValue = generateMachineChose(rangeInputValue);
  infoText.innerHTML = `You chose: ${userInputValue}, the machine chose: ${machineChoseValue}`;
  if (userInputValue === machineChoseValue) {
    gameResultText.innerHTML = "You won!";
  } else {
    gameResultText.innerHTML = "You lost!";
  }
}

function handleRangeInput(event) {
  const maxValue = event.target.value;
  rangeText.innerHTML = `Generate a number between 0 and ${maxValue}`;
}

function init() {
  rangeInput.addEventListener("input", handleRangeInput);
  playBtn.addEventListener("click", handlePlayBtn);
}

init();
