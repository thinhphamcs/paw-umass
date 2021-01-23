import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as ImIcons from "react-icons/im";
import * as FiIcons from "react-icons/fi";

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