import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";


import NavbarComponent from "./components/NavbarComponent";
import MovieListComponent from "./components/MovieListComponent";
import RegistrationForm from "./components/Login/RegistrationForm/RegistrationForm";
import AlertComponent from "./components/Login/AlertComponent/AlertComponent";

function App() {
  const [title, updateTitle] = useState(null)
  const [errorMessage, updateErrorMessage] = useState(null)

  return (

    <BrowserRouter>
      <div className="App">
        <NavbarComponent/>
        <MovieListComponent/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
