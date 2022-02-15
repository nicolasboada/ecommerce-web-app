import { useState } from "react";
import styled from "styled-components";

const FormInputDiv = styled.div`
&.formInput {
  display: flex;
  flex-direction: column;
} 
`

const Input = styled.input`
  flex: 1;
  width: 92%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 2px;
  border: 1px solid gray;
  &:invalid { 
    border: ${props => (props.focused === "true" && "1px solid red")}
   }
  &:invalid ~ span { 
    display: ${props => (props.focused === "true" && "block")}
   }
`

const Span = styled.span`
  font-size: 12px;
  padding: 3px;
  color: red;
  display: none;
`

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <FormInputDiv className="formInput">
      <Input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <Span>{errorMessage}</Span>
    </FormInputDiv>
  );
};

export default FormInput;
