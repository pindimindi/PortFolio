import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2%;
  color: ${props => props.color || '#FFCF4E'};
  font-size: ${props => props.size || '3em'};
`;

export default Title;