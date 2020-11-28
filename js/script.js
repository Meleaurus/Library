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
- CSS - figure out container and display: 
- add database??? 
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

let myLibrary = [];

createBook = () => {
    let author = form.author.value;
    if (author === "") {
        author = "None";
    }
    let title = form.title.value;
    if (title === "") {
        title = "None";
    }
    let pages = form.pages.value;
    if (pages === "") {
        pages = 0;
    }
    let readUnread = "";
    if (document.getElementById("read").checked) {
        readUnread = "read";
    } else if (document.getElementById("unread").checked) {
        readUnread = "unread";
    } else {
        readUnread = "unread";
    }
    newBook = new Book(author, title, pages, readUnread);
    myLibrary.push(newBook);
    for (i=index; i< myLibrary.length; i++) {
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
            } else if (property === "readUnread") {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "readCheck";
                checkbox.value = "readCheck";
                checkbox.id = `checkbox${bookIndex}`;
                checkbox.classList.add("readUnreadCheckboxes");
                const label = document.createElement("label");
                label.id = `label${bookIndex}`;
                label.htmlFor = "readCheck";
                label.classList.add("readUnreadLabels")
                if (readUnread === "read") {
                    label.appendChild(document.createTextNode(" Read"));
                    checkbox.checked = true;
                }
                if (readUnread === "unread") {
                    label.appendChild(document.createTextNode(" Unread"));
                    checkbox.checked = false;
                }
                bookInfo.appendChild(checkbox);
                bookInfo.appendChild(label);
                checkbox.addEventListener("change", () => {
                    let box = document.getElementById("checkbox" + book.id);
                    let labelChange = document.getElementById("label" + book.id);
                    labelChange.textContent = "";
                    if (box.checked) {
                        labelChange.appendChild(document.createTextNode(" Read"));
                    } else {
                        labelChange.appendChild(document.createTextNode(" Unread"));
                    }
                })
            } else {
                str = String(property);
                str = str.charAt(0).toUpperCase() + str.slice(1);
                bookInfo.textContent = `${str}: ${myLibrary[i][property]}`;
            }
            book.appendChild(bookInfo);
        } 
        const remove = document.createElement("button");
        remove.classList.add("removeBtn");
        remove.textContent = "Remove";
        remove.id = String(index);
        remove.addEventListener("click", () => {
            let bookRemove = document.getElementById(remove.id);
            let bookRemoveNum = bookRemove.id;
            bookRemove.textContent = "";
            myLibrary.splice(parseInt(bookRemove.id), 1);
            /* after removing book, cycle through myLibrary and adjust the indexes of books and removeBtns */
            bookRemove.removeAttribute("class");
            Array.from(document.querySelectorAll(".readUnreadCheckboxes")).forEach((checkbox) => {
                checkboxNum = parseInt(checkbox.id.slice(8));
                if (checkboxNum > bookRemoveNum) {
                    checkbox.id = `checkbox${checkboxNum - 1}`;
                }
            })
            Array.from(document.querySelectorAll(".readUnreadLabels")).forEach((label) => {
                labelNum = parseInt(label.id.slice(5));
                if (labelNum > bookRemoveNum) {
                    label.id = `label${labelNum - 1}`;
                }
            })
            Array.from(document.querySelectorAll(".removeBtn")).forEach((btn) => {
                btnNum = parseInt(btn.id);
                if (btnNum > bookRemoveNum) {
                    btn.id = `${btnNum -= 1}`;
                }
            })
            Array.from(document.querySelectorAll(".book")).forEach((book) => {
                bookNum = parseInt(book.id);
                if (bookNum > bookRemoveNum) {
                    book.id = `${bookNum -= 1}`;
                }
            })
            remove.remove();
            bookRemove.remove();
            index -= 1;
        })
        book.appendChild(remove);
    }
    index += 1
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

function Book(author, title, pages, readUnread) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readUnread = readUnread;
}


