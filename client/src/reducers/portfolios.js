import { GET_PORTFOLIOS, GET_PORTFOLIOS_ERROR, FILTER_PORTFOLIOS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PORTFOLIOS:
            return payload;
        case FILTER_PORTFOLIOS:
            console.log('payload', payload)
            let filtered = state.filter(portfolio => {
                if (payload.filterType) {
                    return portfolio[payload.filterType][payload.filterName] === payload.filterValue
                } else {
                    return portfolio[payload.filterName] === payload.filterValue
                }
            });
            console.log('filtered', filtered)
            return filtered;
        case GET_PORTFOLIOS_ERROR:
        default:
            return state;
    }
};