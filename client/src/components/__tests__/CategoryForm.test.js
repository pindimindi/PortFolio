import React from 'react';
import axios from 'axios';
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';

import CategoryForm from '../CategoryForm';

jest.mock('axios');

const category = {
    data: {
        category: {
            coverPhoto: 'hjgjhghjkhjk',
            name: 'test'
        }
    }
};

afterEach((() => {
    cleanup;
    axios.post.mockClear();
}));

const renderComponent = () => render(
    <Provider store={store}>
        <CategoryForm />
    </Provider>
);

test('Renders a form with editable inputs and shows preview', async () => {
    const { queryByText, queryByTestId, getByTestId, getByPlaceholderText, queryByDisplayValue } = renderComponent();
    const file = new File([new ArrayBuffer(1)], 'test.png', { name: 'Test Image', type: 'image/jpeg' });

    expect(queryByTestId('categoryForm')).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText('Category name'), {
        target: { value: 'Test Category' },
    });
    fireEvent.change(getByPlaceholderText('Upload an image'), {
        target: { files: [file] },
    });

    expect(queryByDisplayValue('Test Category')).toBeInTheDocument();

    await waitForElement(() => getByTestId('preview'));

    axios.post.mockReturnValue(new Promise(resolve => resolve(category)));
    fireEvent.click(queryByText('SAVE'));
    expect(queryByText('UPLOADING...')).toBeInTheDocument();
    expect(queryByText('SAVE')).not.toBeInTheDocument();
    await waitForElement(() => queryByText('SAVE'));
    expect(queryByDisplayValue('Test Category')).not.toBeInTheDocument();
});