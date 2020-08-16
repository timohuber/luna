import React from 'react';

export default function Comment(props) {
    const comment = props.comment;
    return (
        <div className="comment">
            <div className="comment-header">
                <p className="comment-user">{comment.user.first_name} {comment.user.last_name}</p>
                <p>{comment.created}</p>
            </div>
            <div className="content">{comment.text_content}</div>
        </div>
    )
}