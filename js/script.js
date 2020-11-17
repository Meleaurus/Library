const container = document.querySelector("#container");
const header = document.querySelector("#header");
const bookcase = document.querySelector("#bookcase");
const form = document.querySelector("#myForm");
const submitBtn = document.querySelector("#submit");
const cancelBtn = document.querySelector("#cancel");
/* 
button "Add book" with event listener
on press prompt user to enter user info
book object created within event listener 
addbooktolibrary called
addbooktolibrary should take object and append it to arr
and then trigger a display function that loops through arr
display uses Object attributes to fill in the textContent 
CSS designate grid areas for each attribute
*/

const newBtn = document.createElement("button");
newBtn.textContent = "New Book";
newBtn.id = "newBtn";
header.appendChild(newBtn);

newBtn.addEventListener("click", () => {
    document.getElementById("form-container").style.display = "block";
    newBtn.style.display = "none";
})

submitBtn.addEventListener("click", () => {
    console.log(form.author.value);
})

cancelBtn.addEventListener("click", () => {
    newBtn.style.display = "block";
})

closeForm = () => {
    document.getElementById("form-container").style.display = "none";
}

let myLibrary = [];

const display = () => {
    for (i=0; i< myLibrary.length; i++) {
        let book = document.createElement("div");
        book.classList.add("book");
        bookcase.appendChild(book);
        for (const property in myLibrary[i]) {
            let bookInfo = document.createElement("div");
            bookInfo.classList.add("bookInfo");
            bookInfo.textContent = `${property}: ${myLibrary[i][property]}`;
            book.appendChild(bookInfo);
        } 
    }
}

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBooktoLibrary(author, title, pages, read) {
    newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
}

addBooktoLibrary("Melvin", "computer", "25", "read");
addBooktoLibrary("Darren", "yeet", "200", "unread")
console.log(myLibrary);
display();