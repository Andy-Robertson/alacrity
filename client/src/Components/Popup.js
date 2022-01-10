import React, { useState } from "react";
import Form from "./AddTask/Form";

const Popup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={() => props.close(false)}>x</span>
                <Form />
            </div>
        </div>
    );
};

export default Popup;