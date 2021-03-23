import React from 'react';
import axios from 'axios';
import { render, cleanup, fireEvent, waitForElement, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import store from '../../store';


import Login from '../Login';

jest.mock('axios');

// jest.mock('react-router-dom', () => {
//     return {
//         Redirect: jest.fn(({ path }) => `Redirected to ${path}`),
//     };
// });

const token = {
    data: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZkYWNkYWNkMGVmYzg1OGEyNGIwYmUyIn0sImlhdCI6MTYxMTI1Njg2MCwiZXhwIjoxNjExNjE2ODYwfQ.juJw8k3GoE5N-0ETWZbwinXxDrvTcg1TUjoijOAwE38' }
};

const history = createMemoryHistory();
history.push = jest.fn();


afterEach((() => {
    cleanup;
    axios.get.mockClear();
}));

test('<Login>', async () => {
    const { queryByTestId, getByPlaceholderText, getByText, getByTestId, getByDisplayValue, debug } =
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Login />
                </Router>
            </Provider>);

    expect(getByTestId('auth-form')).toBeTruthy();

    fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'test@yahoo.com' },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'testpassword' },
    });

    expect(getByDisplayValue('test@yahoo.com')).toBeTruthy();

    axios.post.mockReturnValue(new Promise(resolve => resolve(token)));

    fireEvent.click(getByText('LOG IN'));

    await wait(() => {
        expect(axios.post).toHaveBeenCalled()
    });

    expect(history.push).toHaveBeenCalledWith('/');

    // expect(getByText('Redirected to /')).toBeInTheDocument();

    // await waitForElement(() => getByTestId('card'));
    // expect(getByTestId('card')).toBeInTheDOM();
});