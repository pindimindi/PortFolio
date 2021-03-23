import styled, { css } from 'styled-components';

const SearchStyles = ({ search }) => {
    if (search) {
        return css`
        padding: 12px 36px;
            background: #FAFAFA;
            width: 220px;
            border: 0.5px solid #DBDBDB;
            border-radius: 26px;
            outline: none;
        `
    } else {
        return css`
        background: #F2F2F2;
        width: 100%;
        border-radius: 3px;
        margin: 5px 0;`

    }
};

const Input = styled.input`
    padding: 0.8em;
    font-size: 1rem;
    border: none;
    outline: none;
    flex-grow: 4;
    ${SearchStyles}
`;

export default Input;