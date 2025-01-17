const modal = document.querySelector('.modal');
const openModal = document.querySelector('.open');
const closeModal = document.querySelector('.close');
const bottomContainer = document.querySelector('.bottom-container');
const myLibrary = []; // Array to store book objects
let editingBook = null; // To keep track of the book being edited

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add book to library
function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBook(book);
}

// Display a book tile
function displayBook(book) {
    const bookTile = document.createElement('div');
    bookTile.classList.add('book');

    bookTile.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read}</p>
        <button class="button-book edit">Edit</button>
        <button class="button-book toggle">Toggle</button>
        <button class="button-book delete">Delete</button>
    `;

    // Append the new book tile to the bottom container
    bottomContainer.appendChild(bookTile);

    // Attach event listeners to buttons in the tile
    attachButtonListeners(book, bookTile);
}

// Attach button listeners to a book tile
function attachButtonListeners(book, bookTile) {
    const toggleButton = bookTile.querySelector('.toggle');
    toggleButton.addEventListener('click', () => {
        // Toggle the 'read' property in the book object
        book.read = book.read === 'yes' ? 'no' : 'yes';
        // Update the displayed "Read" status in the tile
        bookTile.querySelector('p:nth-of-type(3)').textContent = `Read: ${book.read}`;
    });

    const deleteButton = bookTile.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        bottomContainer.removeChild(bookTile);
        const index = myLibrary.indexOf(book);
        if (index > -1) myLibrary.splice(index, 1);
    });

    const editButton = bookTile.querySelector('.edit');
    editButton.addEventListener('click', () => {
        // Populate modal with current book details
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('pages').value = book.pages;
        document.getElementById('read').value = book.read;

        // Keep track of the book being edited
        editingBook = { book, bookTile };

        // Open modal
        modal.showModal();
    });
}

// Open modal for adding a new book
openModal.addEventListener('click', () => {
    // Clear form inputs
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').value = 'yes';

    editingBook = null; // Reset editingBook since we're adding a new book
    modal.showModal();
});

// Close modal and handle book addition or update
closeModal.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    if (title && author && pages) {
        if (editingBook) {
            // Update the existing book
            const { book, bookTile } = editingBook;
            book.title = title;
            book.author = author;
            book.pages = pages;
            book.read = read;

            // Update the tile content
            bookTile.querySelector('h2').textContent = book.title;
            bookTile.querySelector('p:nth-of-type(1)').textContent = `Author: ${book.author}`;
            bookTile.querySelector('p:nth-of-type(2)').textContent = `Pages: ${book.pages}`;
            bookTile.querySelector('p:nth-of-type(3)').textContent = `Read: ${book.read}`;
        } else {
            // Create a new book and add it to the library
            const newBook = new Book(title, author, pages, read);
            addBookToLibrary(newBook);
        }
    }

    // Clear the editingBook reference
    editingBook = null;

    // Close the modal
    modal.close();
});
