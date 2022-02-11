import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function TotalCompletedVsUncompletedLineChart({ data }) {
  // console.log(data);
  const time = data.map((task) => {
    const d = new Date(task.by_date);
    let formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    return formattedDate;
  });
  const uniqueTime = [...new Set(time)]; // Remove duplicate elements
  console.log(uniqueTime);

  // Total Tasks
  const counts ={};
  data.forEach((task) => {
    const d = new Date(task.by_date);
    let taskDate = `${
      d.getMonth() + 1
    }/${d.getDate()}/${d.getFullYear()}`;
    counts[taskDate] = (counts[taskDate] || 0) +1;
  });

  // Completed Tasks
  const completedTasks = data.filter((task) => task.is_completed);
  const countsCompletedTasks = {};
  completedTasks.forEach((completedTask) => {
    const d = new Date(completedTask.by_date);
    let completedTaskDate = `${
      d.getMonth() + 1
    }/${d.getDate()}/${d.getFullYear()}`;
    countsCompletedTasks[completedTaskDate]
    = (countsCompletedTasks[completedTaskDate] || 0) + 1;
  });
  const numberOfCompletedTasks = Object.values(countsCompletedTasks);
  console.log(numberOfCompletedTasks);
  // Uncompleted Tasks
  const uncompletedTasks = data.filter((task) => !task.is_completed);
  const countsUncompletedTasks = {};
  uncompletedTasks.forEach((uncompletedTask) => {
    const d = new Date(uncompletedTask.by_date);
    let uncompletedTaskDate = `${
      d.getMonth() + 1
    }/${d.getDate()}/${d.getFullYear()}`;
    countsUncompletedTasks[uncompletedTaskDate]
    = (countsUncompletedTasks[uncompletedTaskDate] || 0) + 1;
  });
  const numberOfUncompletedTasks = Object.values(countsUncompletedTasks);
  console.log(numberOfUncompletedTasks);

  const dataChart = {
    labels: uniqueTime, // x-axis labels
    datasets: [
      // array of object, each object correspond to one line
      {
        label: "Tasks Completed",
        data: numberOfCompletedTasks,
        backgroundColor: ["rgba(29, 160, 242, 0.69)"],
        borderColor: ["rgba(29, 160, 242, 0.69)"],
        pointBackgroundColor: ["rgba(29, 160, 242, 0.69)"],
        pointBorderColor: ["rgba(29, 160, 242, 0.69)"],
      },
      {
        label: "Tasks Uncompleted",
        data: numberOfUncompletedTasks,
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
      <Line data={dataChart} options={options} />
    </div>
  );
}

export default TotalCompletedVsUncompletedLineChart;
