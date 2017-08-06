import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./pages/ListBooks";
import SearchBooks from "./pages/SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  onChange = (book, shelf) => {
    console.log("change", book, shelf);
    BooksAPI.update(book, shelf).then(() =>
      this.setState({
        books: this.state.books.map(
          entry => (entry.id === book.id ? { ...entry, shelf } : entry)
        )
      })
    );
  };

  render() {
    const { books } = this.state;
    console.log("books = ", books);
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <ListBooks books={books} onChange={this.onChange} />}
        />
        <Route
          path="/search"
          render={() => <SearchBooks books={books} onChange={this.onChange} />}
        />
      </div>
    );
  }
}

export default BooksApp;
