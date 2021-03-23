import React, { useState } from 'react';
import styled from 'styled-components';

import Image from './Image';
import upArrow from '../../images/up-arrow.svg';
import downArrow from '../../images/down-arrow.svg';

export const DropdownContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    position: relative;
` ;

export const DropdownHeader = styled.div`
    background: #F2F2F2;
    margin-bottom: 0.4em;
    padding: 0.4em 0;
    font-size: 1.2rem;
    border-radius: 3px;

`;

const Dropdown = ({ placeholder, selection, children, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <DropdownContainer onClick={() => toggleDropdown()} {...props}>
            <DropdownHeader>
                {selection ? selection : placeholder}
                <Image inputRight width='20%' height='10px'>
                    <img src={isOpen ? upArrow : downArrow} alt='arrow' />
                </Image>
            </DropdownHeader>
            {isOpen && children}
        </DropdownContainer>
    )
};

export default Dropdown;