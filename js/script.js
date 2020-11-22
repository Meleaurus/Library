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

TODO
- fix the indexes of each book after one book has been removed
like if book0 removed, book1 is the new book0

*/

const newBtn = document.createElement("button");
newBtn.textContent = "New Book";
newBtn.id = "newBtn";
header.appendChild(newBtn);

newBtn.addEventListener("click", () => {
    document.getElementById("form-container").style.display = "block";
    newBtn.style.display = "none";
})

let index = container.dataset.index;
index = 0;

createBook = () => {
    let author = form.author.value;
    let title = form.title.value;
    let pages = form.pages.value;
    let readUnread = "";
    if (document.getElementById("read").checked) {
        readUnread = "read";
    }
    if (document.getElementById("unread").checked) {
        readUnread = "unread";
    }
    newBook = new Book(author, title, pages, readUnread);
    myLibrary.push(newBook);
    display();
}

let myLibrary = [];

const display = () => {
    for (i=index; i< myLibrary.length; i++) {
        console.log(myLibrary.length);
        let book = document.createElement("div");
        let bookIndex = index;
        book.classList.add("book");
        book.id = String(bookIndex);
        bookcase.appendChild(book);
        for (const property in myLibrary[i]) {
            let bookInfo = document.createElement("div");
            bookInfo.classList.add("bookInfo");
            if (property === "pages") {
                str = String(property); 
                str = str.charAt(0).toUpperCase() + str.slice(1);
                bookInfo.textContent = `${str}: ${myLibrary[i][property]}`;
            } else if (property === "read") {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "readCheck";
                checkbox.value = "readCheck";
                checkbox.id = "readCheck";
                const label = document.createElement("label");
                label.id = "readCheckLabel";
                label.htmlFor = "readCheck";
                if (document.getElementById("read").checked) {
                    label.appendChild(document.createTextNode("Read: "));
                    checkbox.checked = true;
                }
                if (document.getElementById("unread").checked) {
                    label.appendChild(document.createTextNode("Unread: "));
                    checkbox.checked = false;
                }
                bookInfo.appendChild(checkbox);
                bookInfo.appendChild(label);
            } else {
                bookInfo.textContent = `${myLibrary[i][property]}`;
            }
            book.appendChild(bookInfo);
        } 
        const remove = document.createElement("button");
        remove.class = "removeBtn";
        remove.textContent = "Remove";
        remove.id = String(index);
        remove.addEventListener("click", () => {
            let bookRemove = document.getElementById(remove.id);
            console.log(bookRemove);
            bookRemove.textContent = "";
            console.log(myLibrary + "before");
            console.log(parseInt(bookRemove.id));
            myLibrary.splice(parseInt(bookRemove.id), 1);
            /* after removing book, cycle through myLibrary and adjust the indexes of books */
            myLibrary.forEach( (book) => {
                /* bookNum NaN */
                bookNum = parseInt(book.id);
                bookRemoveNum = parseInt(bookRemove.id);
                console.log(bookNum +"bookNum");
                console.log(bookRemoveNum +"removedNum");
                if (bookNum > bookRemoveNum) {
                    book.id = `${bookNum -= 1}`;
                }
            })
            bookRemove.removeAttribute("id");
            bookRemove.removeAttribute("class");
            bookRemove.remove();
            console.log(myLibrary + "after");
            console.log(bookRemove);
            index -= 1;
        })
        book.appendChild(remove);
    }
    index += 1
    /* add removeBtn here if 1st attempt doesnt work (prolly wont) */
}

submitBtn.addEventListener("click", () => {
    createBook();
    closeForm();
    newBtn.style.display = "block";
})

cancelBtn.addEventListener("click", () => {
    closeForm();
    newBtn.style.display = "block";
})

closeForm = () => {
    document.getElementById("form-container").style.display = "none";
    form.author.value = "";
    form.title.value = "";
    form.pages.value = "";
    if (document.getElementById("read").checked) {
        document.getElementById("read").checked = false;
    }
    if (document.getElementById("unread").checked) {
        document.getElementById("unread").checked = false;
    }
}
/*
removeBtn = document.querySelectorAll(".removeBtn")
removeBtn.forEach((btn) => {
    btn.addEventListener("click", e => {
        let book = e.target;
        console.log(book.dataset.index);
        console.log("book");
    })
})
*/
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}


