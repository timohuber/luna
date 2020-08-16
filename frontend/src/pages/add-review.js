import React from 'react';
import AddReview from '../containers/AddReview'

export default function AddReviewPage(props) {
    return (
        <>
            {/* <div className="page-title-container">
                <h1>Add a review</h1>
            </div> */}
            <div className="center-content login-form-container">
                <AddReview  match={props.match} />
            </div>
        </>
    );
}
