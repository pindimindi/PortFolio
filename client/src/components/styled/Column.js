import styled, { css } from 'styled-components';

const sizeStyles = ({ small, medium }) => {
    if (small) {
        return css`
            width: 9%;
            position: -webkit-sticky;
            position: sticky;
            top: 0;
        `
    } else if (medium) {
        return css`
            width: 90%;
        `
    } else {
        return css`
            width: 100%;
            padding: 10px;
        `
    }
};

const Column = styled.div`
    width: 100%;
    ${({ sticky }) =>
        sticky && css`
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1;
    `
    }
`;

export default Column;