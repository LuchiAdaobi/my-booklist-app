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
        title: 'Book One',
        author: 'John Jones',
        isbn: '28467294',
      },
    ];

    const books = StoredBooks;

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
  }
}

// EVENT: Display Book

// EVENT: ADD BOOK

// EVENT: REMOVE BOOK

// EVENT: ADD TO FAVORITE

// EVENT: REMOVE FROM FAVORITE
