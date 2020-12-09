import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
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
import ActorDetailsPage from "./containers/actor-details/ActorDetailsPage";
import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "./constants/ApiConstants";
import ArticlePageContainer from "./containers/ArticlePageContainer"
import ArticleDetailsComponent from "./containers/ArticleDetails"
import ActorPageContainer from './containers/ActorPageContainer';

function App() {
  const [title, updateTitle] = useState(null)
  const [errorMessage, updateErrorMessage] = useState(null)
  const [user, setUser] = useState({username: '1'});

  useEffect(() => {
    axios.get(API_BASE_URL + '/users/me', {headers: {'token': localStorage.getItem(ACCESS_TOKEN_NAME)}})
      .then(function (response) {
        if (response.status == 200) {
          setUser(response.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent/>
        {/*<MovieListComponent/>*/}
        <div className="container-fluid d-flex align-items-center flex-column">
          {/*<Router history={createBrowserHistory()}>*/}
          <Switch>
            <Route path={["/"]} exact component={MoviePageContainer}/>
            <Route path={["/movies"]} exact component={MoviePageContainer}/>
            <Route path={"/movies/:movieID"} exact render={(props) => <MovieDetailsPage {...props} curUser={user}/>}/>
            <Route path={"/actors/:actorID"} exact component={ActorDetailsPage} />
            <Route path={"/actors"} exact component={ActorPageContainer} />
            <Route path={"/articles"} exact component={ArticlePageContainer}/>
            <Route path={"/:userId/articles"} exact component={ArticlePageContainer}/>
            <Route path={"/articles/:articleId"} exact component={ArticleDetailsComponent}/>
            <Route path={"/:userId/articles/:articleId"} exact component={ArticleDetailsComponent}/>

            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
            </Route>
            <PrivateRoute path="/home">
              <UserProfile/>
            </PrivateRoute>
            <Route path="/users/:userId">
              <UserProfile/>
            </Route>
          </Switch>
          {/*</Router>*/}
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
