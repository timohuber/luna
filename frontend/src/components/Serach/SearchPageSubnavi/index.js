import React from 'react';
import { useDispatch } from 'react-redux';

import { switchSearchContainer } from '../../../store/actions/searchActions'

export default function SearchPageSubnavigation(props) {
    const dispatch = useDispatch()

    const switchContainer = container => {
        dispatch(switchSearchContainer(container))
    }
    return (
        <div className="center-content">
            <div className="search-subnavigatin-container">
               <nav className="search-subnavigatin">
                   <a onClick={ e => switchContainer('Restaurant')} >Restaurants</a>
                   <a onClick={ e => switchContainer('Review')} >Reviews</a>
                   <a onClick={ e => switchContainer('User')} >Users</a>                                      
               </nav>
            </div>
        </div>
    );
};
