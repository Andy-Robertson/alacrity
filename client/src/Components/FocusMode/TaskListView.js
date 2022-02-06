import React from "react";
import Tabs from "../Tabs";

const TaskListView = ({ user, taskData, submitComplete }) => {
  const todayDate = new Date().getDate();
  const todayData = taskData.filter(
    (tasks) => new Date(tasks.by_date).getDate() === todayDate && !tasks.task_archived
  );

  return (
    <>
      <div className="wrapper__text">
        <h3>Welcome back {user.displayName}!</h3>
        <h2>You've got {todayData.length} tasks today</h2>
      </div>
      <div className="wrapper__cards">
        {taskData.length > 0 && (
          <Tabs data={taskData} submitComplete={submitComplete} />
        )}
      </div>
      <div className="wrapper__bk">
        <div>
          <h4>
            " The only difference between success and failure is the ability to
            take action."
          </h4>
          <small>Alexander Graham Bell</small>
        </div>
      </div>
    </>
  );
};

export default TaskListView;
