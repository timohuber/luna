import React from 'react';

export default function CommentInProfile(props) {
    const comment = props.comment

    return (
        <div className="comment">
            <div className="comment-header">
                <p>Comment {comment.id}</p>
                <p className="smaller">{comment.created}</p>
            </div>
            <p className="smaller">{comment.text_content}</p>
        </div>
    );
};