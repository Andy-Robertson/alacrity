import React from "react";
import { Doughnut } from "react-chartjs-2";


function WeeklyDouhnutChart() {
 const dataD = {
   // label: "Task",
   datasets: [
     {
       data: [80, 20],
       backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
     },
   ],
   labels: ["Completed", "Uncompleted"],
 };
 const optionsD = {
   plugins: {
     title: {
       display: true,
       text: "Tasks Completion",
     },
   },
 };
  return (
    <div className="doughnut-chart">
      <Doughnut data={dataD} options={optionsD} />
    </div>
  );
}

export default WeeklyDouhnutChart;