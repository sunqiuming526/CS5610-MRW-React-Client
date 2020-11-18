import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import MoviePageContainer from "./containers/MoviePageContainer";
import MovieDetailsPage from "./containers/movie-details/MovieDetailsPage";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path={["/"]} exact component={MoviePageContainer} />
          <Route path={"/movies/:movieID"} exact component={MovieDetailsPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
