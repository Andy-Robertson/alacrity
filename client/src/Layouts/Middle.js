import React, { useState, useContext } from "react";
import FocusTaskView from "../Components/FocusMode/FocusTaskView";
import TaskListView from "../Components/FocusMode/TaskListView";
import { TaskAndPomContext } from "../Contexts/TaskAndPomContext";
import { GlobalContext } from "../Contexts/GlobalContext";
import AnalyticsView from "../Components/Analytics/AnalyticsView";

const Middle = ({ user, taskData, submitComplete }) => {
  const { isTaskFocused, isAnalyticsFocused } = useContext(GlobalContext);
  const [focusedTaskId, setFocusedTaskId] = useState(null);

  // const TASK_MODE = "wrapper wrapper-task-mode";
  // const FOCUS_MODE = "wrapper wrapper-focus-mode";
  // const FOCUS_MODE_ANALYTICS = "wrapper wrapper-focus-mode-analytics";

  return (
    <>
      <TaskAndPomContext.Provider
        value={{
          focusedTaskId,
          setFocusedTaskId,
        }}
        >
        {isTaskFocused || isAnalyticsFocused ? (
          isTaskFocused ? (
            <FocusTaskView
            taskData={taskData}
            submitComplete={submitComplete}
            />
            ) : (
            <AnalyticsView />
          )
        ) : (
          <TaskListView
            user={user}
            taskData={taskData}
            submitComplete={submitComplete}
          />
        )}
      </TaskAndPomContext.Provider>
    </>
  );
};

export default Middle;
