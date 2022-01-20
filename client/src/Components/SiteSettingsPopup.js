// import React, { useState } from "react";
import SiteSettingsPomodoro from "./SiteSettingsPomodoro";

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={() => props.close(false)}>
          x
        </span>
        <h2>Settings</h2>
        <SiteSettingsPomodoro />
      </div>
    </div>
  );
};

export default Popup;
