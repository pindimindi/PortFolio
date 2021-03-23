import styled, { css } from 'styled-components';

const Container = styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: space-between;
  padding: ${props => props.padding || '15px 10px'};
  ${({ left }) =>
    left && css`
        justify-content: flex-start;

        > *{
          margin: auto 10px;
        }
      `
  }
`;

export default Container;