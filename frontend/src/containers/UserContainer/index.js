import React from 'react';

import UserOverview from '../../components/UserOverview'

export default function UserContainer(props) {
    return (
        <div className="user-overview">
            {props.users.map( user => {
                return <UserOverview user={user} key={user.id}/>
            })}
        </div>
    )
}