import React from "react";
import Input from "./Input";
import Label from "./Label";

const LabelInput = (props, index) => {
  return (
    <>
      <Label
        key={index}
        name={props.name}
        subName={props.subName}
        engName={props.engName}
        id={props.id}
        onClick={(e) => props.onClick(e)}
      />
      <Input key={props.name} name={props.name} engName={props.engName} />
    </>
  );
};

export default LabelInput;
