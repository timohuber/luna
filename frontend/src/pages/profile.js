import React, {useState, useEffect} from 'react';
import Loader from '../components/Loader';
import { connect } from 'react-redux'

import ProfileNavigation from '../components/Profile/ProfileNavigation';

import ProfileFeed from '../components/Profile/ProfileFeed';
import ProfileAbout from '../components/Profile/ProfileAbout';

import { baseUrl } from '../store/constants';

function ProfilePage(props) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const userURL = props.match.params.id ? props.match.params.id : 'me';
    const accessToken = props.currentUser.accessToken;
    
    useEffect(() => {
        setLoading(true)
        if (accessToken) {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            })
        }
        const response = fetch(baseUrl + 'users/' + userURL + '/', config)
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setLoading(false)
        })
        .catch(response => {
            return
        })
        }
    }, [accessToken, props.currentUser])


    const bannerStyle = {
        backgroundImage: user.banner ? `url(${user.banner})` : 'radial-gradient(circle, #fafafa 20%, #d9d9d9 100%)'
    }

    return (
        <>
        <div className="profile-banner" style={bannerStyle}>

        </div>
        <div className="center-content">
            {loading ? <Loader /> : 
                <div className="profile-container">
                    <ProfileNavigation user={user}/>
                    <div className="profile-center-container">
                        <ProfileFeed user={user}/>
                    </div>
                    <ProfileAbout user={user}/>
                </div>
            }
        </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser    
    }
}
const connection = connect(mapStateToProps);
const ConnectedProfilePage = connection(ProfilePage);

export default ConnectedProfilePage;


/*
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.currentUser.accessToken}`
            })
        }
        const response = fetch(baseUrl + 'users/me/', config)
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [])
*/