import { GET_POSTS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return payload;
        default:
            return state;
    }
};