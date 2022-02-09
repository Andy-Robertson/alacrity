import React from "react";
import CompletedVsIncompleted from "./CompletedVsIncompleted";

function SiteAnalyticsPopup(props) {
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
        <h2 className="title-chart"> Completed Tasks VS Incompleted Tasks</h2>
        <div className="chart">
          <CompletedVsIncompleted />
        </div>
        <div className="buttons">
          <button className="btn cancel" onClick={() => props.close(false)}>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SiteAnalyticsPopup;
