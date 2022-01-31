import React from "react";

const CheckboxToggle = (props) => {
  return (
    <div className="toggle-btn">
      <input
        type="checkbox"
        name="toggle"
        id={props.inputId}
        onChange={props.handleCheck}
        checked={props.checked}
      />
      <label id={props.labelId} htmlFor="toggle"></label>
    </div>
  );
};

export default CheckboxToggle;
