import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import * as CgIcons from "react-icons/cg";
import * as FiIcons from "react-icons/fi";
import '../Nav.css';

function DropdownMenus(props) {
    const [activateMenu, setActivateMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }
    function DropdownItems(props) {
        return (
            <Link to="#" className="top-menu-item" onClick={() => props.goToMenu && setActivateMenu(props.goToMenu)}>
                <span className="top-left-icon">{props.leftIcon}</span>
                {props.children}
                <span className="top-right-icon">{props.rightIcon}</span>
            </Link>
        )
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
                    <DropdownItems leftIcon={<CgIcons.CgProfile />} goToMenu="settings">My Profile</DropdownItems>
                    <DropdownItems leftIcon={<FiIcons.FiLogOut />}>Log Out</DropdownItems>
                </div>
            </CSSTransition>
            <CSSTransition
                in={activateMenu === 'settings'}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary">
                <div className="menu">
                    <DropdownItems rightIcon={<CgIcons.CgProfile />}>View Profile</DropdownItems>
                    <DropdownItems rightIcon={<CgIcons.CgProfile />}>Change Profile</DropdownItems>
                    <DropdownItems rightIcon={<CgIcons.CgProfile />}>Change Password</DropdownItems>
                    <DropdownItems rightIcon={<CgIcons.CgProfile />}>Deactivate Profile</DropdownItems>
                </div>
            </CSSTransition>
        </div>
    )
}

export default DropdownMenus;
