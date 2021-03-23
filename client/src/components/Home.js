import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCategories } from 'actions/categories';
import Card from './styled/Card';
import CardImage from './styled/CardImage';
import Container from './styled/Container';
import CardContent from './styled/CardContent';
import Grid from './styled/Grid';
import Wrapper from './styled/Wrapper';
import category from 'reducers/category';
import SubTitle from './styled/SubTitle';
import Meta from './styled/Meta';


const Home = (props) => {

    const { getCategories } = props;

    useEffect(() => {
        getCategories();
    }, []);

    const goToPortfolios = id => {
        props.history.push(`/portfolios/category/${id}`)
    }

    return (
        <Wrapper direction='column'>
            <Grid width='85%'>
                {
                    props.categories[0] ? props.categories.map(category => (
                        <Card secondary onClick={() => goToPortfolios(category._id)} key={category._id}>
                            <CardContent>
                                <SubTitle>{category.name}</SubTitle>
                                <Meta>{category.subcategories} Subcategories</Meta>
                                <Meta>{category.users} Users</Meta>
                            </CardContent>
                            <CardImage secondary>
                                <img src={category.coverPhoto} />
                            </CardImage>
                        </Card>
                    )) : <h1>No Categories</h1>
                }
            </Grid>
        </Wrapper>
    )
}

Home.propTypes = {
    getCategories: PropTypes.func.isRequired,
    categories: PropTypes.array,
    isAdmin: PropTypes.bool
}

const mapStateToProps = state => ({
    categories: state.categories,
    isAdmin: state.auth.user && state.auth.user.isAdmin
});

export default connect(mapStateToProps, { getCategories })(Home);