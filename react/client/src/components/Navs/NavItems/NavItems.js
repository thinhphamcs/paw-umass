import React from 'react';
import { Link } from 'react-router-dom';
import '../Nav.css';

function NavItems(props) {
    return (
        <li className="top-nav-items">
            <Link to="#" className="top-icon-button">
                {props.icon}
            </Link>
        </li>
    )
}

export default NavItems;
