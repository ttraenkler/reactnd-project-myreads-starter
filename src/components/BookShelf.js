import React from "react";
import BooksGrid from "./BooksGrid";

export default ({ books, category, onChange }) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">
      {category}
    </h2>
    <div className="bookshelf-books">
      <BooksGrid books={books} onChange={onChange} />
    </div>
  </div>;
