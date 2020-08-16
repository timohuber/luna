import { SWITCH_SEARCH_CONTAINER, SEARCH_CONTENT } from '../constants'

export const switchContainer = (container) => {
    return {
        type: SWITCH_SEARCH_CONTAINER,
        container: container
    }
}

export const searchContent = (searchQuery) => {
    return {
        type: SEARCH_CONTENT,
        searchQuery: searchQuery
    }
}

export const switchSearchContainer = (container) => (dispatch, getState) => {
    dispatch(switchContainer(container))
}

export const setSearchQuery = (searchQuery) => (dispatch, getState) => {
    console.log('in setSearchuZery')

    dispatch(searchContent(searchQuery))
}