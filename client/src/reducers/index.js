import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import categories from './categories';
import category from './category';
import subcategories from './subcategories';
import states from './states';
import cities from './cities';
import portfolio from './portfolio';
import portfolios from './portfolios';
import filteredPortfolios from './filteredPortfolios';
import posts from './posts';
import post from './post';

export default combineReducers({
    alert,
    auth,
    category,
    categories,
    subcategories,
    states,
    cities,
    portfolio,
    portfolios,
    filteredPortfolios,
    posts,
    post
});