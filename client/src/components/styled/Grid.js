import styled from 'styled-components';

const Grid = styled.div`
display: grid;
grid-row-gap: 20px;
grid-template-columns: repeat(auto-fill, minmax(33.3%, 1fr));
/* grid-auto-rows: 250px 150px; */
place-items: center;
padding: 2% 1%;
margin: 0 auto;
width: ${props => props.width || '100%'};
height: ${props => props.height || 'auto'};
`;

export default Grid;