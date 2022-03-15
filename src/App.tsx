import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import CountryInfo from './Components/CountryInfo/CountryInfo';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/country/:countryName' element={<CountryInfo />} />
    </Routes>
  );
}

export default App;
