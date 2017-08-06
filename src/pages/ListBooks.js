import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import sortBy from "sort-by";

const ListBooks = ({ books, onChange }) =>
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf
          category="Currently Reading"
          books={books
            .filter(book => book.shelf === "currentlyReading")
            .sort(sortBy("title"))}
          onChange={onChange}
        />
        <BookShelf
          category="Want to Read"
          books={books
            .filter(book => book.shelf === "wantToRead")
            .sort(sortBy("title"))}
          onChange={onChange}
        />
        <BookShelf
          category="Read"
          books={books
            .filter(book => book.shelf === "read")
            .sort(sortBy("title"))}
          onChange={onChange}
        />
      </div>
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>;

export default ListBooks;
