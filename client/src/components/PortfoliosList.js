import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Transformation } from 'cloudinary-react';
import { useHistory } from 'react-router-dom';

import { getPortfolios } from '../actions/portfolio';
import Grid from './styled/Grid';
import Card from './styled/Card';
import CardContent from './styled/CardContent';
import CardImage from './styled/CardImage';
import Meta from './styled/Meta';
import SubTitle from './styled/SubTitle';
import Text from './styled/Text';
import Badge from './styled/Badge';
import Container from './styled/Container';
import Button from './styled/Button';

import pin from '../images/pin.svg';
import instagram from '../images/instagram.svg';
import facebook from '../images/facebook-2.svg';
import youtube from '../images/youtube.svg';
import website from '../images/global.svg';

const Portfolioslist = ({ portfolios }) => {

    const history = useHistory();

    const handleClick = portfolioId => {
        history.push(`/portfolio/${portfolioId}`)
    };

    return (
        <Grid >
            {portfolios[0] ? portfolios.map(portfolio => (
                <Card key={portfolio._id} onClick={e => handleClick(portfolio._id)}>
                    <CardImage>
                        <Image cloudName='portfolioupload' publicId={portfolio.profilePicture}>
                            <Transformation gravity='auto' aspect-ratio='1:1' crop="fill" quality='60' />
                        </Image>
                    </CardImage>
                    <CardContent>
                        <SubTitle center>{portfolio.user.name}</SubTitle>
                        <Meta>
                            <img src={pin} />
                            {portfolio.location.city} /
                                {portfolio.location.state} /
                                {portfolio.location.country}
                        </Meta>
                        <Text scrollable>{portfolio.description}</Text>
                        <Container height='60px'>
                            <Badge>
                                <img src={instagram} />
                            </Badge>
                            <Badge>
                                <img src={facebook} />
                            </Badge>
                            <Badge>
                                <img src={youtube} />
                            </Badge>
                            <Badge>
                                <img src={website} />
                            </Badge>
                        </Container>
                        <Button>View Portfolio</Button>
                    </CardContent>
                </Card>
            )) : 'No Portfolios'}
        </Grid>
    )
};

Portfolioslist.propTypes = {
    portfolios: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    portfolio: state.portfolio
});


export default connect(null, { getPortfolios })(Portfolioslist);