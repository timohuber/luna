import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../../store/actions/searchActions';

export default function SearchPageSearchBar(props) {
    const dispatch = useDispatch()

    const onChangeHandler = () => {
        const value = document.getElementById('search-input').value;
        console.log('in onChangeHandler')
        dispatch(setSearchQuery(value))
    }

    return (
        <div className="search-bar-container">
            <form className="search-bar-form">
                <input  id="search-input" placeholder="Search" onChange={ e => onChangeHandler() }/>
                <select name="category" placeholder="Category" id="category-dropdown" style={{display: "none"}}>
                    <option value="italian">Italian</option>
                    <option value="asian">Asian</option>
                    <option value="greek">greek</option>
                </select>
            </form>
        </div>
    );
};
