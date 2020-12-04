import { CREATE_CATEGORY_SUCCESS, START_LOADING } from '../actions/types';


const initialState = {
    category: null,
    loading: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_CATEGORY_SUCCESS:
            return { ...state, category: payload, loading: false }
        case START_LOADING:
            return { ...state, loading: true }
        default:
            return state;
    }
}