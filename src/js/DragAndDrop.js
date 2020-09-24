//------------------------------------------------------------
// Drag & Drop
let items = document.querySelectorAll(".item"),
    dropzone = document.querySelector("ul"),
    referenceElement, // The node before which selectedItem is inserted
    selectedItem; // The node to be inserted

// Drag & drop for selcted item
items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragover", dragOver);
  item.addEventListener("dragend", dragEnd);
  item.addEventListener("dragleave", dragLeave);
});

// Drag & drop for list of items
// When a dragged item is being dragged over a valid drop target
dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  referenceElement = event.target;
});

// When an item is dropped on a valid drop target
dropzone.addEventListener("drop", (event) => {
  event.preventDefault();

  if (!referenceElement.classList.contains("item")) {
    dropzone.appendChild(selectedItem); // If the user wanna move item to the end of the list
  } else {
    dropzone.insertBefore(selectedItem, referenceElement);
  }

  selectedItem.classList.remove("hide-drop");
  resetStyle.call(referenceElement);
});

// When the user starts dragging an item
function dragStart() {
  selectedItem = this;

  // For pretty animation
  setTimeout(() => {
    selectedItem.classList.add("hide-drop");
  }, 0);
  setTimeout(() => {
    dropzone.removeChild(selectedItem);
  }, 300);
}

// When a dragged item is being dragged over a valid drop target
function dragOver() {
  event.preventDefault();

  // The center of the item
  let yTop = this.getBoundingClientRect().top,
      yBottom = this.getBoundingClientRect().bottom;
  let center = yTop + (yBottom - yTop) / 2;

  // Shows free space
  if (event.clientY > center) {
    showFreeSpace.call(this);
  }
}

// When a drag operation ends
function dragEnd() {
  event.preventDefault();
}

// When a dragged item leaves a valid drop target
function dragLeave() {
  event.preventDefault();
  resetStyle.call(referenceElement);
}

function showFreeSpace() {
  this.style.marginTop = "30px";
  this.style.transition = "0.3s";
}

function resetStyle() {
  referenceElement.style.marginTop = "10px";
}
