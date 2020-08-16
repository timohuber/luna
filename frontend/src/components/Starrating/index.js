import React, {useState} from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = (props) => {
    let isReadOnly = props.readOnly;
    let averageRating;
    const [hover, setHover] = useState(null);

    if (isReadOnly && props.restaurant) {
        averageRating = Math.ceil(props.restaurant.average_rating);
    } else if (isReadOnly && props.review) {
        averageRating = Math.ceil(props.review.rating);
    } else {
        averageRating = props.ratingFromAddReview;
    }

    /* fake rating */
    // averageRating = 3.5;
    
    if (isReadOnly) {
        return (
            <>
             {[...Array(5)].map((star, i) => {
                    return <FaStar
                    className="star"
                    color={
                        i < averageRating ? "#F8E71C" : 
                        averageRating - i == 0.5 ? "linear-gradient(90deg, rgba(248,231,28,1) 0%, rgba(248,231,28,1) 50%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)" : 
                        "rgba(235, 235, 235, 0.5)"}
                    size={20}
                    pointerEvents= {isReadOnly ? "none" : "all" }
                />
             })}
            </>
        )
    } else {
    return (
        <>
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
                <label className="starRating">
                    <input
                        type="radio"
                        name="rating"
                        value={props.ratingFromAddReview}
                        onClick={(e) => props.onChangeRating(ratingValue)}
                        disabled={isReadOnly}
                    />
                    <FaStar
                        className="star"
                        color={ratingValue <= (hover || props.ratingFromAddReview) ? "#F8E71C" : "rgba(235, 235, 235, 0.5)" }
                        size={20}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        pointerEvents= {isReadOnly ? "none" : "all" }
                    />
                </label>)
        })}
        </>
    )}
}

export default StarRating;