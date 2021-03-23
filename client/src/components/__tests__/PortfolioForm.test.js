import React from 'react';
import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';

import PortfolioForm from '../PortfolioForm';


jest.mock('axios');

// const mock = new MockAdapter(axios);

const states = [
    {
        state_name: 'Illinois'
    },
    {
        state_name: 'Montana'
    }
];

const cities = [
    {
        city_name: 'Chicago'
    },
    {
        city_name: 'Springfield'
    }
];

const categories =
    [
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
    ];

const subcategories = [
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
];

const portfolio = {
    category: "Music",
    description: "Rock on",
    location: "Albany, Oregon",
    profilePicture: "http://res.cloudinary.com/portfolioupload/image/upload/v1611943721/Profile%20Photos/xmirkaceymauzeeb6rai.jpg",
    social: { youtube: "test y", facebook: "test f ", instagram: "test i" },
    subCategory: "Guitar",
    website: "test w"
};



afterEach((() => {
    cleanup;
    // mock.reset();
    axios.get.mockClear();
}));

const renderComponent = () => render(
    <Provider store={store}>
        <PortfolioForm />
    </Provider>
);

test('Renders editable and submitable from', async () => {

    axios.get.mockImplementation(url => {
        switch (url) {
            case 'api/categories':
                return Promise.resolve({
                    data: categories
                });
            case '/api/subCategories/jkkkjk':
                return Promise.resolve({
                    data: subcategories
                });
        }
    });
    axios.post.mockImplementation(url => {
        switch (url) {
            case 'api/geo/states':
                return Promise.resolve({
                    data: states
                });
            case 'api/geo/cities':
                return Promise.resolve({
                    data: cities
                });
            case 'api/portfolios':
                return Promise.resolve({
                    data: portfolio
                });
            default:
                return Promise.reject(new Error("not found"))
        }
    });
    const { queryByText, queryByTestId, getByPlaceholderText } = renderComponent();

    const file = new File([new ArrayBuffer(1)], 'test.png', { name: 'Test Image', type: 'image/jpeg' });

    fireEvent.change(getByPlaceholderText('Profile Picture'), {
        target: { files: [file] },
    });

    await waitForElement(() => queryByTestId('categoriesLoaded'));
    fireEvent.click(queryByText('Select Category'));
    expect(queryByText('Photography')).toBeInTheDocument();

    fireEvent.click(queryByText('Photography'));
    fireEvent.click(queryByText('Select Subcategory'));

    await waitForElement(() => queryByTestId('subcategoriesLoaded'));
    expect(queryByText('Guitar')).toBeInTheDocument();
    fireEvent.click(queryByText('Guitar'));

    fireEvent.change(getByPlaceholderText('Description'), {
        target: { value: 'This is test description' },
    });
    fireEvent.change(getByPlaceholderText('Instagram'), {
        target: { value: 'tesinstagramurl' },
    });
    fireEvent.change(getByPlaceholderText('Website'), {
        target: { value: 'testwebsiteurl' },
    });
    fireEvent.change(getByPlaceholderText('Facebook'), {
        target: { value: 'testfacebookurl' },
    });
    fireEvent.change(getByPlaceholderText('You Tube'), {
        target: { value: 'testyoutubeurl' },
    });

    fireEvent.click(queryByText('Select State'));
    await waitForElement(() => queryByTestId('statesLoaded'));
    expect(queryByText('Illinois')).toBeInTheDocument();

    fireEvent.click(queryByText('Illinois'));

    fireEvent.click(queryByText('Select City'));
    await waitForElement(() => queryByTestId('citiesLoaded'));
    expect(queryByText('Chicago')).toBeInTheDocument();

    fireEvent.click(queryByText('Chicago'));

    fireEvent.click(queryByText('SAVE'));

    expect(queryByText('SAVING...')).toBeInTheDocument();

    await waitForElement(() => queryByText('SAVE'));
    expect(queryByText('Select Category')).toBeInTheDocument();
});