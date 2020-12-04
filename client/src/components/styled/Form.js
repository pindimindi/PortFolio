import styled from 'styled-components';


export const FormInput = styled.input`
  width: 100%;
  margin: 5px 0;
  padding: 0.7em;
  background: #F2F2F2;
  border-radius: 3px;
  border: none;
`
export const FormField = styled.div`
  width: 100%;
  font-size: 1em;
  margin: auto;
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1em;
  `

export const FormWrapper = styled.div`
  width: ${props => props.width ? props.width : '40%'};
  min-width: 310px;
  margin: auto;
  padding: 4%;
  background: white;
  border-radius: 8px;
  text-align: center
  `
