import React from 'react';
import RestaurantDetail from "../pages/restaurant-detail.js";

export default function Restaurant(props) {
    return (
        <RestaurantDetail match={props.match}/>
    )
}
