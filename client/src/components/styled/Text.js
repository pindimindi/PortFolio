import styled, { css } from 'styled-components';

const Text = styled.div`
    font-weight: 400;
    font-size: 14px;
    margin: 10px 0;
    text-align: ${props => props.align || 'center'};
    padding: 6px 0;
    height: ${props => props.height || '45px'};

    ${({ scrollable }) =>
        scrollable && css`
        overflow-y:auto;
    `
    }
`;

export default Text;