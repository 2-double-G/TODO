"use strict";

// Drag & Drop
//------------------------------------------------------------
let dropzone = document.getElementById("list"),
    referenceElement, // The node before which selectedItem is inserted
    selectedItem; // The node to be inserted

// When the user starts dragging an item
dropzone.addEventListener("dragstart", dragStart);

// When a dragged item is being dragged over a valid drop target
dropzone.addEventListener("dragover", dragOver);

// When an item is dropped on a valid drop target
dropzone.addEventListener("drop", dragAndDrop);

// When a dragged item leaves a valid drop target
dropzone.addEventListener("dragleave", dragleave);

function dragStart(event) {
  selectedItem = document.getElementById(event.target.id);

  // For pretty "hide" animation
  setTimeout(() => {
    selectedItem.classList.add("hide-drop");
  }, 0);
  setTimeout(() => {
    dropzone.removeChild(selectedItem);
  }, 300);
}

function dragOver(event) {
  event.preventDefault();

  referenceElement = document.getElementById(event.target.id);
  // Center of the current item
  let center = centerOfTheItem(referenceElement);

  // Shows free space above the element
  if (event.clientY > center) {
    showFreeSpace.call(referenceElement);
  }
}

function dragleave() {
  // Hides free space above the element
  resetStyle.call(referenceElement);
}

function showFreeSpace() {
  this.style.marginTop = "30px";
  this.style.transition = "0.3s";
}

function dragAndDrop() {
  if (!referenceElement.classList.contains("item")) {
    dropzone.appendChild(selectedItem); // If the user wanna move item to the end of the list
  } else {
    dropzone.insertBefore(selectedItem, referenceElement);
  }

  selectedItem.classList.remove("hide-drop");
  resetStyle.call(referenceElement);
}

function resetStyle() {
  this.style.marginTop = "10px";
}

function centerOfTheItem(item) {
  let yTop = item.getBoundingClientRect().top;
  let yBottom = item.getBoundingClientRect().bottom;

  return (yTop + (yBottom - yTop) / 2);
}
