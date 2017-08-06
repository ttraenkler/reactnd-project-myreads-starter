import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./pages/ListBooks";
import SearchBooks from "./pages/SearchBooks";

class BooksApp extends React.Component {
  state = {
    library: new Map() // these are the books on the user's self
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const library = new Map();
      for (let book of books) {
        library.set(book.id, book);
      }
      console.log("library", library);
      this.setState({ library });
    });
  }

  onChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let updatedLibrary = new Map(this.state.library);
      if (updatedLibrary.has(book.id)) {
        updatedLibrary.get(book.id).shelf = shelf;
        this.setState({ library: updatedLibrary });
      } else {
        BooksAPI.get(book.id).then(newBook => {
          updatedLibrary.set(book.id, newBook);
          this.setState({ library: updatedLibrary });
        });
      }
    });
  };

  render() {
    const { library } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListBooks library={library} onChange={this.onChange} />}
        />
        <Route
          path="/search"
          render={() =>
            <SearchBooks library={library} onChange={this.onChange} />}
        />
      </div>
    );
  }
}

export default BooksApp;
