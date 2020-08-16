import React from 'react';
import { NavLink } from 'react-router-dom';

import StarRating from '../Starrating';

export default function RestaurantOverview(props) {
    const restaurant = props.restaurant;
    const imageStyle = {
        backgroundImage: restaurant.image ? `url(${restaurant.image})` : 'radial-gradient(circle, #fafafa 20%, #d9d9d9 100%)'
    }

    return (
        <NavLink to={`/restaurant-detail/${restaurant.id}`} className="restaurant-overview-item">
            <div className="restaurant-item-header">
                <p>{restaurant.name}</p>
                <p>{restaurant.street}</p>
                <p>{restaurant.city} {restaurant.zip}</p>
                <div className="rating-wrapper">
                    <p>
                        <StarRating restaurant={restaurant} readOnly={true}/>
                    </p>
                    <p>{restaurant.num_reviews}</p>
                </div>
            </div>
            <div className="restaurant-overview-image" style={imageStyle}>

            </div>
        </NavLink>
    )
}