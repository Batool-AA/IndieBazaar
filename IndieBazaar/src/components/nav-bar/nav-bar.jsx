import React from 'react';
import './nav-bar.css';

const Navbar = () => {
    return (
        <div className="nav-bar-container">
            <h1 className="nav-bar-logo">IndieBazaar</h1>
            <div className="nav-bar-icons">
                <i className="icon-heart">💜</i>
                <i className="icon-cart">🛒</i>
                <i className="icon-user">👤</i>
            </div>
        </div>
    );
};

export default Navbar;