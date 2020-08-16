import React from 'react';
import { useDispatch, connect } from 'react-redux';

import starIcon from '../../../assets/icons/star.svg'
import commentIcon from '../../../assets/icons/comment.svg'
import restaurantIcon from '../../../assets/icons/restaurant.svg'
import editIcon from '../../../assets/icons/edit.svg'
import defaultAvatar from '../../../assets/default_avatar.jpg'

import { switchProfileContainer } from '../../../store/actions/profileActions'


function ProfileNavigation(props) {
    const user = props.user;
    const dispatch = useDispatch()

    const switchContainer = container => {
        dispatch(switchProfileContainer(container))
    }
    const profilePicStyle = {
        backgroundImage: user.profile_picture ? `url(${user.profile_picture})` : `url(${defaultAvatar})`
    }

    return (
        <div className="profile-navigation-container">
            <div className="profile-avatar" alt="avatar" style={profilePicStyle}/>
            <p className="profile-navigation-title">{user.first_name}'s Profile</p>
            <nav className="profile-navigation">
                <a onClick={ e => switchContainer('Reviews')}  ><img src={starIcon}/>Reviews</a>
                <a onClick={ e => switchContainer('Comments')} ><img src={commentIcon}/>Comments</a>
                <a onClick={ e => switchContainer('Restaurants')} ><img src={restaurantIcon}/>Restaurants</a>
                {user.id === props.currentUser.userData.id ?
                <a onClick={ e => switchContainer('EditProfile')} ><img src={editIcon}/>Edit profile</a> :
                null
                }
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser    
    }
}
const connection = connect(mapStateToProps);
const ConnectedProfileNavigation = connection(ProfileNavigation);

export default ConnectedProfileNavigation;