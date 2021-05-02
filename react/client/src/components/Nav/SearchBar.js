import React from 'react';
import * as BsIcons from 'react-icons/bs';
import './Nav.css';

function SearchBar() {
    return (
        <div className="search-container">
            <div className="search-wrap">
                <div className="search-box">
                    <input type="text" className="search-input" placeholder="Search..."></input>
                    {/* onClick={onSubmit} disabled={submitFormValid || loading} loading={loading.toString()} */}
                    <button className="search-button" type="submit">
                        <BsIcons.BsSearch />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;
