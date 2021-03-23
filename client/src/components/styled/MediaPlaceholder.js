import styled from 'styled-components';

const MediaPlaceholder = styled.div`
    height: ${props => props.hight || '100%'};
    width: ${props => props.width || '100%'};
    background: #9ba3a9;
`;

export default MediaPlaceholder;