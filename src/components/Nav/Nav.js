import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './nav.css'

const Nav = (props) => (
    <div className="navbar">
        <ul>
            <li>
                <Link to="/gallery">
                    Home Page
                </Link>
                <li>
                    <Link to="/search">
                        Search
                    </Link>
                </li>
            </li>
        </ul>
    </div>
);

export default connect()(Nav);