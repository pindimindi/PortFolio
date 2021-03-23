import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 12px 50px;
  font-size: 14px;
  outline: none;
  border: 1.5px solid #E7E9EA;
  border-radius: 25px;
  text-align: center;
  margin: ${props => props.margin};
  color: #CFD3D6;
  background: white;
  margin-top: ${props => props.marginTop && props.marginTop};

  ${({ colored }) =>
    colored && css`
    color: black;
    background: #FFCF4E;
    border: none;
    `
  }

  ${({ secondary }) =>
    secondary && css`
    border-radius: 5px;
    color: #262626;
    background: #FAFAFA;
    padding: 0 20px;
    border: 0.5px solid #DBDBDB;
    line-height: 1.8;
    height: 30px;
    `
  }
  `;

export default Button;