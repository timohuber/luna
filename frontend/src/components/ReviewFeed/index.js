import React, {useState} from 'react';
import ReviewPost from '../ReviewPost';

const ReviewFeed = (props) => {
    return (
        <>
        {props.reviews.map( review => {
            return <ReviewPost review={review} key={review.id}/>
        })}
    </>
    )
}

export default ReviewFeed;

