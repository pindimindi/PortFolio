import styled from 'styled-components';


export const FormField = styled.div`
  width: ${props => props.small ? '45%' : '100%'};
  font-size: 1em;
  margin: ${props => !props.small && 'auto'};
  margin-bottom: 0.3em;
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1em;
  `

export const FormWrapper = styled.div`
  width: ${props => props.width ? props.width : '40%'};
  min-width: 310px;
  margin: auto;
  padding: 1% 3%;
  background: white;
  border-radius: 8px;
  text-align: center;
  max-height:80vh;
  `
