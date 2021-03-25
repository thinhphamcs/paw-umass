// Import
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import * as AiIcons from "react-icons/ai";
import './Submit.css';

// This will be the font end with props I can use to display data
function SubmitUI({ form: { onChange, form, submitFormValid, onSubmit, loading, error, limitText } }) {
    return (
        <div className="submit-container">
            <AiIcons.AiOutlineArrowRight className="submit-right-arrow" />
            <div className="submit-container-header">
                <Link to="/home" >
                    <div className="submit-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>
            </div>
            <AiIcons.AiOutlineArrowLeft className="submit-left-arrow" />
            <h2 className="submit-form-title">Submit Your Companion</h2>
            <form className="submit-form-container" encType="multipart/form-data">
                {error ? error.message : null}
                <div className="submit-form-group">
                    <input required className="submit-input" type="text" id="petName" name="petName" placeholder="Pet Name" value={form.petName} onChange={onChange}></input>
                </div>
                <div className="submit-form-group">
                    <input required className="submit-input" type="number" id="age" name="age" placeholder="Age" value={form.age} onChange={onChange}></input>
                </div>
                <div className="submit-form-group">
                    {/* Learn about accept attribute and multipart/form-data for form in encType */}
                    <input required className="submit-file" type="file" id="photo" name="photo" accept="image/*" value={form.photo} onChange={onChange}></input>
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
                        <font>You have<input readOnly type="text" className="submit-countdown" name="countdown" size="3" value={form.countdown}></input>characters left.</font>
                    </div>
                </div>
                <div className="submit-outer">
                    <div className="submit-inner">
                        <input className="submit-day" type="radio" id="day" name="radio" value="day" onChange={onChange}></input>
                        <label className="submit-day-label" htmlFor="day">
                            1 Day
                        </label>
                    </div>
                    <div className="submit-inner">
                        <input className="submit-week" type="radio" id="week" name="radio" value="week" onChange={onChange}></input>
                        <label className="submit-week-label" htmlFor="week">
                            1 Week
                        </label>
                    </div>
                    <div className="submit-inner">
                        <input className="submit-forever" type="radio" id="forever" name="radio" value="forever" onChange={onChange}></input>
                        <label className="submit-forever-label" htmlFor="forever">
                            Give Away
                        </label>
                    </div>
                </div>
                <button className="submit-form-button" onClick={onSubmit} disabled={submitFormValid || loading} loading={loading.toString()} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SubmitUI;
