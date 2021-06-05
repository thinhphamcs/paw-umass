// Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SideBarData } from '../../components/SideBar/SideBarData';
import { Card } from 'react-bootstrap';
// import { axiosInstance } from '../../helpers/axiosInstance';
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as FaIcons from "react-icons/fa";
import TopNav from '../../components/Nav/TopNav';
import NavItems from '../../components/Nav/NavItems';
import DropdownMenus from '../../components/Nav/DropdownMenus';
import TimeAgo from 'react-timeago';
import './Home.css';

// This will be the font end with props I can use to display data
// , resetSubmit
function HomeUI({ form: { variables, data, error, onChange } }) {
    // Hook
    /**
     * const [testing, setTesting] = useState("");
     */
    // if (data.asset) {
    //     data.asset.filter((value) => {
    //         if (value.token === testing) {
    //             if ((value.availability === 0 && sessionStorage.availability === "0") || (value.availability === 0 && localStorage.availability === "0")) {
    //                 //     axiosInstance()
    //                 //         .post("/user/check-out", {
    //                 //             testing
    //                 //         }).then(res => {
    //                 //             if (res.data.check) {
    //                 //                 window.location.reload();
    //                 //             }
    //                 //         })
    //                 //         .catch(err => {
    //                 //             console.log(err);
    //                 //         });
    //                 // }
    //             }
    //         });
    // }
    if (data !== undefined) {
        console.log(data);
        // data.getAssets.map((value, index) => (
        //     console.log(value.email)
        // ));
    }

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
                <div className="home-body">
                    <div className="home-content">
                        {/* {errors.image ? <div className="submit-error">{errors.image}</div> : null} */}
                        {error ?
                            [error.message === "Assets no longer exist" ? <div className="home-error" key='12'>Be the first to upload</div> : null] :
                            [data ?
                                <div className="asset-container" key='13'>
                                    <div className="row" key='14'>
                                        {data.getAssets ? data.getAssets.filter((value) => {
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
                                                            // onClick={() => { setTesting(value.token) }}
                                                            <button className="home-form-button" type="submit"><FaIcons.FaPaw /></button>}
                                                    </Card.Footer>
                                                </Card>
                                            </div>
                                        )) : null}
                                    </div>
                                </div>
                                :
                                <div className="home-next" key='17'>
                                    {/* {data.getUser.firstName ? data.getUser.firstName.toUpperCase() : null} */}
                                    {/* {data.getAssets.email ? data.getAssets.email.toUpperCase() : null} */}
                                    {/* {data.getAssets.phone ? data.getAssets.phone : null} */}
                                    DEAR , <br /><br />
                            WE ARE CURRENTLY PROCESSING YOUR ORDER<br /><br />
                            CHECK YOUR EMAIL AND/OR YOUR PHONE FOR A TEXT MESSAGE WITH THE INSTRUCTIONS FOR THE NEXT STEP.<br /><br />
                            WE WILL CONTACT YOU WITH THE INFORMATION YOU PROVIDED:<br /><br />
                            EMAIL: <br /><br />
                            PHONE: <br /><br />
                                    {/* onClick={resetSubmit} */}
                                    <button className="home-next-button" >CHANGE YOUR MIND?</button>
                                </div>]}
                    </div>
                </div>
            </main >
        </div >
    );
}

export default HomeUI;

