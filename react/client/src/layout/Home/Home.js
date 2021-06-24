// Import
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SideBarData } from '../../components/SideBar/SideBarData';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as FaIcons from "react-icons/fa";
import TopNav from '../../components/Nav/TopNav';
import NavItems from '../../components/Nav/NavItems';
import DropdownMenus from '../../components/Nav/DropdownMenus';
import TimeAgo from 'react-timeago';
import './Home.css';
import { useAuthDispatch } from '../../context/auth';
// GraphQL mutation
import { gql, useQuery, useMutation } from '@apollo/client';
// GraphQL mutation
const GET_ASSETS = gql`
    query getAssets {
        getAssets {
            email, phone, photo, petName, breed, description, howLong, date, token, availability
        }
    }
`;
// GraphQL mutation
const GET_USER = gql`
    query getUser {
        getUser {
            firstName email phone availability
        }
    }
`;
// GraphQL mutation
const ORDER_CHECK = gql`
    mutation orderCheck($token: String!) {
        orderCheck(token: $token) {
            status message
        }
    }
`;
// GraphQL mutation
const RESET_ORDER = gql`
    mutation resetOrder {
        resetOrder {
            status message
        }
    }
`;
// This will be the font end with props I can use to display data
// { form: { variables, assetData, userData, displayPhone, onChange, onSubmit, resetSubmit } }
function HomeUI() {
    // Hook
    const [variables, setVariables] = useState({
        search: '',
    });
    let displayPhone = "";
    // use history from react-router-dom to redirect
    const history = useHistory();
    // onChange function
    const onChange = (event) => {
        setVariables({
            ...variables,
            search: event.target.value
        });
    };
    const dispatch = useAuthDispatch();
    // GraphQL mutation, think of this as global provider
    const { data: assetData } = useQuery(GET_ASSETS);
    const { data: userData, error: userError } = useQuery(GET_USER);
    if (userData) {
        displayPhone = userData.getUser.phone.substring(0, 2)
            .concat(" (" + userData.getUser.phone.substring(2, 5) + ")")
            .concat(" " + userData.getUser.phone.substring(5, 8))
            .concat(" - " + userData.getUser.phone.substring(8, 15));

    }
    if (userError) {
        dispatch({ type: 'LOGOUT' });
        history.push("/");
    }
    const [orderCheck] = useMutation(ORDER_CHECK, {
        onCompleted(data) {
            if (data) {
                window.location.reload();
            }
        }
    });
    // onSubmit function that will submit the form and the dispatch
    const onSubmit = (token) => {
        if (assetData.getAssets && userData.getUser) {
            assetData.getAssets.filter((value) => {
                if (value.token === token) {
                    if (value.availability === false && userData.getUser.availability === false) {
                        orderCheck({ variables: { token: token } }); // GraphQL mutation // Error when it is not named "variables"
                    }
                }
            });
        }
    }
    const [resetOrder] = useMutation(RESET_ORDER, {
        onCompleted(data) {
            if (data) {
                window.location.reload();
            }
        }
    });
    const resetSubmit = () => {
        resetOrder();
    }
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
                        {(assetData && userData) ?
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
                                </div>]] : null}
                    </div>
                </div>
            </main >
        </div >
    );
}
export default HomeUI;