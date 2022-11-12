import React from "react";
import styled from "styled-components";

const LabelC = styled.label`
  width: 100%;
  display: block;
  padding: 4px 0px 4px 5px;
`;

const Label = (props) => {
  const onClick = () => {};

  return (
    <LabelC key={props.key} htmlFor={props.name} onClick={onClick}>
      {props.name}
    </LabelC>
  );
};

export default Label;
