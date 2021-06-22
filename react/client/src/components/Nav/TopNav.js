// Import 
import React from 'react';
import './Nav.css';
// We export it as component so we can use it somewhere else
function TopNav(props) {
    return (
        <nav className="top-nav-bar">
            <ul className="top-nav-bar-nav">
                {props.children}
            </ul>
        </nav>
    );
}
export default TopNav;
