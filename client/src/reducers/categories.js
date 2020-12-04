import { GET_CATEGORIES, CLEAR_STATE } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_CATEGORIES:
            return [...state, ...payload];
        case CLEAR_STATE:
            return initialState;
        default:
            return state;
    }

}
