import styled from 'styled-components';

const Video = styled.div`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || 'auto'};

    > video {
        width: 100%;
        height: 100%;
        outline: none;
    }
`;

export default Video;