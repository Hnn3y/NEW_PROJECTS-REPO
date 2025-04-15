import React from "react";
import "../css/App.css" 

function Home () {

    return(
        <section className="home-section">
        <h1 className="home-heading">
          The Art <span role="img" aria-label="mic">🎙️</span> of Human Expression, Uncover
          <br />
          The <i>Stories</i> Behind the Art <span className="circle-decor" />
        </h1>
        <p className="home-description">
          Discover new favorites among our diverse exhibitions. Uncover the stories and inspirations behind the art.
        </p>
        <button className="explore-btn">Explore</button>
        <div className="gallery">
          <img src="/images/art1.jpg" alt="Art 1" className="art-image" />
          <img src="/images/art2.jpg" alt="Art 2" className="art-image" />
          <img src="/images/art3.jpg" alt="Art 3" className="art-image" />
        </div>
      </section>
    )
} 

export default Home;