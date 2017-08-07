import React from "react";
import Book from "./Book";

export default ({ books, onChange }) =>
  <ol className="books-grid">
    {books.map((book, index) =>
      <li key={index}>
        <Book book={book} onChange={shelf => onChange(book, shelf)} />
      </li>
    )}
  </ol>;
