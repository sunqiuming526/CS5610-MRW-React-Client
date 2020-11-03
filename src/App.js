import logo from './logo.svg';
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Link, Route} from "react-router-dom";


import NavbarComponent from "./components/NavbarComponent";
import MovieListComponent from "./components/MovieListComponent";

function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <MovieListComponent/>
    </div>
  );
}

export default App;
