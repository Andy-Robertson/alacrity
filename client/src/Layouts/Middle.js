import React, { useState, useContext } from "react";
import FocusTaskView from "../Components/FocusMode/FocusTaskView";
import TaskListView from "../Components/FocusMode/TaskListView";
import { TaskAndPomContext } from "../Contexts/TaskAndPomContext";
import { GlobalContext } from "../Contexts/GlobalContext";

const Middle = ({ user, taskData, submitComplete }) => {
  const { isTaskFocused } = useContext(GlobalContext);
  const [focusedTaskId, setFocusedTaskId] = useState(null);

  const TASK_MODE = "wrapper wrapper-task-mode";
  const FOCUS_MODE = "wrapper wrapper-focus-mode";

  return (
    <section className={isTaskFocused ? FOCUS_MODE : TASK_MODE}>
      <TaskAndPomContext.Provider
        value={{
          focusedTaskId,
          setFocusedTaskId,
        }}
      >
        {isTaskFocused ? (
          <FocusTaskView
            taskData={taskData}
            submitComplete={submitComplete}
          />
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
