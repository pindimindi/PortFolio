import axios from 'axios';
import { GET_POSTS, CREATE_POST } from './types';

export const getPosts = portfolioId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${portfolioId}`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

    } catch (err) {
        console.log('error', err);
    }

};

export const createPost = (data, portfolioId) => async dispatch => {
    try {
        const res = await axios.post(`/api/posts/${portfolioId}`, data);
        console.log('post from action', res.data);

        dispatch({
            type: CREATE_POST,
            payload: res.data
        });

    } catch (err) {
        console.log(err)
    }

};