import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import LoginPage from './components/User/pages/Login';
import SignupPage from './components/User/pages/Signup';
import MainNavigation from './components/Shared/components/Navigation/MainNavigation';
import Footer from './components/Shared/components/Footer/Footer';
import './App.css';

function App() {
  let routes = (
    <Switch>
      <Route path="/Login" exact>
        <LoginPage/>
      </Route>
      <Route path="/Signup" exact>
        <SignupPage/>
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

export default App;
