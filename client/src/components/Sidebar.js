import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const Sidebar = (props) => {
    const isLoggedIn = props.auth.isAuthenticated ? true : false;
    const logout = props.logout;

    const loginButton = (
        <div className="tooltip">
            <span className="tooltip-text">Log In</span>
            <Link to="/login" className="nav-link">
                <i className="fas fa-sign-in-alt fa-2x"></i>
            </Link>
        </div>
    );
    const logoutButton = (
        <div className="tooltip">
            <span className="tooltip-text">Log Out</span>
            <i onClick={logout} className="fas fa-sign-out-alt fa-2x"></i>
        </div>
    )
    return (
        <div className="sidebar">
            <div className="icon-section">
                <div className="item">
                    <div className="tooltip">
                        <span className="tooltip-text">Home</span>
                        <Link to="/" className="nav-link">
                            <i className="fas fa-home fa-2x"></i>
                        </Link>
                    </div>
                </div>
                <div className="item">
                    <div className="tooltip">
                        <span className="tooltip-text">Profile</span>
                        <Link to="/profile" className="nav-link">
                            <i className="fas fa-user fa-2x"></i>
                        </Link>
                    </div>
                </div>
                <div className='item'>
                    <div className="tooltip">
                        <span className="tooltip-text">Settings</span>
                        <Link to="/settings" className="nav-link">
                            <i className="fas fa-cog fa-2x"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='icon-section'>
                <div className='item'>
                    {isLoggedIn ? logoutButton : loginButton}
                </div>
            </div>
        </div>
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