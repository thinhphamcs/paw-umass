// Imports
import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as ImIcons from "react-icons/im";
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
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Submit',
        path: '/user/submit',
        icon: <ImIcons.ImFileText />,
        className: 'nav-text'
    },
    {
        title: 'Donate',
        path: '/user/donate',
        icon: <FaIcons.FaDonate />,
        className: 'nav-text'
    }
];