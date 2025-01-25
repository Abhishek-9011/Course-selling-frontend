import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import './HomePage.css'; // Make sure to import the CSS file

function HomePage() {
  return (
    <div className='homepageContainer'>
    <div className="home-page">
      <Hero className="hero" />
    </div>
    </div>
  );
}

export default HomePage;
