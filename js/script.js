const container = document.querySelector("#container");
const header = document.querySelector("#header");
const bookcase = document.querySelector("#bookcase");
const newBtn = document.getElementById("newBtn");
const form = document.querySelector("#myForm");
const submitBtn = document.querySelector("#submit");
const cancelBtn = document.querySelector("#cancel");
const formContainer = document.getElementById("form-container");
let index = 0;
let myLibrary = [];

function Book(author, title, pages, readUnread) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readUnread = readUnread;
}

Book.prototype.giveInfo = function () {
    return { author: this.author, title: this.title, pages: this.pages, readUnread: this.readUnread }
}

newBtn.addEventListener("click", () => {
    formContainer.style.display = "block";
    newBtn.style.display = "none";
})

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

formInfo = (author, title, pages) => {
    if (author === "") author = "None";
    if (title === "") title = "None";
    if (pages === "") pages = 0;
    return (document.getElementById("read").checked) ?
        new Book(author, title, pages, "read")
        : new Book(author, title, pages, "unread")
}

createBook = () => {
    let author = form.author.value;
    let title = form.title.value;
    let pages = form.pages.value;
    newBook = formInfo(author, title, pages);
    myLibrary.push(newBook);
    for (i = index; i < myLibrary.length; i++) {
        let book = document.createElement("div");
        let bookIndex = index;
        book.classList.add("book");
        book.id = String(bookIndex);
        bookcase.appendChild(book);
        for (const property in newBook) {
            let bookInfo = document.createElement("div");
            bookInfo.classList.add("bookInfo");
            if (property === "author" || property === "title") {
                let str = property.charAt(0).toUpperCase() + property.slice(1);
                bookInfo.textContent = `${str}: ${myLibrary[i][property]}`;
                book.appendChild(bookInfo);
            }
            if (property === "pages") {
                bookInfo.textContent = `Pages: ${myLibrary[i][property]}`;
                book.appendChild(bookInfo);
            }
            if (property === "readUnread") {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = `checkbox${bookIndex}`;
                checkbox.classList.add("readUnreadCheckboxes");
                const label = document.createElement("label");
                label.id = `label${bookIndex}`;
                label.htmlFor = "readCheck";
                label.classList.add("readUnreadLabels")
                if (myLibrary[i][property] === "read") {
                    label.appendChild(document.createTextNode(" Read"));
                    checkbox.checked = true;
                }
                if (myLibrary[i][property] === "unread") {
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
                book.appendChild(bookInfo);
            }
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





