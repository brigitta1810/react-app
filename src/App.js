//----------------------
//Autor:Brigitta Bunford
//----------------------

//importing components
import React from "react";
import { Route } from "react-router-dom";

import SearchPage from "./SearchPage";
import Books from "./Books";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  shelfChanged = (book:[], shelf:'' ) => {
    BooksAPI.update(book, shelf).then(response => {
      this.fetchBook();
    });
  };

  fetchBook() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  render() {
    return (
      <div className="application">
        <Route exact path="/" render={() => <Books categorizedBooks={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
            <SearchPage movingPosition={this.shelfChanged} categorizedBooks={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;