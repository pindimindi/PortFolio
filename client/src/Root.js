import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';

const middleware = [thunk];

export default ({ children, initialState = {} }) => {
    return (
        <Provider store={createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))}>
            {children}
        </Provider>
    )
}

// PASSING INITIAL STATE AS A PROP IN ORDER TO BE ABLE TO PASS SOME FAKE DATA TO TEST REDUCERS AND ACTIONS
// OTHERWISE INITIAL STATE IS AN EMPTY OBJECT