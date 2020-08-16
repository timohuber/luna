import React from 'react';

export default function ProfileAbout(props) {
    const user = props.user;
    return (
        <div className="profile-about-container">
            <p className="profile-subtitle">About {user.first_name}</p>
            <p className="profile-about-subtitle">Location</p>
            <p>{user.location}</p>
            <p className="profile-about-subtitle">Luna member since</p>
            <p>{user.joined}</p>
            <p className="profile-about-subtitle">Description</p>
            <p>{user.description}</p>
        </div>
    );
};