import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import MoviePageContainer from "./containers/MoviePageContainer";

function App() {
  return (
    <div className="App">
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route
            path={["/users/:userID/movies", "/users/movies"]}
            exact
            component={MoviePageContainer}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
