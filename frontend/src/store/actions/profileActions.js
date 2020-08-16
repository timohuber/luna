import { SWITCH_ACTIVE_CONTAINER } from '../constants'

export const switchContainer = (container) => {
    return {
        type: SWITCH_ACTIVE_CONTAINER,
        container: container
    }
}

export const switchProfileContainer = (container) => (dispatch, getState) => {
    dispatch(switchContainer(container))
}