import React from "react";
import styled from "styled-components";

const InputC = styled.input`
  display: none;
`;

const Input = (props) => {
  return (
    <InputC
      type="radio"
      name="location"
      id={props.name}
      value={props.engName}
    />
  );
};

export default Input;
