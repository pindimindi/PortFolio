import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';

import { getPortfolios, filterPortfolios } from '../actions/portfolio';
import Wrapper from './styled/Wrapper';
import Filters from './Filters';
import PortfoliosList from './PortfoliosList'


const Portfolios = ({ portfolios, filteredPortfolios, getPortfolios, filterPortfolios, userId, match, history }) => {

    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams, { comma: true });
    const { subCategory, state, city } = filtersFromParams;

    // const [filters, setFilters] = useState(filtersFromParams);

    useEffect(() => {
        getPortfolios(match.params.categoryId, userId);
    }, []);

    useEffect(() => {
        filterPortfolios(portfolios, subCategory, state, city)
    }, [portfolios]);


    return (
        <Wrapper direction='column' width='85%'>
            <Filters categoryId={match.params.categoryId} filteredPortfolios={filteredPortfolios} portfolios={portfolios} />
            <PortfoliosList portfolios={filteredPortfolios} />
        </Wrapper>
    )
};

Portfolios.propTypes = {
    portfolios: PropTypes.array.isRequired,
    filteredPortfolios: PropTypes.array,
    getPortfolios: PropTypes.func.isRequired,
    filterPortfolios: PropTypes.func.isRequired,
    userId: PropTypes.string
}


const mapStateToProps = state => ({
    userId: state.auth.user && state.auth.user._id,
    portfolios: state.portfolios,
    filteredPortfolios: state.filteredPortfolios,
});

export default connect(mapStateToProps, { getPortfolios, filterPortfolios })(Portfolios);
