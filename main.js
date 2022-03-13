// BOOK CLASS: Represent a book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// STORE CLASS: Handles Storage
class Store {
  static getBooks() {
    let books;
    // check if there's a current 'book' item
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    //   Get currently stored books
    const books = Store.getBooks();
    // add new book to "books" array
    books.push(book);
    // set/save local storage with books array (converted to a string)
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    //   Get currently stored books
    const books = Store.getBooks();
    // iterate through "books" array
    books.forEach((book, index) => {
      // check if current iterated item's "isbn" matches passsed "isbn" param
      if (book.isbn === isbn) {
        //   splice out current iterated item from array by its index
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// FAVORITE STORE
class FavStore {
  static getBooks() {
    let favBooks;
    // check if there's already a "favBooks" item
    if (localStorage.getItem('favBooks') === null) {
      favBooks = [];
    } else {
      favBooks = JSON.parse(localStorage.getItem('favBooks'));
    }
    return favBooks;
  }

  static addFavBook(book) {
    //   Get currently stored fav books
    const favBooks = FavStore.getBooks();
    // Add new book to the favBooks array
    favBooks.push(book);
    // set local storage with books array (converted to a string)

    localStorage.setItem('favBooks', JSON.stringify(favBooks));
  }

  static removeFavBook(isbn) {
    //   Get currently stored books
    const favBooks = Store.getBooks();
    // iterate through "books" array
    favBooks.forEach((book, index) => {
      if (book.isbn === isbn) {
        favBooks.splice(index, 1);
      }
    });

    localStorage.setItem('favBooks', JSON.stringify(favBooks));
  }
}

// UI CLASS: Handles the UI Display

class UI {
  static displayBooks() {
    // get currently stored books
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  //   iterates book and calls addBookTo List func
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    // Created a row to insert into the table within index.html
    const row = document.createElement('tr');
    // store input in new table row element
    row.innerHTML = `
    <td id="book-title">${book.title}</td>
    <td id="book-author">${book.author}</td>
    <td id="book=isbn">${book.isbn}</td>
    <td id="book-fav"><i class="fa-solid fa-heart fav"></i></td>
    <td id="book-check"><label for="check"></label>
    <input type ='checkbox' class='check text-primary id = "check"'></input></td>
    <td id="book-delete"><a href ="#" class =" btn btn-danger btn-sm delete">X</a></td>
    `;
    // add new row to the table
    list.appendChild(row);
  }

  //   Delete book
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      // remove 'parent el' of the parent el -two levels up to get the entire row
      el.parentElement.parentElement.remove();
      UI.showAlert('Book Removed', 'success');
    }
  }

  //   Alert Messages
  static showAlert(message, className) {
    //   Creates a DOM Div element
    const div = document.createElement('div');
    //  Assigns 'className" param as the new "div's class
    div.className = `alert alert-${className}`;
    //  Assigns 'message" param as the new "div's text
    div.appendChild(document.createTextNode(message));

    // Find the desired parent element and place the new alert within it
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');
    // take the container and insert thee 'alert' before the form
    container.insertBefore(div, form);

    // Disappear in 3 secs
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  //   Clear fields after submission
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  //   Display favorite books

  static displayFavBooks() {
    // get currently stored books
    const favBooks = FavStore.getBooks();

    favBooks.forEach((book) => UI.addBookToList(book));
  }

  //   RELOAD Page

  static reloadBtn() {
    const reload = document.querySelector('#reload-btn');
    reload.innerHTML = `<button onClick="window.location.reload()" class =" btn btn-primary mt-4 ">Back to Books</button> `;
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

    // Add book to Store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.clearFields();
  }
});

// EVENT: REMOVE BOOK
document.querySelector('#book-list').addEventListener('click', (e) => {
  // "deleteBook()" targets specific element (else it would only target first instance)
  // remove book from UI
  UI.deleteBook(e.target);
  //   remove book from store
  Store.removeBook(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent
  );
});

// EVENT: ADD TO FAVORITE

document.querySelector('#book-list').addEventListener('click', (e) => {
  console.log(e.target);
  // Get values from table
  const title = document.querySelector('#book-title').textContent;
  const author = document.querySelector('#book-author').textContent;
  const isbn = document.querySelector('#book-isbn').textContent;
  // const fav = document.querySelector('#book-fav').value;

  //   Instantiate book
  const book = new Book(title, author, isbn);

  // Remove book from Store
  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    FavStore.removeFavBook(e.target.parentElement.parentElement);
    // Show delete message
    UI.showAlert('Book Removed from Favorite', 'danger');
  } else {
    // Show success message
    e.target.classList.add('active');
    //   Add Favorite book to store
    FavStore.addFavBook(book);
    UI.showAlert('Book Added To Favorite', 'success');
  }
});

// EVENT: Display favorites
// document.querySelector('#fav').addEventListener('click', () => {
//   const bookList = document.querySelector('#book-list');
//   bookList.innerHTML = '';

//   //   Display Favorite Books
//   UI.displayFavBooks();

//   if (bookList.innerHTML === '') {
//     UI.showAlert('You have not yet added book to favorite', 'danger');
//     UI.reloadBtn();
//   } else {
//     UI.reloadBtn();
//   }
// });
