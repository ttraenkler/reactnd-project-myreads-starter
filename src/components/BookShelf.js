import React from "react";

const Title = ({ children }) =>
  <h2 className="bookshelf-title">
    {children}
  </h2>;

const BookShelfChanger = ({ value, onChange }) =>
  <div className="book-shelf-changer">
    <select
      onChange={e => {
        e.preventDefault();
        console.log(e.target.value);
        onChange(e.target.value);
      }}
      defaultValue={value}
    >
      <option value="none" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>;

const Book = ({ book, onChange }) =>
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

export const BooksGrid = ({ books, onChange }) =>
  <ol className="books-grid">
    {books.map((book, index) =>
      <li key={index}>
        <Book book={book} onChange={shelf => onChange(book, shelf)} />
      </li>
    )}
  </ol>;

const BookShelf = ({ books, category, onChange }) =>
  <div className="bookshelf">
    <Title>
      {category}
    </Title>
    <div className="bookshelf-books">
      <BooksGrid books={books} onChange={onChange} />
    </div>
  </div>;

export default BookShelf;
