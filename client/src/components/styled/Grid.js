import styled, { css } from 'styled-components';

const Grid = styled.div`
display: grid;
grid-row-gap: 20px;
grid-template-columns: repeat(auto-fill, minmax(33.3%, 1fr));
place-items: center;
padding: 2% 1%;
margin: 0 auto;
width: ${props => props.width || '100%'};
height: ${props => props.height || 'auto'};
    ${({ responsive }) =>
        responsive && css`
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      `
    }
    @media (max-width: 631px) {
        width: 100%;
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
`;

export default Grid;