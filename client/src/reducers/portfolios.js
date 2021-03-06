import { GET_PORTFOLIOS, GET_PORTFOLIOS_ERROR, FILTER_PORTFOLIOS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PORTFOLIOS:
            return payload;
        case GET_PORTFOLIOS_ERROR:
        default:
            return state;
    }
};