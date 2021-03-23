import React from 'react';
import styled, { css } from 'styled-components';

const typeStyles = ({ secondary }) => {
    if (secondary) {
        return css`
        width: 20%;
        margin: auto;

        >img {
            width: 100%;
            height: 100%;
        }
        `;
    } else {
        return css`
        width: 100px;
        height: 100px;
        display: flex;
        margin: auto;
        border-radius: 50%;

        >*{
            width: 100%;
            height: 100%;
            border-radius: 50%;
    }

        }
        `;
    }
};

const CardImage = styled.div`
    ${typeStyles};
`;

export default CardImage;