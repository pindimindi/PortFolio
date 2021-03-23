import axios from 'axios';
import { GET_CATEGORIES, CLEAR_STATE } from './types';

export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/categories');
        console.log('CATEGORIES', res.data)

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });

    } catch (err) {
        console.log(err)
    }
}


