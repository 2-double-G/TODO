"use strict";

// Show todays date
const DATE = document.querySelector(".date"),
      OPTIONS = { weekday: "long", month: "short", day: "numeric" },
      TODAY = new Date();

DATE.innerHTML = TODAY.toLocaleDateString("en-US", OPTIONS);

//------------------------------------------------------------
// Here will be drag&drop


//------------------------------------------------------------

// Add new item using plus button
const ADD = document.querySelector(".fa-plus"),
      INPUT = document.querySelector(".input");

let id = 0, // List item id
    toDoList = []; // List of items

document.addEventListener("click", addItem);

// Add new item by pressing on "enter"
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) addItem ();
})

//------------------------------------------------------------
// Add new item in HTML
function insertItem (id, item, done, dlt) {
    // If item was deleted then exit
    if (dlt) return;

    const POSITION = "beforeend";    


    let listItem = `<li class="item">
                        <i class="fa fa-circle-thin co" job="complete" id="${id}"></i>
                        <p class="text">${item}</p>
                        <i class="fas fa-times del" job="delete" id="${id}"></i>
                    </li>
                    `;

    list.insertAdjacentHTML(POSITION, listItem);
}

//------------------------------------------------------------
// Add new item to the list
function addItem () {
    const ITEM = INPUT.value;

    // If there an empty input then exit
    if (!ITEM) return;

    // Add new item to array
    toDoList.push({
        id: id,
        item: ITEM,
        done: false,
        dlt: false // It's delete
    });
    // Insert in HTML to display
    insertItem(id, ITEM, false, false);
    
    id++;
    // Clear input
    INPUT.value = ""
}

//------------------------------------------------------------
