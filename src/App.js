import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Router, Route, Switch} from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";
import MovieListComponent from "./components/MovieListComponent";
import RegistrationForm from "./components/Login/RegistrationForm/RegistrationForm";
import AlertComponent from "./components/Login/AlertComponent/AlertComponent";
import PrivateRoute from "./utils/PrivateRoute";
import UserProfile from "./components/UserHomePage";
import LoginForm from "./components/Login/LoginForm/LoginForm";
import {createBrowserHistory} from "history";

import MoviePageContainer from "./containers/MoviePageContainer";
import MovieDetailsPage from "./containers/movie-details/MovieDetailsPage";


function App() {
  const [title, updateTitle] = useState(null)
  const [errorMessage, updateErrorMessage] = useState(null)

  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent/>
        {/*<MovieListComponent/>*/}
        <div className="container-fluid d-flex align-items-center flex-column">
          {/*<Router history={createBrowserHistory()}>*/}
            <Switch>
              <Route path={["/"]} exact component={MoviePageContainer}/>
              <Route path={"/movies/:movieID"} exact component={MovieDetailsPage}/>
              <Route path="/register">
                <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <Route path="/login">
                <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
              </Route>
              <PrivateRoute path="/home">
                <UserProfile/>
              </PrivateRoute>
            </Switch>
          {/*</Router>*/}
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
