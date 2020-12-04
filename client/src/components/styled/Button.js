import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 15px 50px;
  outline: none;
  border: none;
  border-radius: 25px;
  text-align: center;
  margin: auto;
  background: #FFCF4E;
  color: black;
  margin-top: ${props => props.marginTop && props.marginTop}
  `

const Button = ({ marginTop, type, children }) => {
    return <StyledButton type={type} marginTop={marginTop}>{children}</StyledButton>
}

export default Button;