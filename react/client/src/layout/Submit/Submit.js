// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import './Submit.css';

// This will be the font end with props I can use to display data
function SubmitUI({ form: { onChange, form, submitFormValid, onSubmit, loading, error, limitText } }) {
    return (
        <div className="submit-container">
            <FaIcons.FaAngleDoubleRight className="submit-right-arrow" />
            <div className="submit-container-header">
                <Link to="/home" >
                    <div className="submit-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>
            </div>
            <FaIcons.FaAngleDoubleLeft className="submit-left-arrow" />
            <h2 className="submit-form-title">Submit Your Companion</h2>
            <form className="submit-form-container" >
                {error ?
                    [(error.message === "No files were uploaded" || error.message === "The image is too large") ?
                        <div className="submit-error">{error.message}</div> : null]
                    : null}
                <div className="submit-form-group">
                    <input required className="submit-input" type="text" id="petName" name="petName" placeholder="Pet Name" maxLength="30" value={form.petName} onChange={onChange}></input>
                </div>
                <div className="submit-form-group">
                    <input required className="submit-input" type="text" id="breed" name="breed" placeholder="Pet Breed" maxLength="30" value={form.breed} onChange={onChange}></input>
                </div>
                <div className="submit-form-group">
                    <input required className="submit-file" type="file" id="photo" name="photo" accept="image/*" onChange={onChange}></input>
                </div>
                <div className="submit-form-group">
                    <div className="submit-maximum">
                        <font size="3">(Maximum characters: 100)</font>
                    </div>
                    <textarea required
                        className="submit-input"
                        id="description"
                        name="description"
                        placeholder="Tell us something about your companion"
                        value={form.description}
                        onChange={onChange}
                        maxLength="100"
                        rows="3"
                        onKeyDown={limitText(form.description, 100)}
                        onKeyUp={limitText(form.description, 100)}></textarea>
                    <div className="submit-limit">
                        <font>You have&nbsp;<input readOnly type="text" className="submit-countdown" name="countdown" size="3" value={form.countdown}></input>&nbsp;characters left.</font>
                    </div>
                </div>
                <div className="submit-outer">
                    <div className="submit-inner">
                        <input className="submit-day" type="radio" id="day" name="radio" value="for a day" onChange={onChange}></input>
                        <label className="submit-day-label" htmlFor="day">
                            1 Day
                        </label>
                    </div>
                    <div className="submit-inner">
                        <input className="submit-week" type="radio" id="week" name="radio" value="for a week" onChange={onChange}></input>
                        <label className="submit-week-label" htmlFor="week">
                            1 Week
                        </label>
                    </div>
                    <div className="submit-inner">
                        <input className="submit-forever" type="radio" id="forever" name="radio" value="up for adoption" onChange={onChange}></input>
                        <label className="submit-forever-label" htmlFor="forever">
                            Give Away
                        </label>
                    </div>
                </div>
                <button className="submit-form-button" type="submit" onClick={onSubmit} disabled={submitFormValid || loading} loading={loading.toString()}>
                    <RiIcons.RiHandHeartFill />
                </button>
            </form>
        </div>
    );
}

export default SubmitUI;
