const initialState = {
    categories: [{
        "id": 1,
        "name": "Italian"
    },
    {
        "id": 2,
        "name": "Asian"
    },
    {
        "id": 3,
        "name": "Swiss"
    },
    {
        "id": 4,
        "name": "French"
    }]
};

export const helper = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}




        