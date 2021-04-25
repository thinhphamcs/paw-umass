import React from 'react'; //, { useState } 
import { Link } from 'react-router-dom';
import './Nav.css';
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import logo from '../logo.png';
// import { SideBarData } from '../SideBar/SideBarData';

// We export it as component so we can use it somewhere else
const Nav = () => {
    // // Hook
    // const [sidebar, setSideBar] = useState(false);

    // // Function to display the side bar
    // const showSideBar = () => setSideBar(!sidebar);
    return (
        <>
            {/* <div className='nav-bar'>
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
                </ul>
            </nav> */}
            <nav className="nav-bar"></nav>

            {/* <div className="logoImage">
                <img src={logo} alt="Logo" />
            </div> */}
        </>
    );
}

export default Nav;
