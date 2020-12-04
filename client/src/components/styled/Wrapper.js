import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

const StyledWrapper = styled.section`
  height: 95%;
  width: 100%;
  margin-top: 2%;
  border-radius: 10px;
  background: white;
  ${({ gridView }) =>
        gridView &&
        css`display: flex;
        flex - direction: row;
        justify - content: space - between;
        padding: 10%;`}
`
// height needs to be auto and min height should be 95%

const Wrapper = ({ gridView, children }) => {
    return <StyledWrapper gridView={gridView}>{children}</StyledWrapper>
}

export default Wrapper;