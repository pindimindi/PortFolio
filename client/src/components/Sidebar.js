import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { logout } from 'actions/auth';
import Link from './styled/Link';
import Tooltip from './styled/Tooltip';

const StyledSydebar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 96vh;
    width: 88%;
    background: #FFCF4E;
    color: #bf9a3c;
    /* border-radius: 0 5% 5% 0; */
    border-radius: 12px;
    margin: auto;
    margin-top: 10px;

    >div {
        display: flex;
        flex-direction: column;
        width: "100%";

        >div {
            margin: 35px auto;
            height: 5%;
        }
    }
`;

const Sidebar = (props) => {
    const isLoggedIn = props.auth.isAuthenticated ? true : false;
    const logout = props.logout;

    const loginButton = (
        <Tooltip>
            <span>Log In</span>
            <Link to="/login">
                <i className="fas fa-sign-in-alt fa-2x"></i>
            </Link>
        </Tooltip>
    );
    const logoutButton = (
        <Tooltip>
            <span>Log Out</span>
            <i onClick={logout} className="fas fa-sign-out-alt fa-2x"></i>
        </Tooltip>
    )
    return (
        <StyledSydebar>
            <div>
                <div>
                    <Tooltip>
                        <span>Home</span>
                        <Link to="/">
                            <i className="fas fa-home fa-2x"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip>
                        <span>Profile</span>
                        <Link to="/portfolio">
                            <i className="fas fa-user fa-2x"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip>
                        <span>Settings</span>
                        <Link to="/settings">
                            <i className="fas fa-cog fa-2x"></i>
                        </Link>
                    </Tooltip>
                </div>
            </div>
            <div>
                <div>
                    {isLoggedIn ? logoutButton : loginButton}
                </div>
            </div>
        </StyledSydebar>
    )
};

Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Sidebar);