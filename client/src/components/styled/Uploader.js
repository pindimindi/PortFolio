import React, { useRef } from 'react';
import styled, { css } from 'styled-components';

import upload from '../../images/upload.svg';



const UploaderBox = styled.div`
    display: flex;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
    background: #F2F2F2;
    border: 1px dotted black;
    margin: 10px auto;
    /* max-height: 300px; */

    > div {
        margin: auto;
    }
`;

const InvisibleInput = styled.input`
    display: none;
`;

const Preview = styled.div`
    width: 100%;
    height: 100%;

    >.media {
        width: 100%;
    }
`;

const Placeholder = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
        width: 100%;
        text-align: center;
        color: #9ba3a9;
    }

    > img {
        width: 20%;
        height: 20%;
    }
`;


const Uploader = ({ onChange, width, height, type, url, fileName, message }) => {

    const hiddenInput = useRef(null);

    const handleClick = () => {
        hiddenInput.current.click();
    }

    const preview = (
        <Preview>
            {type === 'video' ? <video className='media' src={url} autoPlay controls /> : <img className='media' src={url} />}
        </Preview>
    );

    const icon = (
        <Placeholder>
            <img src={upload} />
            <div>{message || 'Choose a file to upload'}</div>
        </Placeholder>
    );


    return (
        <>
            <UploaderBox onClick={handleClick} width={width} height={height} type={type}>
                {url ? preview : icon}
            </UploaderBox>
            <InvisibleInput
                type='file'
                ref={hiddenInput}
                onChange={onChange}
                key={fileName}
            />
        </>
    )
};

export default Uploader;