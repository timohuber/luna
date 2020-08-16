import React from 'react';

import ReviewPost from '../../components/ReviewPost'

export default function ReviewsContainer(props) {
    return (
        <div className="reviews-overview">
            {props.reviews.map( review => {
                return <ReviewPost review={review} key={review.id}/>
            })}
        </div>
    )
}