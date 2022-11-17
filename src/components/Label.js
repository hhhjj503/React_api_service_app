import React from "react";
import styled from "styled-components";

const LabelC = styled.label`
  width: 100%;
  display: block;
  padding: 4px 0px 4px 5px;
  font-size: 1rem;

  &:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const Label = (props, index) => {
  return (
    <LabelC
      key={index}
      htmlFor={props.name}
      name={props.name}
      subName={props.subName}
      engName={props.engName}
      id={props.id}
      onClick={(e) => props.onClick(e)}
    >
      {props.name}
    </LabelC>
  );
};

export default Label;
