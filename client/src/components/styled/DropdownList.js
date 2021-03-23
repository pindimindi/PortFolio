import styled from 'styled-components';

const DropdownList = styled.ul`
    position: absolute;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #ffffff;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 500;
    z-index: 100;
    &:first-child {
        padding-top: 0.8em;
    }
`;

export default DropdownList;