import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import logo from '../logo.png';

const Nav = () => {
    const { sidebar, setSideBar } = useState(false);

    const showSideBar = () => setSideBar(!sidebar);
    return (
        <nav>
            <div className="logoImage">
                <img src={logo} alt="Logo" />
            </div>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSideBar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/register">Register</Link>
                    </li> */}
                </ul>
            </nav>
        </nav>
    )
}

export default Nav;
