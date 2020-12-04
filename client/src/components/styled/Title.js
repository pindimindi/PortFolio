import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  text-align: center;
  margin-bottom: 5%;
  color: #FFCF4E;
  font-size: 3em;
`

const Title = ({ children }) => {
    return <StyledTitle>{children}</StyledTitle>
}

export default Title;