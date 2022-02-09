import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function CompletedVsIncompleted() {
 // data for the data of chart
 const data = {
   labels: ["Week 1,", "Week 2", "Week 3", "Week 4"], // x-axis labels
   datasets: [
     // array of object, each object correspond to one line
     {
       label: "Tasks Completed",
       data: [5, 12, 10, 12],
       backgroundColor: ["rgba(255, 99, 132, 0.2)"],
       borderColor: ["rgba(255, 99, 132, 0.2)"],
       pointBackgroundColor: ["rgba(255, 99, 132, 0.2)"],
       pointBorderColor: ["rgba(255, 99, 132, 0.2)"],
     },
     {
       label: "Tasks Incompleted",
       data: [2, 5, 4, 5],
       backgroundColor: ["rgba(54, 162, 235, 0.2)"],
       borderColor: ["rgba(54, 162, 235, 0.2)"],
       pointBackgroundColor: ["rgba(54, 162, 235, 0.2)"],
       pointBorderColor: ["rgba(54, 162, 235, 0.2)"],
     },
   ],
 };

 // if you need other options use options
 const options = {
  title: {
   display: true,
   text: "Completed Tasks VS Incompleted Tasks",
  },
  yAxes: [
   {
    ticks: {
     min:2,
     max:15,
     stepsize: 2,
    },
   },
  ],
 };

  return (
  <div>
   <Line data={data} options={options}/>
  </div>
  );
}

export default CompletedVsIncompleted;
