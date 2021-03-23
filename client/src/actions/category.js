import axios from 'axios';
import { CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAIL, START_LOADING } from "./types";
import { setAlert } from './alert';

export const createNewCategory = (name, coverPhoto) => async dispatch => {
    try {
        const res = await axios.post('/api/categories', { name, coverPhoto });

        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert(`${name} category successfully created!`, 'success'))

    } catch (err) {
        dispatch({ type: CREATE_CATEGORY_FAIL });
        dispatch(setAlert(err.message, 'danger'));
        console.log(err)
    }
}

export const startLoading = () => dispatch => {
    dispatch({ type: START_LOADING })
}