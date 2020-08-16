import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import headerLogo from "../../assets/icons/header_logo.png"

const Header = (props) => {
    return (
        <header className="site-header">
            <NavLink to={"/"}><img className="header-logo" src={headerLogo}/></NavLink>
            <nav className="main-navigation">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/search">Search</NavLink>
                {props.authorized ? 
                    <NavLink to="/profile">Profile</NavLink> : 
                    null
                }
                <div className="log-in-buttons">
                    <NavLink to="/registration" className="button-header sign-up">Signup</NavLink>
                    {props.authorized ? 
                        <NavLink to="/" className="button-header sign-up">Logout</NavLink> : 
                    <NavLink to="/login" className="button-header login">Login</NavLink>
                    }
                </div>
            </nav>
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        authorized: state.currentUser.authorized
    }
}
const connection = connect(mapStateToProps);
const ConnectedHeader = connection(Header);

export default ConnectedHeader;