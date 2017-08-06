import React from "react";
import { Link } from "react-router-dom";
import { BooksGrid } from "../components/BookShelf";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export default class SearchBooks extends React.Component {
  state = {
    query: ""
  };

  render() {
    const { books, onChange } = this.props;
    let searchResult = books;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      searchResult = books.filter(book => match.test(book.title));
    }
    searchResult.sort(sortBy("title"));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.setState({ query: e.target.value })}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={searchResult} onChange={onChange} />
        </div>
      </div>
    );
  }
}
