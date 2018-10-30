import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="GridHeader">
    <div id="home">
      <Link to="/dash">
        Home Page
      </Link>
    </div>
    <div id="gallery">
      <Link to="/gallery">
        Gallery
      </Link>
    </div>
    <div id="search">
      <Link to="/search">
        Search
      </Link>
    </div>
  </div>
);

export default Nav;