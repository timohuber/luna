import { SWITCH_SEARCH_CONTAINER, SEARCH_CONTENT } from '../constants';

const initialState = {
    activeContainer: 'Restaurant',
    searchQuery: ''
};

export const search = (state = initialState, action) => {
    
    switch (action.type) {
        case SWITCH_SEARCH_CONTAINER:
            return {
                ...state,
                activeContainer: action.container
                }

        case SEARCH_CONTENT:
            return {
                ...state,
                searchQuery: action.searchQuery
                }
        
        default:
            return state;
    }
}
