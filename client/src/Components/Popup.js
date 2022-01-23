import React from "react";
import Form from "./AddTask/Form";

const Popup = (props) => {
    const handlePropagation = (e) => {
      e.stopPropagation();
    };
  
  return (
    <div className="popup-box" onClick={() => props.close(false)}>
      <div className="box" onClick={(e) => handlePropagation(e)}>
        <span className="close-icon" onClick={() => props.close(false)}>
          x
        </span>
        <Form submitComplete={props.submitComplete} closeOnSubmit={props.close}/>
            </div>
        </div>
    );
};

export default Popup;
