import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import searchIcon from '../images/search-icon.svg';

export const Navbar = (props) => {
    const {search, onSearchInputChange, onSearchClick} = props;
     

    return (
        <div className="header flex-container">
            <div className="logo flex-item-left"><Link to="/"><img src= {logo} alt="the-peak" width="180px"/></Link></div>
            <div className="searchbar flex-item-right">
                <input type="text" placeholder="Search news here" id="myText" value={search} onChange={onSearchInputChange} className="searchInputField"/>
                <button onClick={onSearchClick}><img src={searchIcon} alt="searchIcon"/></button>
            </div>
        </div>
    )
}
