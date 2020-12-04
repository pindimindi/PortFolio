import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCategories, clearState } from '../actions/categories';
import Card from './Card';
import Wrapper from './styled/Wrapper';


const Home = (props) => {

    const { getCategories, clearState } = props;

    useEffect(() => {
        getCategories();

        return () => {
            clearState();
        }
    }, []);

    return (
        <Wrapper gridView>
            {props.categories[0] && props.categories.map(category => (
                <Card key={category._id} category={category} />
            ))}
        </Wrapper>
    )
}

Home.propTypes = {
    getCategories: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    categories: PropTypes.array,

}

const mapStateToProps = state => ({
    categories: state.categories
});

export default connect(mapStateToProps, { getCategories, clearState })(Home);