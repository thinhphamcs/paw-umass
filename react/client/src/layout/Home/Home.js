// Import
import React from 'react';

import './Home.css';
import { Link } from 'react-router-dom';
import { SideBarData } from '../../components/SideBar/SideBarData';


import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
// import * as GoIcons from "react-icons/go";

import { Card } from 'react-bootstrap';
import TopNav from '../../components/Navs/TopNav';
import NavItems from '../../components/Navs/NavItems/NavItems';
import DropdownMenus from '../../components/Navs/DropdownMenus/DropdownMenus';
// import { ReactComponent as ProfileIcon } from '../../assets/images/setting-line.svg';
// import { ReactComponent as SubmitIcon } from '../../assets/images/plus-round-line.svg';
// import { ReactComponent as DonateIcon } from '../../assets/images/donation.svg';

// This will be the font end with props I can use to display data
function HomeUI({ form: { loading, error, data, finalDate, imgPath, onSubmit, onChange } }) {
    // const handleUserLogout = () => {
    //     localStorage.clear();
    //     sessionStorage.clear();
    // }
    return (
        <>
            <TopNav>
                {/* <NavItems icon={<GoIcons.GoPlus />} /> */}
                {/* <NavItems icon={<DonateIcon />} /> */}
                <NavItems icon={<BsIcons.BsFillGearFill />} >
                    <DropdownMenus />
                </NavItems>
            </TopNav>
            {/* <button onClick={handleUserLogout}> Log Out</button> */}

            <nav className="nav-bar">
                <ul className="nav-bar-nav">
                    <li className="logo">
                        <Link to="/home" className="nav-link">
                            <span className="link-text">Paw&nbsp;<span className="red">UMass</span>&nbsp;</span>
                            <FaIcons.FaAngleDoubleRight />
                        </Link>
                    </li>
                    {SideBarData.map((page, index) => {
                        return (
                            <li key={index} className="nav-item">
                                <Link to={page.path} className="nav-link">
                                    {page.icon}
                                    <span className="link-text">{page.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <main>
                {/* <div className="card-container"> */}
                {/* col-sm-4 */}
                <div className="row">
                    {data.asset ? data.asset.map((value, index) => (
                        <div className="column" key={index}>
                            <Card>
                                <Card.Img variant="top" src={imgPath + value.photo} />
                                <Card.Body>
                                    <Card.Text>
                                        <b>Name: {value.petName}</b>
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Age: {value.age}</b>
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Description: {value.description}</b>
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Willing to give {value.howLong}</b>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Posted&nbsp;
                                            {finalDate.substr(8, 2) < value.date.substr(8, 2) ?
                                            [finalDate.substr(5, 2) < value.date.substr(5, 2) ?
                                                [(finalDate.substr(0, 4) - value.date.substr(0, 4)) === 0 ? "less than a year" : finalDate.substr(0, 4) - value.date.substr(0, 4) + " year(s) ago"] :
                                                [(finalDate.substr(5, 2) - value.date.substr(5, 2)) === 0 ? "less than a month" : finalDate.substr(5, 2) - value.date.substr(5, 2) + " month(s) ago"]] :
                                            [(finalDate.substr(8, 2) - value.date.substr(8, 2)) === 0 ? "less than a day" : finalDate.substr(8, 2) - value.date.substr(8, 2) + " day(s) ago"]}</small>
                                </Card.Footer>
                                {/* <Button variant="primary">
                                    <FaIcons.FaPaw />
                                </Button> */}
                                {/* onClick={onSubmit} disabled={loginFormValid || loading} loading={loading.toString()} */}
                                <button className="home-form-button" type="submit" ><FaIcons.FaPaw /></button>
                            </Card>
                        </div>
                    )) : null}
                </div>
                {/* </div> */}
            </main >
        </>
    );
}

export default HomeUI;

