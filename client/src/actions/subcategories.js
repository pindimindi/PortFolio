import axios from 'axios';
import { GET_SUBCATEGORIES } from './types';

export const getSubcategories = (categoryId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/subCategories/${categoryId}`);

        dispatch({
            type: GET_SUBCATEGORIES,
            payload: res.data
        });

    } catch (err) {
        console.log(err)
    }
}