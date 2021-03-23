import React from 'react';
import axios from 'axios';
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';

import Home from '../Home';

jest.mock('axios');

const categories = {
    data: [
        {
            coverPhoto: "http://res.cloudinary.com/portfolioupload/image/upload/v1608166453/Categories/yg0k5hksxfhxgdmduo0q.svg",
            name: "Photography",
            _id: 'jkkkjk'
        },
        {
            coverPhoto: "http://res.cloudinary.com/portfolioupload/image/upload/v1608166453/Categories/yg0k5hksxfhxgdmduo0q.svg",
            name: "Music",
            _id: 'fsfsg'
        }
    ]
};

const history = { push: jest.fn() };

afterEach((() => {
    cleanup;
    axios.get.mockClear();
}));


const renderComponent = () => render(
    <Provider store={store}>
        <Home history={history} />
    </Provider>

);

test('Renders categories if they exist', async () => {
    axios.get.mockReturnValue(new Promise(resolve => resolve(categories)));
    const { queryByText, getAllByTestId, queryByTestId } = renderComponent();

    expect(queryByText('No Categories')).toBeInTheDocument();
    expect(queryByTestId('card')).not.toBeInTheDocument();

    await waitForElement(() => getAllByTestId('card'));
    expect(getAllByTestId('card')).toBeTruthy();
    expect(queryByText('Photography')).toBeInTheDocument();
    expect(queryByText('No Categories')).not.toBeInTheDocument();
});

test('On click pushes new route to history', () => {
    axios.get.mockReturnValue(new Promise(resolve => resolve(categories)));
    const { getByText } = renderComponent();

    fireEvent.click(getByText('Music'));
    expect(history.push).toHaveBeenCalledWith('/subcategories/fsfsg');
});