import React from "react";
import { Doughnut } from "react-chartjs-2";


function WeeklyDouhnutChart() {
 const dataD = {
   // label: "Task",
   datasets: [
     {
       data: [80, 20],
       backgroundColor: ["rgba(29, 160, 242, 0.69)", "rgba(224, 195, 252, 1)"],
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