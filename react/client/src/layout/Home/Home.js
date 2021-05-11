// Import
import React from 'react';
import { Link } from 'react-router-dom';
import { SideBarData } from '../../components/SideBar/SideBarData';
import { Card } from 'react-bootstrap';
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import TopNav from '../../components/Nav/TopNav';
import NavItems from '../../components/Nav/NavItems';
import DropdownMenus from '../../components/Nav/DropdownMenus';
import TimeAgo from 'react-timeago';
import './Home.css';

// This will be the font end with props I can use to display data
function HomeUI({ form: { loading, error, data, finalDate, imgPath, searchTerm, onSubmit, onChange } }) {
    return (
        <div className="all-container">
            <div className="home-container">
                <TopNav>
                    <div className="search-container">
                        <div className="search-wrap">
                            <div className="search-box">
                                <input type="text" className="search-input" id="search" name="search" placeholder="Search..." onChange={onChange}></input>
                                <button className="search-button">
                                    <BsIcons.BsSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                    <NavItems icon={<BsIcons.BsFillGearFill />} >
                        <DropdownMenus />
                    </NavItems>
                </TopNav>
                <nav className="nav-bar">
                    <ul className="nav-bar-nav">
                        <li className="logo">
                            <Link to="/home" className="nav-link">
                                <span className="link-text">Paw&nbsp;UMass&nbsp;</span>
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
            </div>
            <main>
                <div className="asset-container">
                    <div className="row">
                        {data.asset ? data.asset.filter((value) => {
                            if (searchTerm.search === "") {
                                return (
                                    <div className="column">
                                        <Card>
                                            <Card.Img variant="top" src={imgPath + value.photo} />
                                            <Card.Body>
                                                <Card.Text>
                                                    <b>Name: {value.petName}</b>
                                                </Card.Text>
                                                <Card.Text>
                                                    <b>Breed: {value.breed}</b>
                                                </Card.Text>
                                                <Card.Text>
                                                    <b>Description: {value.description}</b>
                                                </Card.Text>
                                                <Card.Text>
                                                    <b>Willing to give {value.howLong}</b>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <small className="text-muted">Posted&nbsp;<TimeAgo date={value.date} /></small>
                                            </Card.Footer>
                                            <button className="home-form-button" type="submit" ><FaIcons.FaPaw /></button>
                                        </Card>
                                    </div>
                                );
                            }
                            else if (value.breed.toString().toLowerCase().includes(searchTerm.search.toString().toLowerCase())) {
                                return (
                                    <div className="column">
                                        <Card>
                                            <Card.Img variant="top" src={imgPath + value.photo} />
                                            <Card.Body>
                                                <Card.Text>
                                                    <b>Name: {value.petName}</b>
                                                </Card.Text>
                                                <Card.Text>
                                                    <b>Breed: {value.breed}</b>
                                                </Card.Text>
                                                <Card.Text>
                                                    <b>Description: {value.description}</b>
                                                </Card.Text>
                                                <Card.Text>
                                                    <b>Willing to give {value.howLong}</b>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <small className="text-muted">Posted&nbsp;<TimeAgo date={value.date} /></small>
                                            </Card.Footer>
                                            <button className="home-form-button" type="submit" ><FaIcons.FaPaw /></button>
                                        </Card>
                                    </div>
                                );
                            }
                            // Return something here
                        }).map((value, index) => (
                            <div className="column" key={index}>
                                <Card>
                                    <Card.Img variant="top" src={imgPath + value.photo} />
                                    <Card.Body>
                                        <Card.Text>
                                            <b>Name: {value.petName}</b>
                                        </Card.Text>
                                        <Card.Text>
                                            <b>Breed: {value.breed}</b>
                                        </Card.Text>
                                        <Card.Text>
                                            <b>Description: {value.description}</b>
                                        </Card.Text>
                                        <Card.Text>
                                            <b>Willing to give {value.howLong}</b>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Posted&nbsp;<TimeAgo date={value.date} /></small>
                                        <button className="home-form-button" type="submit" ><FaIcons.FaPaw /></button>
                                    </Card.Footer>

                                </Card>
                            </div>
                        )) : null}
                    </div>
                </div>
            </main >
        </div>
    );
}

export default HomeUI;

