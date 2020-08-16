import React from 'react';
import { NavLink } from 'react-router-dom';
import defaultAvatar from '../../assets/default_avatar.jpg'

export default function UserOverview(props) {
    const user = props.user;

    const avatarStyle = {
        backgroundImage: user.profile_picture ? `url(${user.profile_picture})` : `url(${defaultAvatar})`
    }

    return (
        <NavLink to={`/user/${user.id}/`}  className="user-overview-item">
            <div className="user-item-header">
                <div className="user-item-avatar" style={avatarStyle}></div>
                <div className="user-item-header-info">
                    <h3>{user.first_name} {user.last_name}</h3>
                    <p className="smaller">{user.num_reviews} reviews in total</p>
                </div>
            </div>
            <div className="user-item-content">
                <p className="smaller">{user.description}</p>
            </div>
        </NavLink>
    )
}