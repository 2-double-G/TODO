"use strict";

//------------------------------------------------------------
// Show todays date
const DATE = document.querySelector(".date"),
      OPTIONS = { weekday: "long", month: "short", day: "numeric" },
      TODAY = new Date();

DATE.innerHTML = TODAY.toLocaleDateString("en-US", OPTIONS);

//------------------------------------------------------------
// Here will be drag&drop

//------------------------------------------------------------

let id = 0, // List item id
    toDoList = []; // List of items

// Add new item using plus button
const ADD = document.querySelector(".fa-plus"),
      INPUT = document.querySelector(".input");

// Show number of left items
showItemsLeft(toDoList);

// Add new item by clicking on "plus" button
ADD.addEventListener("click", addItem);

// Add new item by pressing on "enter"
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) addItem();
});

//------------------------------------------------------------
const CHECK = "fa-check-circle",
      UNCHECK = "fa-circle",
      DEL = "line-through";

// Add new item in HTML
function insertItem(id, item, done, dlt) {
  // If item was deleted then exit
  if (dlt) return;

  const POSITION = "beforeend",
        LINE = done ? DEL : "",
        DONE = done ? CHECK : UNCHECK;

  let listItem = `<li class="item" id="${id}">
                        <i class="far ${DONE} complete" id="${id}"></i>
                        <p class="text ${LINE}">${item}</p>
                        <i class="fas fa-times delete" id="${id}"></i>
                    </li>
                    `;

  list.insertAdjacentHTML(POSITION, listItem);
}

//------------------------------------------------------------
// Add new item to the list
function addItem() {
  const ITEM = INPUT.value;

  // If there an empty input then exit
  if (!ITEM) return;

  // Add new item to array
  toDoList.push({
    id: id,
    item: ITEM,
    done: false,
    dlt: false, // It's delete
  });
  // Insert in HTML to display
  insertItem(id, ITEM, false, false);

  id++;

  // Clear input
  INPUT.value = "";

  // Counts the number of left items (for place of code where toDoList is updated)
  showItemsLeft(toDoList);

  localStorage.setItem("data", JSON.stringify(toDoList));
}

//------------------------------------------------------------
// When press on complete or delete icon icon
const LI = document.getElementById("list");

LI.addEventListener("click", completeOrDelete);

function completeOrDelete(event) {
  const ITEM = event.target;
  // console.log(this);

  // Make item complete
  if (ITEM.classList.contains("complete")) {
    toDoList[ITEM.id].done = toDoList[ITEM.id].done ? false : true;

    // Swap fa-circle and fa-check-circle
    ITEM.classList.toggle(UNCHECK);
    ITEM.classList.toggle(CHECK);

    // Crosses out the completed element
    ITEM.parentNode.querySelector(".text").classList.toggle(DEL);
  } else if (ITEM.classList.contains("delete")) {
    toDoList[ITEM.id].dlt = true;

    // Remove item from DOM
    ITEM.parentNode.parentNode.removeChild(ITEM.parentNode);
  }
  // Counts the number of left items (for place of code where toDoList is updated)
  localStorage.setItem("data", JSON.stringify(toDoList));
  showItemsLeft(toDoList);
}

//------------------------------------------------------------
// Counts number of left items
function showItemsLeft(arr) {
  let current = arr.filter(
    (item) => (item.done === false) & (item.dlt === false)
  ).length;

  let string = current == 1 ? " item" : " items";

  document.getElementById("item-left").innerHTML = current + string;
}

//------------------------------------------------------------
// Filter to display active or complete or all items
const SHOW_BUTTON = document.querySelector(".buttons");

SHOW_BUTTON.addEventListener("click", showFiltred);

function showFiltred(event) {
  const BUTTON = event.target,
        ITEMS = document.querySelectorAll(".item"),
        HIDE = "hide"

  // Get completed items (or no not active)
  const noActive = Array.from(ITEMS).filter(
    (item) => !toDoList[item.id].done === false
  );

  // Get active items (or no not completed)
  const noCompleted = Array.from(ITEMS).filter(
    (item) => !toDoList[item.id].done === true
  );

  if (BUTTON.classList.contains("all")) {

    ITEMS.forEach((item) => item.classList.remove(HIDE));

  } else if (BUTTON.classList.contains("active")) {

    noActive.forEach((item) => item.classList.add(HIDE));
    noCompleted.forEach((item) => item.classList.remove(HIDE));

  } else if (BUTTON.classList.contains("completed")) {

    noCompleted.forEach((item) => item.classList.add(HIDE));
    noActive.forEach((item) => item.classList.remove(HIDE));

  }
}

//------------------------------------------------------------
// Local storage
let data = localStorage.getItem("data");

// When page is reloaded
if (data) {
  toDoList = JSON.parse(data);
  id = toDoList.length;

  toDoList.forEach((item) => {
    insertItem(item.id, item.item, item.done, item.dlt);
  });
} else {
  toDoList = [];
  id = 0;
}