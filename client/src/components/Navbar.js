import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';
import PropTypes from 'prop-types';

import Search from './styled/Search';
import Link from './styled/Link';
import Button from './styled/Button';
import Icon from './styled/Icon';
import Logo from './styled/Logo';

import profile from '../images/user-3.svg';
import home from '../images/home.svg';

const StyledNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.7em;
    background-color: white;
    border-bottom: 0.5px solid #DBDBDB;
`;

const Container = styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  display: flex;
  margin: ${props => props.margin};
  flex-direction: row;
  justify-content: flex-end;

    > * {
        margin: auto 0.5em;
    }
`;

const Navbar = props => {

    const { logout, auth, user } = props;
    const isLoggedIn = auth.isAuthenticated ? true : false;
    const history = useHistory();

    const portfolioLocation = {
        pathname: '/portfolio/me',
        key: Math.random(), // we could use Math.random, but that's not guaranteed unique.
        state: {
            applied: true
        }
    };

    const handleClick = e => {
        if (isLoggedIn) {
            logout();
        }
        history.push('/login');
    }
    
    return (
        <StyledNav>
            <Link to='/' secondary margin='auto 0'>
                <Logo>Portfolio</Logo>
            </Link>
            <Container row>
                <Link to='/'>
                    <Icon width='20px' height='30px'>
                        <img src={home} />
                    </Icon>
                </Link>
                <Link to={portfolioLocation}>
                    <Icon width='20px' height='30px'>
                        <img src={profile} />
                    </Icon>
                </Link>
                <Button secondary onClick={handleClick}>{isLoggedIn ? 'Log Out' : 'Log In'}</Button>
                <Search />
            </Container>
        </StyledNav>
    )
};

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);