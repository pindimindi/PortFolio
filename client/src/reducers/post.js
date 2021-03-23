import { CREATE_POST, START_LOADING } from '../actions/types';

const initialState = {
    loading: false,
    post: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_POST:
            return { ...state, loading: false, post: payload };
        case START_LOADING:
            return { ...state, loading: true };
        default:
            return state;
    }
};