import { SEARCH_RESTAURANT } from '../constants'

export const switchContainer = (searchQuery) => {
    return {
        type: SEARCH_RESTAURANT,
        searchQuery: searchQuery
    }
}

export const switchHomeContainer = (searchQuery) => (dispatch, getState) => {
    dispatch(switchContainer(searchQuery))
}