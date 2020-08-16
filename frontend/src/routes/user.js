import React from 'react';
import ProfilePage from "../pages/profile";

export default function User(props) {
    return (
        <ProfilePage match={props.match}/>
    )
}
