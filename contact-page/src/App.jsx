import React from 'react';
import Form from ''
import './css/App.css'


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