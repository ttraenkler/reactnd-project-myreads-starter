import React from "react";
import { Link } from "react-router-dom";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import { search } from "../BooksAPI";
import { throttle } from "lodash";
import BooksGrid from "../components/BooksGrid";

export default class SearchBooks extends React.Component {
  state = {
    query: "",
    results: [] // these are the search results
  };

  onQueryChange = e => {
    const query = e.target.value;
    this.setState({ query });
    const { library } = this.props;
    let results = new Map();
    if (query) {
      search(query, 20).then(response => {
        console.log("search request response =", response);
        if (!response.error) {
          for (let book of response) {
            if (library.has(book.id)) {
              results.set(book.id, library.get(book.id));
            } else {
              results.set(book.id, book);
            }
          }
          console.log("results.values()", Array.from(results.values()));
          this.setState({ results: Array.from(results.values()) });
        }
      });
    }
  };

  render() {
    const { onChange } = this.props;
    const { results } = this.state;
    let sortedResults = results;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      sortedResults = results.filter(book => match.test(book.title));
    }
    sortedResults.sort(sortBy("title"));

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
              onChange={this.onQueryChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={sortedResults} onChange={onChange} />
        </div>
      </div>
    );
  }
}
