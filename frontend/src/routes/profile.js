import React from 'react';
import ProfilePage from "../pages/profile";

export default function Profile(props) {
    return (
        <ProfilePage match={props.match}/>
    )
}
