import React from 'react';

import Restaurant from '../../components/RestaurantOverview'

export default function RestaurantOverview(props) {
    return (
        <div className="restaurant-overview">
            {props.restaurants.map( restaurant => {
                return <Restaurant restaurant={restaurant} key={restaurant.id}/>
            })}
        </div>
    )
}