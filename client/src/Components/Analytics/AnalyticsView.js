import React, { useState, useEffect, useContext } from "react";
import MonthlyLineChart from "./MonthlyLineChart";
import TotalDouhnutChart from "./TotalDouhnutChart";
import WeeklyLineChart from "./WeeklyLineChart";
import { GlobalContext } from "../../Contexts/GlobalContext";

const AnalyticsView = () => {
  const { setIsAnalyticsFocused } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/tasks/analytics")
      .then((response) => response.json())
      .then((analyticsData) => {
        setData(analyticsData);
      });
  }, []);
  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <section className="wrapper-focus-mode-analytics">
      <div
        className="box-analytics animate__animated animate__fadeInUpBig"
        onClick={(e) => handlePropagation(e)}
      >
        <div>
          {data.length > 0 ? (
            <div>
              <h2 className="title-analytics">
                {" "}
                Analytics For Completed Tasks VS Uncompleted Tasks
              </h2>
              <div className="chart">
                <div className="line-chart-container">
                  <WeeklyLineChart data={data} />
                  <MonthlyLineChart data={data} />
                </div>
                <TotalDouhnutChart data={data} />
              </div>
            </div>
          ) : (
            <h1>There is no data to analyse</h1>
          )}
        </div>
        </div>

      <div className="buttons">
        <button
          className="btn cancel"
          onClick={() => setIsAnalyticsFocused(false)}
        >
          <span>Cancel</span>
        </button>
      </div>
    </section>
  );
};

export default AnalyticsView;
