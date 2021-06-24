// Import
import React from 'react';
import { Link } from 'react-router-dom';
import { SideBarData } from '../../components/SideBar/SideBarData';
import { Card } from 'react-bootstrap';
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as FaIcons from "react-icons/fa";
import TopNav from '../../components/Nav/TopNav';
import NavItems from '../../components/Nav/NavItems';
import DropdownMenus from '../../components/Nav/DropdownMenus';
// import TimeAgo from 'react-timeago';
import './Home.css';
// // This will be the font end with props I can use to display data
function HomeUI({ form: { variables, assetData, userData, displayPhone, onChange, onSubmit, resetSubmit } }) {
    return (
        <div className="all-container" >
            <div className="home-container" >
                <TopNav>
                    <div className="search-container" >
                        <div className="search-wrap" >
                            <div className="search-box" >
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
                <nav className="nav-bar" >
                    <ul className="nav-bar-nav" >
                        <li className="logo" >
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
                <div className="home-body">
                    <div className="home-content">
                        {assetData ? [assetData.getAssets.length === 0 ? <div className="home-error" >Be the first to upload</div> : null] : null}
                        {/* {(assetData && userData) ?
                            [assetData.getAssets.length === 0 ? <div className="home-error" >Be the first to upload</div> : [userData.getUser.availability === false ?
                                <div className="asset-container" >
                                    <div className="row" >
                                        {assetData.getAssets ? assetData.getAssets.filter((value) => {
                                            if (variables.search === "" || (value.breed.toString().toLowerCase().includes(variables.search.toString().toLowerCase()))) {
                                                return value;
                                            }
                                            // Return something here but it will break the filter
                                        }).map((value, index) => (
                                            <div className="column" key={index}>
                                                <Card>
                                                    <Card.Img variant="top" src={value.photo} />
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
                                                        {value.availability === true ?
                                                            <button className="home-form-button" disabled={value.availability}><CgIcons.CgUnavailable /></button> :
                                                            <button className="home-form-button" type="submit" onClick={() => { onSubmit(value.token) }}><FaIcons.FaPaw /></button>}
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        )) : null}
                                    </div>
                                </div>
                                :
                                <div className="home-next" >
                                    DEAR {userData ? userData.getUser.firstName.toUpperCase() : null}, <br /><br />
                                    WE ARE CURRENTLY PROCESSING YOUR ORDER<br /><br />
                                    CHECK YOUR EMAIL AND/OR YOUR PHONE FOR A TEXT MESSAGE WITH THE INSTRUCTIONS FOR THE NEXT STEP.<br /><br />
                                    WE WILL CONTACT YOU WITH THE INFORMATION YOU PROVIDED:<br /><br />
                                    EMAIL: {userData ? userData.getUser.email.toUpperCase() : null}<br /><br />
                                    PHONE: {userData ? displayPhone : null}<br /><br />
                                    <button className="home-next-button" onClick={resetSubmit}>CHANGE YOUR MIND?</button>
                                </div>]] : null}                                                                     */}
                    </div>
                </div>
            </main >
        </div >
    );
}
export default HomeUI;