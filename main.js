// BOOK CLASS: Represent

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// STORE CLASS: Handles Storage
class Store {}

// UI CLASS: Handles the UI Display

class UI {
  static displayBooks() {
    const storedBooks = [
      {
        title: 'Harry Potter',
        author: 'J.K Rowling',
        isbn: '28467294',
      },
      {
        title: 'Alice in Wonderland',
        author: 'Lewis Carroll',
        isbn: '28467294',
      },
    ];

    const books = storedBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class =" btn btn-danger btn-sm delete">X</a></td>
    <td><i class="fa-solid fa-heart fav"></i></td>
    `;

    list.appendChild(row);
  }

  //   Delete book
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
      UI.showAlert('Book Removed', 'success');
    }
  }

  //   Alert Messages
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Disappear in 3 secs
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  //   Clear fields
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// EVENT HANDLERS

// EVENT: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// EVENT: ADD BOOK
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  //   Get Form Values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //   Validate

  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    //   Instantiate book
    const book = new Book(title, author, isbn);

    //   Add book to UI
    UI.addBookToList(book);

    // Show succes message
    UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.clearFields();
  }
});

// EVENT: REMOVE BOOK
document.querySelector('#book-list').addEventListener('click', (e) => {
  // remove book from UI
  UI.deleteBook(e.target);
});

// EVENT: ADD TO FAVORITE

// EVENT: REMOVE FROM FAVORITE
