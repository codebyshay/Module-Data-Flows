let myLibrary = [];

const titleInputEl = document.getElementById("title");
const authorInputEl = document.getElementById("author");
const pagesInputEl = document.getElementById("pages");
const isReadInputEl = document.getElementById("check");
const submitBookBtnEl = document.getElementById("submit-book-btn");
const displayTableEl = document.getElementById("display");

window.addEventListener("load", function () {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function  function submit() {function submit() {
function submit() {
  const normalizedTitle = titleInputEl.value.trim();
  const normalizedAuthor = authorInputEl.value.trim();
  const pagesCount = Number(pagesInputEl.value);

  if (
    normalizedTitle === "" ||
    normalizedAuthor === "" ||
    !Number.isInteger(pagesCount) ||
    pagesCount <= 0
  ) {
    alert(
      "Please fill all fields correctly. Title and author are required, and page count must be a positive whole number."
    );
    return false;
  } else {
    let book = new Book(
      normalizedTitle,
      normalizedAuthor,
      pagesCount,
      isReadInputEl.checked
    );
    myLibrary.push(book);
    render();

    titleInputEl.value = "";
    authorInputEl.value = "";
    pagesInputEl.value = "";
    isReadInputEl.checked = false;
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const tableBodyEl = displayTableEl.tBodies[0];
  tableBodyEl.replaceChildren();

  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = tableBodyEl.insertRow();
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = String(myLibrary[i].pages);

    //add and wait for action for read/unread button
    let toggleReadButton = document.createElement("button");
    toggleReadButton.className = "btn btn-success";
    wasReadCell.appendChild(toggleReadButton);
    toggleReadButton.textContent = myLibrary[i].check === false ? "No" : "Yes";

    toggleReadButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    let deleteButton = document.createElement("button");
    deleteCell.appendChild(deleteButton);
    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${deletedTitle}`);
    });
  }
}
