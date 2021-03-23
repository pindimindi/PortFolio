import {
    CREATE_PORTFOLIO, CREATE_PORTFOLIO_ERROR,
    START_LOADING, GET_MY_PORTFOLIO,
     GET_PORTFOLIO, GET_MY_PORTFOLIO_ERROR
} from '../actions/types';

const initialState = {
    portfolio: null,
    loading: false
};

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case CREATE_PORTFOLIO:
        case GET_MY_PORTFOLIO:
        case GET_PORTFOLIO:
            return { ...state, portfolio: payload, loading: false };
        case CREATE_PORTFOLIO_ERROR:
        case GET_MY_PORTFOLIO_ERROR:
            return { ...state, portfolio: null, loading: false };
        case START_LOADING:
            return { ...state, loading: true }
        default:
            return state;
    }
};