// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo3.png';
import * as FaIcons from "react-icons/fa";
import './About.css';

// This will be the font end with props I can use to display data
function AboutUI() {
    return (
        <div className="about-container">
            <FaIcons.FaAngleDoubleRight className="about-right-arrow" />
            <div className="about-container-header">
                <Link to="/" >
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="about-left-arrow" />
            <div className="about-body">
                <div className="about-content">
                    <h2><strong>About PawUMass</strong></h2>
                    PawUMass website is designed with one purpose in mind to help students,
                    mostly college students, get through difficult semesters.
                    Currently, most universities do not allow pets in dorms unless it is for emotional support.
                    Therefore, imagine owning a pet for just one day without the responsibility of actually own a pet,
                    walking your favorite dog breed around the campus, playing fetch,
                    or simply just sitting on the grass and petting the dog for hours.
                    When the time comes, return the pet to us with no paperwork, no complaints from RA,
                    and most importantly no charge.
                    <br /><br />
                    PawUMass website operates entirely on donations.
                    The animals will be from shelters or actual users.
                    Not all animals and pets get adopted in shelters.
                    Some stay in their cage for days, maybe even longer.
                    So if those animals get to go outside or getting a little bit of appreciation
                    from students would at least ease their stress a little.
                    Both students and shelters will benefit from this website.
                </div>
            </div>
        </div>
    );
}

export default AboutUI;

