import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { baseUrl } from '../../../store/constants';

import Loader from '../../Loader'

import ReviewsContainer from '../../../containers/ReviewsContainer'
import UserContainer from '../../../containers/UserContainer';
import RestaurantContainer from '../../../containers/RestaurantContainer';

function SearchFeed(props) {
    const [restaurants, setRestaurants] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    let activeContainer = props.search.activeContainer;
    let searchQuery = props.search.searchQuery;

    let serachURL = `search/?search=${searchQuery}&type=${activeContainer.toLowerCase()}`;

    const Components = {
        Restaurant: <RestaurantContainer restaurants={restaurants}/>,
        Review: <ReviewsContainer reviews={reviews}/>,
        User: <UserContainer users={users}/>,
    };

    useEffect(() => {
        setLoading(true)
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
        const response = fetch(baseUrl + serachURL, config)
        .then(res => res.json())
        .then(data => {

            switch(activeContainer) {
                case 'Restaurant':
                    setRestaurants(data.results)
                    break;
                case 'Review':
                    setReviews(data.results)
                    break;
                case 'User':
                    setUsers(data.results)
            }
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [activeContainer, searchQuery])

    return (
        <>
        {loading ? 
        <Loader /> : 
        Components[props.search.activeContainer]
        }
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        search: state.search    }
}
const connection = connect(mapStateToProps);
const ConnectedSearchFeed = connection(SearchFeed);

export default ConnectedSearchFeed;

