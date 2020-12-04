import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import Button from './styled/Button';
import Title from './styled/Title';
import { FormWrapper, StyledForm, FormField, FormInput } from './styled/Form';

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
        <FormWrapper>
            <Title>Create Account</Title>
            <StyledForm onSubmit={e => onSubmit(e)}>
                <FormField>
                    <FormInput
                        placeholder='Name'
                        type='text'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <FormInput
                        placeholder='Email'
                        type='text'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </FormField>
                <FormField>
                    <FormInput
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
                    <FormInput
                        placeholder='Confirm Password'
                        type='text'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </FormField>
                <Button type='submit' marginTop='6%'>SIGN UP</Button>
            </StyledForm>
            <p>Already have an account? <Link className='link' to='/login'>Log in!</Link> </p>
        </FormWrapper>
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