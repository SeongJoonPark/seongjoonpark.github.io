
const PENDING_KEY = "PENDING";
const FINISHED_KEY = "FINISHED";

const addForm = document.querySelector(".js-addForm");
const addInput = addForm.querySelector("input");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

let pendingListModel = [];
let finishedListModel = [];

function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function cleanList(delTarget) {
  pendingListModel = pendingListModel.filter(target => {
    return target.id !== delTarget.id;
  });

  finishedListModel = finishedListModel.filter(target => {
    return target.id !== delTarget.id;
  });
}

function handleDelBtn(event) {
  let delTarget = event.target.parentNode;
  delTarget.parentNode.removeChild(delTarget);
  cleanList(delTarget);
  saveToLocalStorage();
}

function moveList(moveTarget) {
  let prevLength = pendingListModel.length;

  pendingListModel = pendingListModel.filter(target => {
    return target.id !== moveTarget.id;
  });

  finishedListModel = finishedListModel.filter(target => {
    return target.id !== moveTarget.id;
  });

  let pendingDirty;
  if (prevLength !== pendingListModel.length) {
    pendingDirty = true;
  } else {
    pendingDirty = false;
  }

  if (pendingDirty) {
    finishedListModel.push({
      id: moveTarget.id,
      text: moveTarget.querySelector("span").innerText
    });
    finishedList.appendChild(moveTarget);
  } else {
    pendingListModel.push({
      id: moveTarget.id,
      text: moveTarget.querySelector("span").innerText
    });
    pendingList.appendChild(moveTarget);
  }
}

function handleMoveBtn(event) {
  let moveTarget = event.target.parentNode;
  moveTarget.parentNode.removeChild(moveTarget);
  moveList(moveTarget);
  saveToLocalStorage();
}

function initDOM(parentElement, model) {
  for (let iter of model) {
    let li = document.createElement("li");
    let delBtn = document.createElement("button");
    let moveBtn = document.createElement("button");
    let span = document.createElement("span");
    span.innerText = iter.text + " ";
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", handleDelBtn);
    moveBtn.innerText = "Move";
    moveBtn.addEventListener("click", handleMoveBtn);
    li.id = iter.id;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(moveBtn);
    parentElement.appendChild(li);
  }
}

function loadFromLocalStorage() {
  let model = localStorage.getItem(PENDING_KEY);
  if (model !== null) {
    pendingListModel = JSON.parse(model);
  }
  model = localStorage.getItem(FINISHED_KEY);
  if (model !== null) {
    finishedListModel = JSON.parse(model);
  }
  initDOM(pendingList, pendingListModel);
  initDOM(finishedList, finishedListModel);
}

function saveToLocalStorage() {
  localStorage.setItem(PENDING_KEY, JSON.stringify(pendingListModel));
  localStorage.setItem(FINISHED_KEY, JSON.stringify(finishedListModel));
}

function handleAddTask(addInputValue) {
  const dataObj = { id: createUUID(), text: addInputValue };
  pendingListModel.push(dataObj);
  saveToLocalStorage(PENDING_KEY, pendingList);

  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  const span = document.createElement("span");
  span.innerText = dataObj.text + " ";
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", handleDelBtn);
  moveBtn.innerText = "⚠️";
  moveBtn.addEventListener("click", handleMoveBtn);
  li.id = dataObj.id;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  pendingList.appendChild(li);
}

function init() {
  loadFromLocalStorage();
  addForm.addEventListener("submit", event => {
    event.preventDefault();
    handleAddTask(addInput.value);
    addInput.value = "";
  });
}

init();