import React from "react";
import styled from "styled-components";

const FieldsetC = styled.fieldset`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: inline-block;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    color: white;
    background-color: #96969666;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #7070c8;
    border-radius: 15px;
  }
`;

const Fieldset = ({ children }) => {
  return <FieldsetC>{children}</FieldsetC>;
};

export default Fieldset;
