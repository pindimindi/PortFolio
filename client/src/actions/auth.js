import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOAD_USER_FAIL
} from './types';
import { setAlert } from './alert';
import setAuthToken from 'utils/setAuthToken';

export const register = ({ name, email, password }) => async dispatch => {
    try {
        const res = await axios.post('/api/users', { name, email, password });

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({ type: REGISTER_FAIL });
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const res = await axios.post('/api/auth', { email, password });
        console.log('login response', res)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({ type: LOGIN_FAIL });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

export const loadUser = () => async dispatch => {
    console.log('load user gets called')
    if (localStorage.token) {
        console.log('there is local storage token')
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        console.log('user load error', err)
        dispatch({ type: LOAD_USER_FAIL });
    }
}