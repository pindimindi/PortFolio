import { GET_SUBCATEGORIES, CLEAR_STATE } from 'actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SUBCATEGORIES:
            console.log('subacetegories payload', payload)
            // return [...state, ...payload];
            return payload;
        case CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
};