import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import sortBy from "sort-by";

const ListBooks = ({ library, onChange }) => {
  const currentlyReading = [],
    wantToRead = [],
    read = [];
  for (let book of library.values()) {
    switch (book.shelf) {
      case "currentlyReading":
        currentlyReading.push(book);
        break;
      case "read":
        read.push(book);
        break;
      case "wantToRead":
        wantToRead.push(book);
        break;
      default:
    }
  }
  currentlyReading.sort(sortBy("title"));
  wantToRead.sort(sortBy("title"));
  read.sort(sortBy("title"));

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            category="Currently Reading"
            books={currentlyReading}
            onChange={onChange}
          />
          <BookShelf
            category="Want to Read"
            books={wantToRead}
            onChange={onChange}
          />
          <BookShelf category="Read" books={read} onChange={onChange} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
