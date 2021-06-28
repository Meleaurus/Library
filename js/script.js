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
    BOOKNUMBERS = 0;

    // books is the parent object of long str key objects
    let books = data.val();
    // if there are actually books uploaded
    if (books != undefined) {
        // gets array of all the object keys
        let keys = Object.keys(books);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let title = books[key].title;
            let pages = books[key].pages;
            let author = books[key].author;
            let read = books[key].read;
            addBookToLibrary(title, pages, author, read, key);
        }
    }
}

errData = (data) => {
    console.log(data);
}

// Get a reference to messages collection
// collection is basically a SQLite table
var booksRef = firebase.database().ref('books');
booksRef.on('value', gotData, errData);

const modal = document.querySelector('.modal');
const modalForm = document.getElementById('modal-form');
const container = document.querySelector('.container');
const submitBtn = document.getElementById('submit-btn');
const addBtn = document.getElementById('add-btn');
const exitBtn = document.getElementById('exit-btn');
const form = document.querySelector('.modal-form');
const cancelBtn = document.getElementById('cancel-btn');

let BOOKNUMBERS = 0;

// adds new card to the container div
addBookToLibrary = (title, pages, author, readStatus, key) => {
    BOOKNUMBERS += 1;
    console.log(BOOKNUMBERS);

    let book = document.createElement('div');

    let titleTag = document.createElement('p');
    let pagesTag = document.createElement('p');
    let authorTag = document.createElement('p');

    let titleContent = document.createElement('p');
    titleContent.classList.add('titleContent');
    let pagesContent = document.createElement('p');
    pagesContent.classList.add('pagesContent');
    let authorContent = document.createElement('p');
    authorContent.classList.add('authorContent');

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('titleDiv');
    let pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pagesDiv');
    let authorDiv = document.createElement('div');
    authorDiv.classList.add('authorDiv');

    book.classList.add('card');
    titleTag.innerHTML = 'Title:';
    pagesTag.innerHTML = 'Pages:';
    authorTag.innerHTML = 'Author:';

    titleContent.innerHTML = `${title}`;
    pagesContent.innerHTML = `${pages}`;
    authorContent.innerHTML = `${author}`;

    titleDiv.appendChild(titleTag);
    titleDiv.appendChild(titleContent);
    pagesDiv.appendChild(pagesTag);
    pagesDiv.appendChild(pagesContent);
    authorDiv.appendChild(authorTag);
    authorDiv.appendChild(authorContent);

    book.appendChild(titleDiv);
    book.appendChild(pagesDiv);
    book.appendChild(authorDiv);

    // add the book's array index number to keep track of it
    book.dataset.key = key;
    // book.dataset.indexNumber = books.length - 1;

    let readStatusDiv = document.createElement('div');
    readStatusDiv.classList.add('readStatusDiv');

    // creates read/unread button
    let readBtn = document.createElement('button');
    readBtn.classList.add('read-btn');
    readBtn.innerHTML = 'Change Read Status';
    readBtn.addEventListener('click', (ev) => {
        let key = ev.target.parentElement.parentElement.dataset.key;

        // update database to change read status
        if (readStatus === 'read') {
            booksRef.child(key).update({ 'read': 'unread' });
        } else {
            booksRef.child(key).update({ 'read': 'read' });
        }
    })

    readStatusDiv.appendChild(readBtn);

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

    readStatusDiv.appendChild(readCheckbox);

    let removeBtnDiv = document.createElement('div');
    removeBtnDiv.classList.add('removeBtnDiv');

    // creates remove button
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = 'Remove Entry';
    removeBtn.addEventListener('click', (ev) => {
        // remove the child node of the books node that has the key of the variable key
        let key = ev.target.parentElement.parentElement.dataset.key;
        booksRef.child(key).remove();
        BOOKNUMBERS -= 1;
    })

    removeBtnDiv.appendChild(removeBtn);

    book.appendChild(readStatusDiv);
    book.appendChild(removeBtnDiv);
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
    // for (let i = 0; i < form.length - 2; i++) {
    //     if (form[i].value === '') {
    //         alert('Please fill out all the inputs!');
    //         return false;
    //     }
    // }
    // if (document.querySelector('input[name="book-read"]:checked') == null) {
    //     alert('Please choose a read or unread option!');
    //     return false;
    // }
    return true;
}

modalForm.addEventListener('submit', (ev) => {
    if (BOOKNUMBERS >= 15 && BOOKNUMBERS % 15 === 0) {
        let pageNumber = BOOKNUMBERS / 15;
        console.log(pageNumber);
        alert('Maximum books reached!');
        return false;
        // add button for page 2
        // creates a new html page (page[x].html);
        // use JS to create the same header and add new book button
        // change all current ids -> classes
        // link to another html page with new table
    }
    // otherwise check if booknumbers < 15, so remove the html page
    if (ev.submitter.id === 'submit-btn' && validateForm(modalForm)) {
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
        // show confirmation
        document.querySelector('.alert').style.display = 'block';

        // Hide confirmation after 3s
        setTimeout(() => {
            document.querySelector('.alert').style.display = 'none';
        }, 3000);
    } else {
        return false;
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
