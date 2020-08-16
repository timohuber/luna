import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ReviewOverview(props) {
    const review = props.review;
    return (
        <div className="review-overview-item">{review.id}</div>
    )
}