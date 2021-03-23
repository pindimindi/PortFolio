import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

import { getSubcategories } from 'actions/subcategories';
import { getStates } from 'actions/states';
import { getCities } from 'actions/cities';
import { filterPortfolios } from 'actions/portfolio';
import Container from './styled/Container';
import Dropdown from './styled/DropdownMenu';
import DropdownList from './styled/DropdownList';
import DropdownListItem from './styled/DropdownListItem';


const Filters = ({
    subcategories, states,
    cities, getSubcategories,
    getStates, getCities,
    categoryId, filterPortfolios }) => {

    const history = useHistory();

    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams, { comma: true });
    console.log('filters from params', filtersFromParams);

    const [filters, setFilters] = useState(filtersFromParams);

    useEffect(() => {
        getSubcategories(categoryId);
        getStates('United States');
        // Object.keys(filtersFromParams).forEach(filter => {
        //     console.log('each filter', filter)
        //     return filterPortfolios(filter, filtersFromParams[filter])
        // }
        // )
    }, []);

    useEffect(() => {
        const stringifiedParams = qs.stringify(filters, { arrayFormat: 'comma' });

        history.push({
            search: `?${stringifiedParams}`
        });

    }, [filters])

    const handleFilters = (filterName, filterValue, filterType) => {
        setFilters({ ...filters, [filterName]: filterValue });
        filterPortfolios(filterName, filterValue, filterType);
    }

    return (
        <Container direction='row' height='100px'>
            <Dropdown placeholder='Filter by Subcategory'>
                <DropdownList>
                    {subcategories[0] ? subcategories.map(item => (
                        <DropdownListItem key={item._id} onClick={e => handleFilters('subCategory', item._id)}>{item.name}</DropdownListItem>
                    )) : 'No Subactegories'}
                </DropdownList>
            </Dropdown>
            <Dropdown placeholder='Filter by State'>
                <DropdownList>
                    {states[0] ? states.map(item => (
                        <DropdownListItem key={item.state_name} onClick={e => { handleFilters('state', item.state_name, 'location'); getCities(item.state_name) }}>{item.state_name}</DropdownListItem>
                    )) : 'No States'}
                </DropdownList>
            </Dropdown>
            <Dropdown placeholder='Filter by City'>
                <DropdownList>
                    {cities[0] ? cities.map(item => (
                        <DropdownListItem key={item.city_name} onClick={e => handleFilters('city', item.city_name, 'location')}>{item.city_name}</DropdownListItem>
                    )) : filters.state ? 'No Cities' : 'Select state first'}
                </DropdownList>
            </Dropdown>
        </Container>
    )
}

const mapStateToProps = state => ({
    subcategories: state.subcategories,
    states: state.states,
    cities: state.cities,
});

export default connect(mapStateToProps, { getCities, getStates, getSubcategories, filterPortfolios })(Filters);