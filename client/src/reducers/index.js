import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import categories from './categories';
import category from './category';

export default combineReducers({
    alert,
    auth,
    category,
    categories
});