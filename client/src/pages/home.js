// Home.js
import { Link } from 'react-router-dom';
import React from 'react';

export const Home = () => {
  return (
    <div className="home-container">
      <div className="background-image">
        <div className="content">
          <h1>Welcome to Our Recipe Blog</h1>
          <h2>Explore Delicious Recipes</h2>
          <button className="view-recipes-btn">
          <Link to="/recipes">View Recipes</Link>
          </button>
        </div>
      </div>
    </div>
  );
 
};
