import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import Button from './styled/Button';
import Title from './styled/Title';
import { FormWrapper, StyledForm, FormField, FormInput } from './styled/Form'


const Login = (props) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        props.login(email, password);

    }

    if (props.isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <FormWrapper>
            <Title>Log In</Title>
            <StyledForm onSubmit={e => onSubmit(e)}>
                <FormField>
                    <FormInput
                        placeholder='Email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <FormInput
                        placeholder='Password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </FormField>
                <Button type='submit' marginTop='6%'>LOG IN</Button>
            </StyledForm>
            <p>Don't have an account? <Link className='link' to='/register'>Sign Up!</Link> </p>
        </FormWrapper>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);