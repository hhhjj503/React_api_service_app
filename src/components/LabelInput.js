import React from "react";
import Input from "./Input";
import Label from "./Label";

const LabelInput = (props) => {
  return (
    <>
      <Label key={props.key} name={props.name} engName={props.engName} />
      <Input key={props.name} name={props.name} engName={props.engName} />
    </>
  );
};

export default LabelInput;
