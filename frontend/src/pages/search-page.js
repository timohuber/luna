import React, {useState, useEffect} from 'react';

import SearchFeed from '../components/Serach/SearchFeed';

import SearchPageSubnavigation from '../components/Serach/SearchPageSubnavi'
import SearchPageSearchBar from '../components/Serach/SearchPageSearchBar'

export default function SearchPage(props) {
    return (
        <>
        <SearchPageSearchBar />
        <SearchPageSubnavigation />
        <div className="center-content">
                    <SearchFeed />
        </div>
        </>
    );
}
