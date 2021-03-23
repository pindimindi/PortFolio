import styled, { css } from 'styled-components';

const SubTitle = styled.div`
    font-size: ${props => props.size || '24px'};
    margin-bottom: 2px;
    font-weight: ${props => props.weight || '300'};
    margin-right: 20px;
        ${({ center }) =>
        center && css`
        text-align: center;
      `
    }
`;

export default SubTitle;