import React from "react";
import { Link } from "react-router-dom";
import "../css/App.css";

function NavBar () {
    return(
        <nav className="navbar">
    <div className="logo">Qlick</div>
    <ul className="nav-links">
      <li><Link to="/" className="nav-item">Home</Link></li>
      <li><Link to="/about" className="nav-item">About</Link></li>
      <li><Link to="/features" className="nav-item">Features</Link></li>
      <li><Link to="/product" className="nav-item">Product</Link></li>
      <li><Link to="/gallery" className="nav-item">Gallery</Link></li>
    </ul>
    <Link to="/explore" className="explore-btn">Explore</Link>
  </nav>
    )
} 

export default NavBar;