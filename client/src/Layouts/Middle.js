import React, { useState, useContext } from "react";
import FocusTaskView from "../Components/FocusMode/FocusTaskView";
import TaskListView from "../Components/FocusMode/TaskListView";
import { TaskAndPomContext } from "../Contexts/TaskAndPomContext";
import { GlobalContext } from "../Contexts/GlobalContext";

const Middle = ({ user, taskData, submitComplete }) => {
  const { isTaskFocused } = useContext(GlobalContext);
  const [focusedTask, setFocusedTask] = useState({});
console.log("Middle is task focused", isTaskFocused);

  return (
    <section className="wrapper">
      <TaskAndPomContext.Provider
        value={{
          focusedTask,
          setFocusedTask,
        }}
      >
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
