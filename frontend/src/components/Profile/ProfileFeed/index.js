import React from 'react';
import { connect } from 'react-redux'


import ReviewFeed from '../../ReviewFeed'
import CommentsInProfileContainer from '../../../containers/CommentsProfileContainer';
import RestaurantsInProfileContainer from '../../../containers/RestaurantsInProfileContainer';
import EditProfileForm from '../EditProfileForm';


function ProfileFeed(props) {
    const user = props.user;
    const Components = {
        Reviews: <><p className="profile-subtitle">Reviews</p> <ReviewFeed reviews={user.reviews}/></>,
        Comments: <><p className="profile-subtitle">Comments</p> <CommentsInProfileContainer comments={user.comments}/></>,
        Restaurants: <><p className="profile-subtitle">Restaurants</p> <RestaurantsInProfileContainer restaurants={user.restaurants}/></>,
        EditProfile: <><p className="profile-subtitle">Edit userprofile</p> <EditProfileForm user={user}/></>
    };

    return Components[props.profile.activeContainer]
};

const mapStateToProps = (state) => {
    return {
        profile: state.profile    }
}
const connection = connect(mapStateToProps);
const ConnectedProfileFeed = connection(ProfileFeed);

export default ConnectedProfileFeed;