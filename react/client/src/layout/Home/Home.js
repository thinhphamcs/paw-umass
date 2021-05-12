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
function HomeUI({ form: { loading, error, data, imgPath, searchTerm, onSubmit, onChange } }) {
    return (
        <div className="all-container" key='9'>
            <div className="home-container" key='10'>
                <TopNav>
                    <div className="search-container" key='11'>
                        <div className="search-wrap" key='4'>
                            <div className="search-box" key='5'>
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
                <nav className="nav-bar" key='6'>
                    <ul className="nav-bar-nav" key='7'>
                        <li className="logo" key='8'>
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
                {error ?
                    [error.message === "Assets no longer exist" ? <div className="home-error" key='12'>Be the first to upload</div> : null] :
                    [(sessionStorage.availability === "0" || localStorage.availability === "0") ?
                        <div className="asset-container" key='13'>
                            <div className="row" key='14'>
                                {data.asset ? data.asset.filter((value) => {
                                    if (searchTerm.search === "") {
                                        return (
                                            <div className="column" key='15'>
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
                                            <div className="column" key='16'>
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
                                                <button className="home-form-button" type="submit" onClick={onSubmit(value)}><FaIcons.FaPaw /></button>
                                            </Card.Footer>

                                        </Card>
                                    </div>
                                )) : null}
                            </div>
                        </div>
                        :
                        <div className="home-next" key='17'>
                            DEAR {sessionStorage.firstName ? sessionStorage.firstName.toUpperCase() : [localStorage.firstName ? localStorage.firstName.toUpperCase() : null]}, <br /><br />
                            WE ARE CURRENTLY PROCESSING YOUR ORDER<br /><br />
                            CHECK YOUR EMAIL AND/OR YOUR PHONE FOR A TEXT MESSAGE WITH THE INSTRUCTIONS FOR THE NEXT STEP.<br /><br />
                            WE WILL CONTACT YOU WITH THE INFORMATION YOU PROVIDED:<br /><br />
                            EMAIL: {sessionStorage.email ? sessionStorage.email.toUpperCase() : [localStorage.email ? localStorage.email.toUpperCase() : null]}<br /><br />
                            PHONE: {sessionStorage.phone ? sessionStorage.phone : [localStorage.phone ? localStorage.phone : null]}<br /><br />
                            <button class="home-next-button">CHANGE YOUR MIND?</button>
                        </div>]}
            </main >
        </div >
    );
}

export default HomeUI;

