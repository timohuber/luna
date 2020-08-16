import React from 'react';
import { useDispatch } from 'react-redux';

import { switchHomeContainer } from '../../store/actions/homeActions';

export default function HomeSearchForm () {
    const dispatch = useDispatch()

    const onSubmitHandler = e => {
        e.preventDefault();
        const value = document.getElementById('search-input').value;
        dispatch(switchHomeContainer(value))
    }
    return (
        <div className="home-search-container">
            <form className="home-search-form" onSubmit={ e => onSubmitHandler(e) }>
                <input type="search" id="search-input" placeholder="Search…" />
                <button type="submit" id="search-submit" value="Search">Search</button>
            </form>
        </div>
    );
};
