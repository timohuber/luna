import React from 'react';
import CreateRestaurantForm from '../containers/CreateRestaurantForm'

export default function CreateRestaurantPage(props) {
    return (
        <>
            <div className="page-title-container">
                <h1>Create new Restaurant</h1>
            </div>
            <div className="center-content create-restaurant-form-container">
                <CreateRestaurantForm />
            </div>
        </>
    );
}
