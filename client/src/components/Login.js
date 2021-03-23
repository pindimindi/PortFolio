import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from 'actions/auth';
import Wrapper from './styled/Wrapper';
import Button from './styled/Button';
import Title from './styled/Title';
import { FormWrapper, StyledForm, FormField } from './styled/Form'
import Input from './styled/Input';
import Link from './styled/Link';


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
        <Wrapper color='#F2F2F2'>
            <FormWrapper>
                <Title>Log In</Title>
                <StyledForm data-testid='auth-form' onSubmit={e => onSubmit(e)}>
                    <FormField>
                        <Input
                            placeholder='Email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </FormField>
                    <FormField>
                        <Input
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            required
                        />
                    </FormField>
                    <Button type='submit' marginTop='6%' margin='auto'>LOG IN</Button>
                </StyledForm>
                <p>Don't have an account? <Link to='/register'>Sign Up!</Link> </p>
            </FormWrapper>
        </Wrapper>
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