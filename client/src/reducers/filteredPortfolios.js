import { FILTER_PORTFOLIOS } from 'actions/types';

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FILTER_PORTFOLIOS:
            return payload;
        default:
            return state;
    }
};