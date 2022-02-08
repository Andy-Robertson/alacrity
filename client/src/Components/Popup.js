import React from "react";
import Form from "./AddTask/Form";

const Popup = (props) => {
  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="popup-box animate__animated animate__fadeIn"
      onClick={() => props.close(false)}
    >
      <div
        className="box animate__animated animate__fadeInUpBig"
        onClick={(e) => handlePropagation(e)}
      >
        <Form
          submitComplete={props.submitComplete}
          closeOnSubmit={props.close}
          closeBtn={props.close}
        />
      </div>
    </div>
  );
};

export default Popup;