import React from "react";
import TotalCompletedVsUncompletedLineChart from "./TotalCompletedVsUncompletedLineChart";
import WeeklyDouhnutChart from "./WeeklyDouhnutChart";

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
        <h2 className="title-analytics">
          {" "}
          Analytics For Completed Tasks VS Uncompleted Tasks
        </h2>
        <div className="chart">
          <WeeklyDouhnutChart />
          <TotalCompletedVsUncompletedLineChart />
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
