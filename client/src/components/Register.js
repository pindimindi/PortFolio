import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setAlert } from 'actions/alert';
import { register } from 'actions/auth';
import PropTypes from 'prop-types';
import Wrapper from './styled/Wrapper';
import Button from './styled/Button';
import Title from './styled/Title';
import { FormWrapper, StyledForm, FormField } from './styled/Form';
import Input from './styled/Input';
import Link from './styled/Link';

const Register = props => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            props.setAlert('Passwords do not match!', 'danger');
        } else {
            props.register({ name, email, password });
        }
    }

    if (props.isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <Wrapper color='#F2F2F2'>
            <FormWrapper>
                <Title>Create Account</Title>
                <StyledForm onSubmit={e => onSubmit(e)}>
                    <FormField>
                        <Input
                            placeholder='Name'
                            type='text'
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}
                            required
                        />
                    </FormField>
                    <FormField>
                        <Input
                            placeholder='Email'
                            type='text'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </FormField>
                    <FormField>
                        <Input
                            placeholder='Password'
                            type='text'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                        />
                    </FormField>
                    <FormField>
                        <Input
                            placeholder='Confirm Password'
                            type='text'
                            name='password2'
                            value={password2}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                        />
                    </FormField>
                    <Button type='submit' marginTop='6%' margin='auto'>SIGN UP</Button>
                </StyledForm>
                <p>Already have an account? <Link to='/login'>Log in!</Link> </p>
            </FormWrapper>
        </Wrapper>
    )

};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);