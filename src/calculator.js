const NUM_TYPE = 0;
const OPERATOR_TYPE = 1;

let stack = [{ type: NUM_TYPE, value: 0 }];
let equalFlag = false;
const calculatorDiv = document.querySelector(".js-calculatorDiv");
const btn7 = calculatorDiv.querySelector(".js-btn7");
const btn8 = calculatorDiv.querySelector(".js-btn8");
const btn9 = calculatorDiv.querySelector(".js-btn9");
const btn4 = calculatorDiv.querySelector(".js-btn4");
const btn5 = calculatorDiv.querySelector(".js-btn5");
const btn6 = calculatorDiv.querySelector(".js-btn6");
const btn1 = calculatorDiv.querySelector(".js-btn1");
const btn2 = calculatorDiv.querySelector(".js-btn2");
const btn3 = calculatorDiv.querySelector(".js-btn3");
const btn0 = calculatorDiv.querySelector(".js-btn0");
const btnAdd = calculatorDiv.querySelector(".js-btnAdd");
const btnSubtract = calculatorDiv.querySelector(".js-btnSubtract");
const btnMultifly = calculatorDiv.querySelector(".js-btnMultifly");
const btnDivide = calculatorDiv.querySelector(".js-btnDivide");
const btnEqual = calculatorDiv.querySelector(".js-btnEqual");
const btnC = calculatorDiv.querySelector(".js-btnC");
const calcResultText = calculatorDiv.querySelector(".js-calcResultText");

function calculate(lValue, operator, rValue) {
  let result = 0;
  switch (operator) {
    case "+":
      result = lValue + rValue;
      break;
    case "-":
      result = lValue - rValue;
      break;
    case "*":
      result = lValue * rValue;
      break;
    case "/":
      result = lValue / rValue;
      break;
    default:
      console.log("Somthing wrong");
      break;
  }
  return Math.floor(result * 100000) / 100000;
}

function handleNumBtn(event) {
  if (equalFlag) {
    stack = [{ type: NUM_TYPE, value: 0 }];
    calcResultText.innerText = 0;
    equalFlag = false;
  }
  let targetValue = event.target.innerText;
  console.log(targetValue);
  if (stack[stack.length - 1].type === NUM_TYPE) {
    //ex) 02
    stack[stack.length - 1].value *= 10;
    stack[stack.length - 1].value += parseFloat(targetValue);
    calcResultText.innerText = stack[stack.length - 1].value;
  } else {
    //ex)0*2
    calcResultText.innerText = targetValue;
    stack.push({ type: NUM_TYPE, value: parseFloat(targetValue) });
  }
}

function handleOperatorBtn(event) {
  if (equalFlag) {
    stack = [{ type: NUM_TYPE, value: parseFloat(calcResultText.innerText) }];
    equalFlag = false;
  }
  let targetValue = event.target.innerText;
  console.log(targetValue);
  if (stack[stack.length - 1].type === NUM_TYPE) {
    if (stack.length === 1) {
      // ex) 2*
      stack.push({ type: OPERATOR_TYPE, value: targetValue });
    } else {
      // ex) 2*3*
      const calcValue = calculate(
        stack[0].value,
        stack[1].value,
        stack[2].value
      );
      stack = [
        { type: NUM_TYPE, value: calcValue },
        { type: OPERATOR_TYPE, value: targetValue }
      ];
      calcResultText.innerText = calcValue;
    }
  } else {
    //ex) 2*-
    stack.pop();
    stack.push({ type: OPERATOR_TYPE, value: targetValue });
  }
}

function handleEqualBtn(event) {
  console.log("=");
  equalFlag = true;
  if (stack.length === 1) {
    //ex) 0= : do nothing
  } else if (stack[stack.length - 1].type === OPERATOR_TYPE) {
    //ex) 2*=
    const origValue = stack[0].value;
    let calcValue = calculate(origValue, stack[1].value, origValue);
    stack[0].value = calcValue;
    stack.push({ type: NUM_TYPE, value: origValue });
    calcResultText.innerText = calcValue;
  } else if (stack[stack.length - 1].type === NUM_TYPE) {
    //ex) 2*3=
    let calcValue = calculate(stack[0].value, stack[1].value, stack[2].value);
    stack[0].value = calcValue;
    calcResultText.innerText = calcValue;
  } else {
    console.log("Somthing Wrong by Equal");
  }
}

function handleBtnC(event) {
  console.log(event.target.innerText);
  stack = [{ type: NUM_TYPE, value: 0 }];
  calcResultText.innerText = "0";
}

function init() {
  btn7.addEventListener("click", handleNumBtn);
  btn8.addEventListener("click", handleNumBtn);
  btn9.addEventListener("click", handleNumBtn);
  btn4.addEventListener("click", handleNumBtn);
  btn5.addEventListener("click", handleNumBtn);
  btn6.addEventListener("click", handleNumBtn);
  btn1.addEventListener("click", handleNumBtn);
  btn2.addEventListener("click", handleNumBtn);
  btn3.addEventListener("click", handleNumBtn);
  btn0.addEventListener("click", handleNumBtn);
  btnAdd.addEventListener("click", handleOperatorBtn);
  btnSubtract.addEventListener("click", handleOperatorBtn);
  btnMultifly.addEventListener("click", handleOperatorBtn);
  btnDivide.addEventListener("click", handleOperatorBtn);
  btnEqual.addEventListener("click", handleEqualBtn);
  btnC.addEventListener("click", handleBtnC);
}

init();
