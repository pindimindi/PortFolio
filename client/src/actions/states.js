import axios from 'axios';
import { GET_STATES } from './types'

export const getStates = (country) => async dispatch => {
    try {
        const res = await axios.post('/api/geo/states', { country });

        dispatch({
            type: GET_STATES,
            payload: res.data
        });

    } catch (err) {
        console.log("states error", err)
    }
}; 