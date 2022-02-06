import React from "react";
// import FocusTaskView from "../Components/FocusMode/FocusTaskView";
import TaskListView from "../Components/FocusMode/TaskListView";

const Middle = ({ user, taskData, submitComplete }) => {

  return (
    <section className="wrapper">
      {/* <FocusTaskView /> */}

      <TaskListView
        user={user}
        taskData={taskData}
        submitComplete={submitComplete}
      />
    </section>
  );
};

export default Middle;
