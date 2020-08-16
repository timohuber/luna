import React from 'react';
import StarRating from '../../Starrating';

export default function RestaurantInProfile(props) {
    const restaurant = props.restaurant

    return (
        <div className="restaurant">
            <p>{restaurant.name}</p>
            <StarRating restaurant={restaurant} readOnly={true}/>
            <p className="smaller">{restaurant.street}</p>
            <p className="smaller">{restaurant.zip} {restaurant.city}</p>
            <p className="smaller">{restaurant.phone}</p>
        </div>
    );
};