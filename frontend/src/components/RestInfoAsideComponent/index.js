import React from 'react'
import { connect } from 'react-redux'
import { FaClock, FaMoneyCheck } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const RestInfoAside = (props) => {
    let history = useHistory();
    const restaurant = props.restaurant;
    const restID = restaurant.id;
    const imageStyle = {
        backgroundImage: restaurant.image ? `url(${restaurant.image})` : 'radial-gradient(circle, #fafafa 20%, #d9d9d9 100%)'
    }

    const handleClick = () => {
        history.push('/add-review/'+ restID + '/')
   
    }

    return (
        <>
            <ul>
                <li><FaClock size="20"/>
                    <span className="infoTextAside">{restaurant.opening_hours}</span></li>
                <li><FaMoneyCheck size="20" />
                    <span className="infoTextAside">Price level: {restaurant.price_level}</span></li>
            </ul>
            <div className="rest-detail-edit-buttons">
                {props.currentUser.authorized ? 
                <button className="base-button" onClick={handleClick}>Write a review</button> :
                null }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
const connection = connect(mapStateToProps);
const ConnectedRestInfoAside = connection(RestInfoAside);

export default ConnectedRestInfoAside;

/*
                

                {props.currentUser.userData.id === restaurant.user.id ?
                <button className="base-button">Edit Data</button> :
                null
                } 

 */