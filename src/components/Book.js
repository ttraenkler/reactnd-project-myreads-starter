import React from "react";
import BookShelfChanger from "./BookShelfChanger";

export default ({ book, onChange }) =>
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 192,
          backgroundImage: `url(${book.imageLinks.thumbnail}`
        }}
      />
      <BookShelfChanger value={book.shelf} onChange={onChange} />
    </div>
    <div className="book-title">
      {book.title}
    </div>
    <div className="book-authors">
      {book.authors}
    </div>
  </div>;
