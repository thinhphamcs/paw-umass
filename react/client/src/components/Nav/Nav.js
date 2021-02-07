import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import logo from '../logo.png';
import { SideBarData } from '../SideBar/SideBarData';

const Nav = () => {
    const [sidebar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sidebar);
    return (
        <>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSideBar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSideBar}>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    <li>
                        {SideBarData.map((page, index) => {
                            return (
                                <li key={index} className={page.className}>
                                    <Link to={page.path}>
                                        {page.icon}
                                        <span>{page.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </li>
                </ul>
            </nav>

            {/* <div className="logoImage">
                <img src={logo} alt="Logo" />
            </div> */}
        </>
    );
}

export default Nav;
