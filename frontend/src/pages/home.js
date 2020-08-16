import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import RestaurantContainer from '../containers/RestaurantContainer';
import Loader from '../components/Loader';
import HomeSearchForm from '../components/Home/search';

import { baseUrl } from '../store/constants';

function Homepage(props) {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchQuery = props.home.searchQuery
    let homeURL = 'home/'

    useEffect(() => {
        setLoading(true)
        if (searchQuery.length >  0) {
            homeURL = 'search/?search='+ searchQuery + '&type=restaurant'
        }
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
        const response = fetch(baseUrl + homeURL, config)
        .then(res => res.json())
        .then(data => {
            setRestaurants(data.results);
            setLoading(false)
        })
        .catch(response => {
            return response
        })
    }, [searchQuery])

    return (
        <>
        <HomeSearchForm />
        <div className="center-content">
            <div className="page-title-container">
               <h1>Best rated restaurants</h1>
            </div>
        </div>
        <div className="center-content">
            {loading ? <Loader /> : <RestaurantContainer restaurants={restaurants}/> }
        </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        home: state.home    }
}
const connection = connect(mapStateToProps);
const ConnectedHomepage = connection(Homepage);

export default ConnectedHomepage;