import React, {useState} from 'react';
import {connect} from 'react-redux'
import StarRating from '../Starrating';
import CommentsContainer from './commentsContainer'

import {baseUrl} from "../../store/constants";
import { FaThumbsUp, FaUser } from 'react-icons/fa';

const ReviewPost = (props) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState(false)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const value = document.getElementById('comment-input').value
        if (!value) {
            // document.querySelector('.input-wrapper error').style.opacity = '1'
        } else {
            // document.querySelector('.input-wrapper error').style.opacity = '0'
            document.getElementById('comment-input').value = ''
            const form = new FormData();
            form.append('text_content', value)
            const config = {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${props.currentUser.accessToken}`
                }),
                body: form
            };
            const loginResponse = fetch(baseUrl + `comment/new/${props.review.id}/`, config)
            .then( res => {
                return res.json()
            })
            // .then(res => res.json())
            .then(data => data)
            .catch(res => {
                return
            })
        }
    }

    const toggleViewComments = e => {
        e.preventDefault()
        setShowComments(true)
    }

    const review = props.review;
    return (
        <div className="post-container">
            <div className="postHeader">
                <div className="postAvatar">
                    <FaUser size="40" />
                </div>
                <div className="username-review-text">
                    <span className="titleUser">{review.user.first_name} {review.user.last_name}</span>
                    <span className="amountReviews">{review.user['num_reviews']} Reviews in total</span>
                </div>
                <StarRating review={review} readOnly={true}/>
                <span className="dateTimeField">{review.created}</span>
            </div>
            <div className="postContent">
                <p className="content">{review.text_content}</p>
                <div className="comments-wrapper">
                    <div className="input-wrapper">
                        <input id="comment-input" className="required" name="name" placeholder="add comment"/>
                        <p className="error">This field is required</p>
                    </div>
                    <button className="btn" onClick={ e => onSubmitHandler(e) }>Submit</button>
                </div>
                <div className="post-interactive-footer">
                    <div className="button-container">
                        <button className="amountLikes base-two-buttons"><FaThumbsUp /> Likes {review.count_of_likes}</button>
                        <button className="amountComments base-two-buttons">Comments {review.count_of_comments}</button></div>
                    <div className="toggle-all-comments">
                        <button onClick={ e => toggleViewComments(e)} className="blank">View all comments</button>
                    </div>
                </div>
                    {
                        showComments ?
                        <CommentsContainer id={review.id}/> :
                        null
                    }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
const connection = connect(mapStateToProps);
const ConnectedReviewPost = connection(ReviewPost);

export default ConnectedReviewPost;