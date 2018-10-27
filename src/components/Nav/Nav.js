import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './nav.css'

const Nav = (props) => (
    <div className="navbar">
        <ul>
            <li>
                <Link to="/dashboard">
                    Home Page
                </Link>
            </li>
            <li>
                <Link to="/gallery">
                    Gallery
                </Link>
            </li>
            <li>
                <Link to="/search">
                    Search
                </Link>
            </li>
        </ul>
    </div>
);

export default connect()(Nav);