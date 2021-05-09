import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import './Nav.css';

function DropdownMenus(props) {
    const [activateMenu, setActivateMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }
    function DropdownItems(props) {
        return (
            <Link to={props.link ? props.link : "#"} className="top-menu-item" onClick={() => props.goToMenu && setActivateMenu(props.goToMenu)}>
                <span className="top-left-icon">{props.leftIcon}</span>
                <span className="top-item-text">{props.children}</span>
            </Link>
        )
    }

    function DropDownLogOut(props) {
        return (
            <Link to="/home" className="top-menu-item" onClick={logout}>
                <span className="top-left-icon">{props.leftIcon}</span>
                <span className="top-item-text">{props.children}</span>
            </Link>
        )
    }
    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
    }
    return (
        <div className="drop-down" style={{ height: menuHeight }}>
            <CSSTransition
                in={activateMenu === 'main'}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItems leftIcon={<ImIcons.ImProfile />} goToMenu="settings">My Profile</DropdownItems>
                    <DropDownLogOut leftIcon={<FiIcons.FiLogOut />}>Log Out</DropDownLogOut>
                </div>
            </CSSTransition>
            <CSSTransition
                in={activateMenu === 'settings'}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItems leftIcon={<FaIcons.FaPen />} link="/settings/profile">Update Profile</DropdownItems>
                    <DropdownItems leftIcon={<BsIcons.BsFillUnlockFill />} link="/settings/change">Change Password</DropdownItems>
                    <DropdownItems leftIcon={<FaIcons.FaTrash />} link="/settings/deactivate">Deactivate Profile</DropdownItems>
                    <DropdownItems leftIcon={<AiIcons.AiOutlineRollback />} goToMenu="main">Back</DropdownItems>
                </div>
            </CSSTransition>
        </div>
    )
}

export default DropdownMenus;
