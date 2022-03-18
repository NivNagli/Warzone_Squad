import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainNavigation from './components/Shared/components/Navigation/MainNavigation';
import Footer from './components/Shared/components/Footer/Footer';
import LoginPage from './components/User/pages/Login';
import SignupPage from './components/User/pages/Signup';
import PlayerSearchPage from './components/Services/pages/PlayerSearch';
import ComparePlayersPage from './components/Services/pages/CompareSearch';
import HomePage from './components/Services/pages/homePage';
import PlayerSearchResultPage from './components/Services/pages/PlayerSearchResult';

import './App.css';

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  let routes;
  if (!isAuth) {
    routes = (
      <Switch>
        <Route path="/Login" exact>
          <LoginPage />
        </Route>
        <Route path="/Signup" exact>
          <SignupPage />
        </Route>
        <Route path="/Player-Search" exact>
          <PlayerSearchPage />
        </Route>
        <Route path="/Compare-Search" exact>
          <ComparePlayersPage />
        </Route>
        <Route path="/playerSearch/:username/:platform" exact>
          <PlayerSearchResultPage/>
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    return (
      <React.Fragment>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </React.Fragment>
    );
  }
  else {
    // TODO: Handle the case for signed user
    routes = (
      <Switch>
        <Route path="/Player-Search" exact>
          <PlayerSearchPage />
        </Route>
        <Route path="/Compare-Search" exact>
          <ComparePlayersPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    return (
      <React.Fragment>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
