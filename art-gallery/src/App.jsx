import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css'
import NavBar from './pages/Nav.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Feature from './pages/Features.jsx';
import Product from './pages/Product.jsx';
import Gallery from './pages/Gallery.jsx';
import Explore from './pages/Explore.jsx';

function App() {

  return (
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/feature" element={<Feature/>} />
      <Route path="/product" element={<Product/>} />
      <Route path="/Gallery" element={<Gallery/>} />
      <Route path="/explore" element={<Explore/>} />
    </Routes>
  </Router>
  
  )
}

export default App
