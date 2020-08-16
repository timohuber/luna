import React from 'react';
import { NavLink } from 'react-router-dom';

import RestaurantInProfile from '../../components/Profile/RestaurantInProfile'

export default function RestaurantsInProfileContainer(props) {
    return (
        <>
            {props.restaurants.map( restaurant => {
                return <RestaurantInProfile restaurant={restaurant} key={restaurant.id}/>
            })}
            <NavLink to='/create-restaurant' className="btn">Add restaurant</NavLink>
        </>
    )
}