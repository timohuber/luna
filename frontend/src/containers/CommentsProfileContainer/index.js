import React, { useState } from 'react';

import CommentInProfile from '../../components/Profile/CommentInProfile'

export default function CommentsInProfileContainer(props) {
    return (
        <>  
            {props.comments.map( comment => {
                return <CommentInProfile comment={comment} key={comment.id}/>
            })}
        </>
    )
}