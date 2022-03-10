// BOOK CLASS: Represents Book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// STORE CLASS: Handles Storage

// UI CLASS: Handles the UI Display

class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: 'Book One',
        author: 'John Jones',
        isbn: '28467294',
      },
      {
        title: 'Book Two',
        author: 'John Jones',
        isbn: '28467294',
      },
    ];

    const books = StoredBooks;

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
    <td><i class="fa-regular fa-heart fav"></i></td>
    <td><i class="fa-solid fa-heart toggle"></i></td>
    `;

    list.appendChild(row);
  }

  static deleteBook() {

  }
}

// EVENT HANDLERS

// EVENT: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// EVENT: ADD BOOK

// EVENT: REMOVE BOOK

// EVENT: ADD TO FAVORITE

// EVENT: REMOVE FROM FAVORITE
