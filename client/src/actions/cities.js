import axios from 'axios';
import { GET_CITIES } from './types';

export const getCities = state => async dispatch => {
    let res = await axios.post('/api/geo/cities', { state });

    dispatch({
        type: GET_CITIES,
        payload: res.data
    });
};