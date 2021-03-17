// Imports
import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as ImIcons from "react-icons/im";
import * as FiIcons from "react-icons/fi";

/**
 * We export each icon with:
 * Title: Which title does this icon belong to?
 * Path: Which API path route?
 * Icon: Which icon does it belong to form react-icons?
 * ClassName: className so we can do some css after
 */
export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Donate',
        path: '/donate',
        icon: <FaIcons.FaDonate />,
        className: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <ImIcons.ImProfile />,
        className: 'nav-text'
    },
    {
        title: 'Submit',
        path: '/submit',
        icon: <MdIcons.MdPets />,
        className: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <FiIcons.FiLogOut />,
        className: 'nav-text'
    },
];