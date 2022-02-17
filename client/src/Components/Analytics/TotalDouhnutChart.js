import React from "react";
import { Doughnut } from "react-chartjs-2";

function TotalDouhnutChart({ data }) {
  // Completed Tasks
  const completedTasks = data.filter((task) => task.is_completed);
  const numberOfCompletedTasks = completedTasks.length;
  // Uncompleted Tasks
  const uncompletedTasks = data.filter((task) => !task.is_completed);
  const numberOfUncompletedTasks = uncompletedTasks.length;
  const dataD = {
    // label: "Task",
    datasets: [
      {
        data: [numberOfCompletedTasks, numberOfUncompletedTasks],
        backgroundColor: ["rgba(29, 160, 242, 0.69)", "rgba(224, 195, 252, 1)"],
      },
    ],
    labels: ["Complete", "Incomplete"],
  };
  const optionsD = {
    plugins: {
      title: {
        display: true,
        text: "Task Progress Overview",
      },
    },
  };
  return (
    <div className="doughnut-chart">
      <Doughnut data={dataD} options={optionsD} />
    </div>
  );
}

export default TotalDouhnutChart;