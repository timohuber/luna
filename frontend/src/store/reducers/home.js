import { SEARCH_RESTAURANT } from '../constants';

const initialState = {
    searchQuery: '',
};

export const home = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_RESTAURANT:
            return {
                ...state,
                searchQuery: action.searchQuery
                }

        default:
            return state;
    }
}
