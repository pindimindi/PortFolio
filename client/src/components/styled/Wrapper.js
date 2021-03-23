import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display:flex;
  flex-direction: ${props => props.direction || 'column'};
  height: ${props => props.height || 'auto'};
  min-height: 88vh;
  width: ${props => props.width || '100%'};
  padding: 5px;
  margin: auto;
  margin-top: 0.5%;
  border-radius: 10px;
  background: ${props => props.color || '#FAFAFA'};

    @media (max-width: 375px) {
    width: 100%;
  }

`
// height needs to be auto and min height should be 95%

export default Wrapper;