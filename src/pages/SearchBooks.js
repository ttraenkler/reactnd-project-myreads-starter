import React from "react";
import { Link } from "react-router-dom";
import { BooksGrid } from "../components/BookShelf";
import { search } from "../BooksAPI";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export default class SearchBooks extends React.Component {
  state = {
    query: "",
    results: [] // these are the search results
  };

  onQueryChange = query => {
    this.setState({ query });
    const { library } = this.props;
    if (query) {
      search(query, 20).then(results => {
        if (!results.error) {
          const shelfedResults = results.map(book => {
            if (library.has(book.id)) {
              return library.get(book.id);
            } else {
              return book;
            }
          });
          this.setState({
            results: shelfedResults
          });
        }
      });
    } else {
      this.setState({ results: [] });
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
              onChange={e => this.onQueryChange(e.target.value)}
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
