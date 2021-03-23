import axios from 'axios';
import {
    CREATE_PORTFOLIO, CREATE_PORTFOLIO_ERROR,
    GET_MY_PORTFOLIO, GET_MY_PORTFOLIO_ERROR,
    GET_PORTFOLIOS, GET_PORTFOLIO,
    GET_PORTFOLIOS_ERROR, FILTER_PORTFOLIOS
} from './types';
import { setAlert } from './alert';

export const getPortfolios = categoryId => async dispatch => {
    try {
        const res = await axios.get(`/api/portfolios/category/${categoryId}`);
        console.log('portfolios response', res)

        dispatch({
            type: GET_PORTFOLIOS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);

        dispatch({ type: GET_PORTFOLIOS_ERROR });
    }
};

export const createPortfolio = (data) => async dispatch => {
    try {
        const res = await axios.post('/api/portfolios', data);

        dispatch({
            type: CREATE_PORTFOLIO,
            payload: res.data
        });

        dispatch(setAlert('Portfolio successfully created', 'success'));

    } catch (err) {
        console.log('err', err);
        const errors = err.response.data.errors;
        console.log("errors from express", errors);

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: CREATE_PORTFOLIO_ERROR
        });
    }
};

export const getMyPortfolio = () => async dispatch => {
    try {
        const res = await axios.get('/api/portfolios/me');
        console.log('portfolio response', res)

        dispatch({
            type: GET_MY_PORTFOLIO,
            payload: res.data
        });

    } catch (err) {
        console.log('error', err);

        dispatch({
            type: GET_MY_PORTFOLIO_ERROR
        });
    }
};

export const getPortfolio = portfolioId => async dispatch => {
    try {
        const res = await axios.get(`/api/portfolios/${portfolioId}`);
        console.log('PORTFOLIO RESPONSE', res.data)

        dispatch({
            type: GET_PORTFOLIO,
            payload: res.data
        });

    } catch (err) {
        console.log('error', err);
    }
};

export const filterPortfolios = (filterName, filterValue, filterType) => dispatch => {
    dispatch({
        type: FILTER_PORTFOLIOS,
        payload: { filterName, filterValue, filterType }
    });
}
