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
import portfolio from 'reducers/portfolio';


const Filters = ({
    subcategories, states,
    cities, getSubcategories,
    getStates, getCities,
    categoryId, portfolios,
    filteredPortfolios, filterPortfolios }) => {

    const history = useHistory();

    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams, { comma: true });


    const [filters, setFilters] = useState(filtersFromParams);

    const [changeLog, setChangeLog] = useState(false);

    useEffect(() => {
        getSubcategories(categoryId);
        getStates('United States');
    }, []);

    useEffect(() => {
        const stringifiedParams = qs.stringify(filters, { arrayFormat: 'comma' });

        history.push({
            search: `?${stringifiedParams}`
        });

        if (changeLog) {
            filterPortfolios(portfolios, filters.subCategory, filters.state, filters.city);
        } else {
            filterPortfolios(filteredPortfolios, filters.subCategory, filters.state, filters.city);
        }

    }, [filters])

    const handleFilters = (filterName, filterValue) => {
        if (filters[filterName]) {
            setChangeLog(true);
        }
        setFilters({ ...filters, [filterName]: filterValue });
    }

    return (
        <Container direction='row' height='100px'>
            <Dropdown placeholder='Filter by Subcategory' selection={filters.subCategory || ''}>
                <DropdownList>
                    {subcategories[0] ? subcategories.map(item => (
                        <DropdownListItem key={item._id} onClick={e => handleFilters('subCategory', item._id)}>{item.name}</DropdownListItem>
                    )) : 'No Subactegories'}
                </DropdownList>
            </Dropdown>
            <Dropdown placeholder='Filter by State' selection={filters.state || ''}>
                <DropdownList>
                    {states[0] ? states.map(item => (
                        <DropdownListItem key={item.state_name} onClick={e => { handleFilters('state', item.state_name); getCities(item.state_name) }}>{item.state_name}</DropdownListItem>
                    )) : 'No States'}
                </DropdownList>
            </Dropdown>
            <Dropdown placeholder='Filter by City' selection={filters.city || ''}>
                <DropdownList>
                    {cities[0] ? cities.map(item => (
                        <DropdownListItem key={item.city_name} onClick={e => handleFilters('city', item.city_name)}>{item.city_name}</DropdownListItem>
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