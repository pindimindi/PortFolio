import { GET_CITIES } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CITIES:
            return payload;
        default:
            return state;
    }
};