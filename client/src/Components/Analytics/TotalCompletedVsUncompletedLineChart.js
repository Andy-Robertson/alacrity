import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function TotalCompletedVsUncompletedLineChart() {
  useEffect(() => {
    fetch("/api/analytics")
      .then((response) => response.json())
      .then((analyticsData) => {
        console.log(analyticsData);
      });
  }, []);
  // data for the data of chart
  const data = {
    labels: ["Week 1,", "Week 2", "Week 3", "Week 4"], // x-axis labels
    datasets: [
      // array of object, each object correspond to one line
      {
        label: "Tasks Completed",
        data: [5, 12, 10, 12],
        backgroundColor: ["rgba(29, 160, 242, 0.69)"],
        borderColor: ["rgba(29, 160, 242, 0.69)"],
        pointBackgroundColor: ["rgba(29, 160, 242, 0.69)"],
        pointBorderColor: ["rgba(29, 160, 242, 0.69)"],
      },
      {
        label: "Tasks Uncompleted",
        data: [2, 5, 4, 5],
        backgroundColor: ["rgba(224, 195, 252, 1)"],
        borderColor: ["rgba(224, 195, 252, 1)"],
        pointBackgroundColor: ["rgba(224, 195, 252, 1)"],
        pointBorderColor: ["rgba(224, 195, 252, 1)"],
      },
    ],
  };

  // if you need other options use options
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Total Completed Tasks VS Total Uncompleted Tasks",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 14,
        stepSize: 2,
        title: {
          display: true,
          text: "Total Tasks",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
  };

  return (
    <div className="line-chart">
      <Line data={data} options={options} />
    </div>
  );
}

export default TotalCompletedVsUncompletedLineChart;
