import { SWITCH_ACTIVE_CONTAINER } from '../constants';

const initialState = {
    activeContainer: 'Reviews',
};

export const profile = (state = initialState, action) => {
    
    switch (action.type) {
        case SWITCH_ACTIVE_CONTAINER:
            return {
                ...state,
                activeContainer: action.container
                }

        default:
            return state;
    }
}
