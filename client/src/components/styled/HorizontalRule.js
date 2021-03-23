import styled from 'styled-components';

const HorizontalRule = styled.div`
    width: ${props => props.width || '100%'};
    border-top: 1.2px solid #E7E9EA;
`;

export default HorizontalRule;