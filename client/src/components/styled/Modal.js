import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';


const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const ModalContent = styled.div`
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
    min-width: 30%;
    max-width: 50%;
    /* min-height: 60vh; */
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    background-color: white;
    margin: auto;
    overflow-y:auto;
    ::-webkit-scrollbar {
    display: none;
}
`;




const Modal = ({ children, show, onClose, height, width, direction }) => {
    if (!show) {
        return null;
    }

    return (
        <ModalContainer onClick={e => onClose()}>
            <ModalContent className='content' height={height} width={width} direction={direction} onClick={e => e.stopPropagation()}>
                {children}
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal;