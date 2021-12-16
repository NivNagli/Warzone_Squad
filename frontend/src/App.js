import React, { useState, useEffect } from 'react';
import MainNavigation from './components/Shared/components/Navigation/MainNavigation';
import Footer from './components/Shared/components/Footer/Footer';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <MainNavigation />
      <Footer/>
    </React.Fragment>
  );
}

export default App;
