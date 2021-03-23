import styled from 'styled-components';


const Tooltip = styled.div`
    position: relative;
    display: inline-block;

    >span {
        visibility: hidden;
        background-color: white;
        color: black;
        text-align: center;
        white-space: nowrap;
        padding: 15px 80px;
        border-radius: 5px;
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.4);

        /* Position the tooltip text */
        position: absolute;
        z-index: 1;
        top: -5px;
        left: 140%;

        /* Fade in tooltip */
        opacity: 0;
        transition: opacity 0.3s;

        &:after {
            content: " ";
            position: absolute;
            top: 50%;
            right: 100%; /* To the left of the tooltip */
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent white transparent transparent;
        }
}

&:hover {
    >span {
        visibility: visible;
        opacity: 1;
    }

}
`;

export default Tooltip;