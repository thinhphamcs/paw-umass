// Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
// We export it as component so we can use it somewhere else
function NavItems(props) {
    const [open, setOpen] = useState(false);
    return (
        <li className="top-nav-items">
            <Link to="#" className="top-icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </Link>
            {open && props.children}
        </li>
    )
}
export default NavItems;
