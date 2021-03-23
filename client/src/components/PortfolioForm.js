import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCategories } from 'actions/categories';
import { getSubcategories } from 'actions/subcategories';
import { getStates } from 'actions/states';
import { getCities } from 'actions/cities';
import { createPortfolio } from 'actions/portfolio';
import { setAlert } from 'actions/alert';
import { startLoading } from 'actions/category';

import Wrapper from './styled/Wrapper';
import Title from './styled/Title';
import { FormWrapper, StyledForm, FormField } from './styled/Form';
import Input from './styled/Input';
import Dropdown from './styled/DropdownMenu';
import DropdownList from './styled/DropdownList';
import DropdownListItem from './styled/DropdownListItem';
import TextArea from './styled/TextArea';
import Button from './styled/Button';


const PortfolioForm = props => {

    const [category, setCategory] = useState({});
    const [subcategory, setSubcategory] = useState({});
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    // const [profilePicture, setProfilePicture] = useState('');
    const [textInputData, setTextInputData] = useState({
        website: '',
        instagram: '',
        facebook: '',
        youtube: '',
        description: '',
        profilePictureData: ''
    });

    const { categories, subcategories,
        states, cities, getCategories,
        getSubcategories, getStates,
        getCities, createPortfolio,
        portfolio, setAlert,
        loading, startLoading } = props;

    useEffect(() => {
        getCategories();
        getStates('United States');
    }, []);

    const onChange = e => setTextInputData({ ...textInputData, [e.target.name]: e.target.value });

    const setImageUrl = image => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setTextInputData({ ...textInputData, profilePictureData: reader.result });
        }
    };

    const clearInputs = () => {
        setCategory({});
        setSubcategory({});
        setState('');
        setCity('');
        setTextInputData({
            website: '',
            instagram: '',
            facebook: '',
            youtube: '',
            description: '',
            profilePictureData: ''
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        startLoading();
        const location = {
            state,
            city
        };

        const data = {
            category: category._id,
            subCategory: subcategory._id,
            location,
            ...textInputData
        };
        createPortfolio(data);
        clearInputs();
    };

    const subcategoriesPlaceholder = category ? 'Loading...' : 'Select category first';
    const citiesPlaceholder = state ? 'Loading...' : 'Select state first';

    return (
        <Wrapper color='white'>
            <FormWrapper width='85%'>
                <Title>Create Your Portfolio</Title>
                <StyledForm row onSubmit={e => onSubmit(e)}>
                    <FormField>
                        <Input
                            type="file"
                            name="profilePicture"
                            placeholder="Profile Picture"
                            // value={textInputData.profilePictureData}
                            // key={textInputData.profilePictureData}
                            onChange={(e) => setImageUrl(e.target.files[0])}
                        />
                    </FormField>
                    <FormField small>
                        <Dropdown placeholder='Select Category' selection={category.name} data-testid={categories[0] ? 'categoriesLoaded' : 'categoriesNotLoaded'}>
                            <DropdownList>
                                {categories[0] ? categories.map(item => (
                                    <DropdownListItem key={item._id} id='category' onClick={() => { setCategory(item); setSubcategory(''); getSubcategories(item._id); }}>{item.name}</DropdownListItem>
                                )) : 'Loading...'}
                            </DropdownList>
                        </Dropdown>
                    </FormField>
                    <FormField small>
                        <Dropdown placeholder='Select Subcategory' selection={subcategory.name} data-testid={subcategories[0] ? 'subcategoriesLoaded' : 'subcategoriesNotLoaded'}>
                            <DropdownList>
                                {subcategories[0] ? subcategories.map(item => (
                                    <DropdownListItem key={item._id} onClick={() => setSubcategory(item)}>{item.name}</DropdownListItem>
                                )) : subcategoriesPlaceholder}
                            </DropdownList>
                        </Dropdown>
                    </FormField>
                    <FormField>
                        <TextArea
                            name='description'
                            value={textInputData.description}
                            rows='3'
                            placeholder='Description'
                            onChange={e => onChange(e)} />
                    </FormField>
                    <FormField small>
                        <Dropdown placeholder='Select State' selection={state} data-testid={states[0] ? 'statesLoaded' : 'statesNotLoaded'}>
                            <DropdownList>
                                {states[0] ? states.map(item => (
                                    <DropdownListItem key={item.state_name} onClick={() => { setState(item.state_name); setCity(''); getCities(item.state_name); }}>{item.state_name}</DropdownListItem>
                                )) : 'Loading...'}
                            </DropdownList>
                        </Dropdown>
                    </FormField>
                    <FormField small>
                        <Dropdown placeholder='Select City' selection={city} data-testid={states[0] ? 'citiesLoaded' : 'citiesNotLoaded'}>
                            <DropdownList>
                                {cities[0] ? cities.map(item => (
                                    <DropdownListItem key={item.city_name} onClick={() => setCity(item.city_name)}>{item.city_name}</DropdownListItem>
                                )) : citiesPlaceholder}
                            </DropdownList>
                        </Dropdown>
                    </FormField>
                    <FormField small>
                        <Input
                            type='text'
                            placeholder='Website'
                            name='website'
                            onChange={e => onChange(e)}
                            value={textInputData.website}
                        />
                    </FormField>
                    <FormField small>
                        <Input
                            type='text'
                            placeholder='Instagram'
                            name='instagram'
                            onChange={e => onChange(e)}
                            value={textInputData.instagram}
                        />
                    </FormField>
                    <FormField small>
                        <Input
                            type='text'
                            placeholder='Facebook'
                            name='facebook'
                            onChange={e => onChange(e)}
                            value={textInputData.facebook}
                        />
                    </FormField>
                    <FormField small>
                        <Input
                            type='text'
                            placeholder='You Tube'
                            name='youtube'
                            onChange={e => onChange(e)}
                            value={textInputData.youtube}
                        />
                    </FormField>
                    <Button marginTop='2em'>{loading ? 'SAVING...' : 'SAVE'}</Button>
                </StyledForm>
            </FormWrapper>
        </Wrapper>
    )
};

PortfolioForm.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    getSubcategories: PropTypes.func.isRequired,
    subcategories: PropTypes.array.isRequired,
    getStates: PropTypes.func.isRequired,
    states: PropTypes.array.isRequired,
    getCities: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    createPortfolio: PropTypes.func.isRequired,
    portfolio: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    categories: state.categories,
    subcategories: state.subcategories,
    states: state.states,
    cities: state.cities,
    portfolio: state.portfolio,
    loading: state.portfolio.loading
});

export default connect(mapStateToProps, {
    getCategories, getSubcategories,
    getStates, getCities,
    createPortfolio, setAlert,
    startLoading
})(PortfolioForm);