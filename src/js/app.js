"use strict";

// Show todays date
const DATE = document.querySelector(".date"),
      OPTIONS = { weekday: "long", month: "short", day: "numeric" },
      TODAY = new Date();

DATE.innerHTML = TODAY.toLocaleDateString("en-US", OPTIONS);

//------------------------------------------------------------
// Here will be drag&drop



//------------------------------------------------------------
// Add new item in HTML
function insertItem (id, item, done, del) {
    // If item was deleted then skip
    if (del) return;

    const POSITION = "beforeend";
    
    let listItem = `<li class="item">
             <i class="far ${DONE} co" job="complete" id="${id}"></i>
             <p class="text ${LINE}">${item}</p>
             <i class="fas fa-times del" job="delete" id="${id}"></i>
           </li>
           `;

    list.insertAdjacentHTML(POSITION, listItem);
}

//------------------------------------------------------------
// Add new item using plus button

const ADD = document.querySelector(".fa-plus");

let id = 0;

document.addEventListener("click", function() {
    console.log(1);
})

function addItem () {
    
}