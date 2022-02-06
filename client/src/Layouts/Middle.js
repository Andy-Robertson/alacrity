import React, { useContext } from "react";
import FocusTaskView from "../Components/FocusMode/FocusTaskView";
import TaskListView from "../Components/FocusMode/TaskListView";
import { TaskAndPomContext } from "../Contexts/TaskAndPomContext";

const Middle = ({ user, taskData, submitComplete }) => {
  const { isTaskFocused } = useContext(TaskAndPomContext);

  return (
    <section className="wrapper">
      <TaskAndPomContext.Provider value={{ isTaskFocused }}>
        {isTaskFocused ? (
          <FocusTaskView taskData={taskData} submitComplete={submitComplete} />
        ) : (
          <TaskListView
            user={user}
            taskData={taskData}
            submitComplete={submitComplete}
          />
        )}
      </TaskAndPomContext.Provider>
    </section>
  );
};

export default Middle;
