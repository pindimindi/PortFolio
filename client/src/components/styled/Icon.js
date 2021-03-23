import styled from 'styled-components';

const Icon = styled.div`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};

    >img{
        width: 100%;
        height: 100%
    }
`;

export default Icon;