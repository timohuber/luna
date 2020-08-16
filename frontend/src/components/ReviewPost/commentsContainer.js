import React, {useState, useEffect} from 'react';
import Comment from './comment'
import Loader from "../Loader";
import {baseUrl} from "../../store/constants";

export default function CommentsContainer(props) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const reviewID = props.id

    useEffect(() => {
        const config = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
        const response = fetch(baseUrl + `comment/review/${reviewID}/`, config)
        .then(res => res.json())
        .then(data => {
            setComments(data.results);
            setLoading(false)
        })
        .catch(response => {
            return response
        })
    }, [])
    return (
        <>
            {
                loading ?
                <Loader /> :
                <div className="review-comments-container">
                    {comments.map( comment => {
                        return <Comment comment={comment} key={comment.id} />
                    })}
                </div>
            }
        </>

    )
}