import React from 'react';
import Container from './Container';
import star from '../../images/star.svg';

const Rating = () => {
    return (
        <Container width='45%' height='20px' margin='10px auto'>
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
            <img src={star} />
        </Container>
    )
};

export default Rating;