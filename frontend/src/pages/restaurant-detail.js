import React, {useState, useEffect} from 'react';
import StarRating from '../components/Starrating';
import ReviewFeed from '../components/ReviewFeed';
import RestInfoAside from '../components/RestInfoAsideComponent';
import RestInfoMap from '../components/RestInfoMapComponent';

import Loader from '../components/Loader';

import { baseUrl } from '../store/constants';

export default function RestaurantDetail(props) {
    const [restaurant, setRestaurant] = useState({});
    const [loading, setLoading] = useState(true);
    const restID = props.match.params.id;

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
        const response = fetch(baseUrl + 'restaurants/'+ restID + '/', config)
        .then(res => res.json())
        .then(data => {
            setRestaurant(data);
            setLoading(false)
        })
        .catch(response => {
            return
        })
    }, [])

    if (loading) {
        return (<Loader />)

    } else {

    return (
    <>
        <div
            className="upperSection"
            style={{ backgroundImage:`url(${restaurant.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
            }}>
            <div className="restaurantHead">
                <h3 className="restaurantName"> {restaurant.name}</h3>
                <p className="restaurantCategory">{restaurant.category}</p>
                <StarRating restaurant={restaurant} readOnly={true}/><span className="restaurantRating">{restaurant.num_reviews} reviews</span>
            </div>
            <div className="restInfoMapContainer">
                <RestInfoMap restaurant={restaurant}/>
            </div>
        </div>
        <div className="lowerSection center-content">
            <div className="reviewFeed">
                <ReviewFeed reviews={restaurant.reviews} />
            </div>
            <div className="info-container-rest-detail">
                <RestInfoAside restaurant={restaurant} />
            </div>

        </div>
    </>
    );

    }

}
