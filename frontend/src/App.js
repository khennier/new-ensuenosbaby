import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BoysClothing from './pages/BoysClothing';
import GirlsClothing from './pages/GirlsClothing';
import Accessories from './pages/Accessories';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boys-clothing" element={<BoysClothing />} />
        <Route path="/girls-clothing" element={<GirlsClothing />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
