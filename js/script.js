// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC74Ut3enILkqh9wafOesOFt6-xlovCNrQ",
    authDomain: "library-bd1e.firebaseapp.com",
    projectId: "library-bd1e",
    databaseURL: "https://library-bd1e-default-rtdb.firebaseio.com/",
    storageBucket: "library-bd1e.appspot.com",
    messagingSenderId: "322803676213",
    appId: "1:322803676213:web:1d640cb15cfc3b34666d7c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

gotData = (data) => {
    // refresh list of cards to remove duplicates
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].remove();
    }

    // books is the parent object of long str key objects
    let books = data.val();
    // gets array of all the object keys
    let keys = Object.keys(books);
    console.log(keys);
    console.log(keys.length);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let title = books[key].title;
        let pages = books[key].pages;
        let author = books[key].author;
        let read = books[key].read;
        console.log(keys[i]);
        console.log("add-book");
        addBookToLibrary(title, pages, author, read, key);
    }
}

errData = (data) => {
    console.log(data);
}

// Get a reference to messages collection
// collection is basically a SQLite table
var booksRef = firebase.database().ref('books');
booksRef.on('value', gotData, errData);

// get elements
// const preObject = document.getElementById('object');

// create references
// ref -> root
// child -> creates child key of object
// const dbRefObject = firebase.database().ref().child('book');


// sync object data changes
// called everytime there is data change
// snap param = data snapshot which returns important things
// dbRefObject.on('value', snap => {
//     preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
// });

// project id library-bd1e

const modal = document.querySelector('.modal');
const modalForm = document.getElementById('modal-form');
const container = document.querySelector('.container');
const submitBtn = document.getElementById('submit-btn');
const addBtn = document.getElementById('add-btn');
const exitBtn = document.getElementById('exit-btn');
const form = document.querySelector('.modal-form');
const cancelBtn = document.getElementById('cancel-btn');

// array to hold books
// let books = [];

// constructor function which creates book objects
function Book(title, pages, author, read) {
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.read = read;
}

// creates prototype function to change read status of object
Book.prototype.changeReadStatus = function (readStatus) {
    if (readStatus === 'read') {
        this.read = 'unread';
    } else {
        this.read = 'read';
    }
}

// consider looping through form.elements?
addBookToLibrary = (title, pages, author, readStatus, key) => {
    // let title = getInputValue('book-title');
    // let pages = getInputValue('book-pages');
    // let author = getInputValue('book-author');
    // let read = document.getElementById('book-read');
    // let readCheck = '';

    // if (read.checked) {
    //     readCheck = 'read';
    // } else {
    //     readCheck = 'unread';
    // }

    // show confirmation
    document.querySelector('.alert').style.display = 'block';

    // Hide confirmation after 3s
    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
    }, 3000);

    // creates new book object with user form data
    myBook = new Book(title, pages, author, readStatus);
    // books.push(myBook);

    let info = document.createElement('p');
    let book = document.createElement('div');
    book.classList.add('card');

    for (const prop in myBook) {
        if (typeof myBook[prop] !== 'function' && prop !== 'read') {
            info.innerHTML += myBook[prop] + ' ';
        }
    }
    book.appendChild(info);

    // add the book's array index number to keep track of it
    book.dataset.key = key;
    // book.dataset.indexNumber = books.length - 1;

    // creates remove button
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = 'Remove Entry';
    removeBtn.addEventListener('click', (ev) => {
        // remove the child node of the books node that has the key of the variable key
        let key = ev.target.parentElement.dataset.key;
        booksRef.child(key).remove();
        // let index = ev.target.parentElement.dataset.indexNumber;
        // books.splice(index, 1);
        // container.removeChild(ev.target.parentElement);
        // decreaseIndex(index);
    })

    // creates read/unread button
    let readBtn = document.createElement('button');
    readBtn.classList.add('read-btn');
    readBtn.innerHTML = 'Change Read Status';
    readBtn.addEventListener('click', (ev) => {
        let key = ev.target.parentElement.dataset.key;

        // update database to change read status
        if (readStatus === 'read') {
            booksRef.child(key).update({ 'read': 'unread' });
        } else {
            booksRef.child(key).update({ 'read': 'read' });
        }

        // let index = ev.target.parentElement.dataset.indexNumber;
        // let book = books[index];
        // let readCheckbox = document.getElementById(`read-checkbox-${index}`)
        // book.changeReadStatus(book['read']);
        // if (book['read'] === 'unread') {
        //     readCheckbox.checked = false;
        // } else {
        //     readCheckbox.checked = true;
        // }
    })

    // creates read/unread checkbox
    let readCheckbox = document.createElement('input');
    readCheckbox.type = 'checkbox';
    readCheckbox.name = 'readCheckbox';
    readCheckbox.value = 'read';
    readCheckbox.disabled = true;
    // readCheckbox.id = `read-checkbox-${book.dataset.indexNumber}`;
    readCheckbox.classList.add('read-checkbox');
    if (readStatus === 'read') {
        readCheckbox.checked = true;
    }

    book.appendChild(removeBtn);
    book.appendChild(readBtn);
    book.appendChild(readCheckbox);
    container.appendChild(book);
}

// decreases the dataset-index-number of all the book cards that are greater than the one being deleted
decreaseIndex = (index) => {
    // could also loop thru all the container's children
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        let cardIndex = card.dataset.indexNumber;
        if (cardIndex > index) {
            card.dataset.indexNumber -= 1;
        }
    })
}

// Get Input Value
getInputValue = id => {
    return document.getElementById(id).value;
}

// modal interactions
modal.style.display = 'none';

addBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
})

exitBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    form.reset();
})

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    form.reset();
})

// check if all form sections are filled in
validateForm = (form) => {
    for (let i = 0; i < form.length - 2; i++) {
        if (form[i].value === '') {
            return false;
        }
    }
    if (document.querySelector('input[name="book-read"]:checked') == null) {
        return false;
    }
    return true;
}

modalForm.addEventListener('submit', (ev) => {
    if (ev.submitter.id === 'submit-btn') {
        ev.preventDefault();
        modal.style.display = 'none';
        // uploads data to firebase
        let title = getInputValue('book-title');
        let pages = getInputValue('book-pages');
        let author = getInputValue('book-author');
        let read = document.getElementById('book-read');
        let readStatus = '';

        if (read.checked) {
            readStatus = 'read';
        } else {
            readStatus = 'unread';
        }
        saveMessage(title, pages, author, readStatus)
    }
    form.reset();
})

// Save message to firebase
saveMessage = (title, pages, author, read) => {
    let newBookRef = booksRef.push();
    // sends object data to firebase
    newBookRef.set({
        title: title,
        pages: pages,
        author: author,
        read: read,
    })
}
