import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css'
import NavBar from './pages/Nav.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx';

function App() {

  return (
    <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
    </Routes>
  </Router>
  
  )
}

export default App
