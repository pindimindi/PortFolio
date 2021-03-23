import React from 'react';
import axios from 'axios';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';

import SubCategoryList from '../SubCategoryList';

jest.mock('axios');

const subcategories = {
    data: [
        {
            coverPhoto: "http://res.cloudinary.com/portfolioupload/image/upload/v1608166453/Categories/yg0k5hksxfhxgdmduo0q.svg",
            name: "Guitar",
            _id: 'sghgdjh'
        },
        {
            coverPhoto: "http://res.cloudinary.com/portfolioupload/image/upload/v1608166453/Categories/yg0k5hksxfhxgdmduo0q.svg",
            name: "Piano",
            _id: 'jxnskj'
        }
    ]
};

const history = { push: jest.fn() };
const match = { params: { id: 'fsfsg' } };

afterEach((() => {
    cleanup;
    axios.get.mockClear();
}));

const renderComponent = () => render(
    <Provider store={store}>
        <SubCategoryList history={history} match={match} />
    </Provider>
);

test('Renders subcategories if they exist', async () => {
    axios.get.mockReturnValue(new Promise(resolve => resolve(subcategories)));
    const { queryByText, getAllByTestId, queryByTestId } = renderComponent();

    expect(queryByText('We do not have any subcategories yet')).toBeInTheDocument();
    expect(queryByTestId('card')).not.toBeInTheDocument();

    await waitForElement(() => getAllByTestId('card'));
    expect(getAllByTestId('card')).toBeTruthy();
    expect(queryByText('We do not have any subcategories yet')).not.toBeInTheDocument();
});