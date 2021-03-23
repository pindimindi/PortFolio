import styled, { css } from 'styled-components';
import video from '../../images/video-camera-3.svg';
import home from '../../images/home.svg';

const imageTypeStyles = ({ inputRight, round, videoThumbnail }) => {
    if (inputRight) {
        return css`
        float: right;
        `;
    } else if (round) {
        return css`
         border-radius: 50%;
         /* margin: 0 10px; */
        `;
    } else if (videoThumbnail) {
        return css`
        position: relative;

        &::after {
            content: "";
            position: absolute;
            right: 10px;
            top: 10px;
            bottom: 0;
            width: 18px;
            height: 20px;
            background: url(${video}) no-repeat;
            background-size: 100% 100%;
        }
        `;
    }
};

const Image = styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  ${imageTypeStyles}
  > img {
        width: 100%;
        height: 100%;
        ${({ round }) =>
        round && css`
        border-radius: 50%;
    `
    }
    }
`

export default Image;