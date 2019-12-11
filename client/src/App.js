import React from 'react';
// import logo from './logo.svg';
import './App.css';

import withContext from './Context';
import Header from './components/Header';
import Index from './components/Index';
//const IndexWithContext = Context.withContext(Index);
const IndexWithContext = withContext(Index);

export default ()=> (
  <div>
    <Header />
    <IndexWithContext />
  </div>
);


