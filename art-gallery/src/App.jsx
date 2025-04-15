import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css'
import NavBar from './pages/Nav.jsx'
import Home from './pages/Home.jsx'

function App() {

  return (
    <Router>
    <NavBar />
    <Home/>
    <Routes>
    </Routes>
  </Router>
  
  )
}

export default App
