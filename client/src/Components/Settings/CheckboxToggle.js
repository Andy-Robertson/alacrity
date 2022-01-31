import React from "react";

const CheckboxToggle = (props) => {
  console.log(props);
  return (
    <div className="toggle-btn">
      <input
        type="checkbox"
        name={props.name}
        id={props.inputId}
        onChange={props.handleCheck}
        checked={props.checked}
      />
      <label id={props.labelId} htmlFor={props.for}></label>
    </div>
  );
};

export default CheckboxToggle;