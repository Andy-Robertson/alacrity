import React, { useContext, useState, useEffect } from "react";
import { TaskAndPomContext } from "../../Contexts/TaskAndPomContext";
import { GlobalContext } from "../../Contexts/GlobalContext";
import SubTaskCheckBox from "../SubTaskCheckBox";
import Pomodoro from "../../Components/Pomodoro/Pomodoro";
import { MdDone } from "react-icons/md";
import taskComplete from "../../Assets/audio/DADAA.mp3";

const FocusTaskView = ({ taskData }) => {
  const { setIsTaskFocused, setTasksData } = useContext(GlobalContext);
  const { focusedTaskId, setFocusedTaskId } = useContext(TaskAndPomContext);

  const [focusedTask, setFocusedTask] = useState(
    taskData.find((task) => task.id === focusedTaskId)
  );

  useEffect(() => {
    setFocusedTask(taskData.find((task) => task.id === focusedTaskId));
  }, [taskData, focusedTaskId]);

  const isTaskComplete = taskData
    .filter((task) => task.id === focusedTaskId)
    .find((task) => task.sub_tasks.find((subTask) => !subTask.completed));

  const handleExitView = (e) => {
    if (e.target.value === "complete-task") {
      const taskArchived = focusedTask.task_archived ? false : true;
      const taskCompleteSound = new Audio(taskComplete);
      fetch("/api/tasks/archived", {
        method: "PUT",
        body: JSON.stringify({
          task_id: focusedTaskId,
          task_archived: taskArchived,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        fetch("/api/tasks")
          .then((res) => res.json())
          .then((data) => {
            setTasksData(data);
          });
        taskCompleteSound.play();
        setIsTaskFocused(false);
        setFocusedTaskId(null);
      });
    } else {
      setIsTaskFocused(false);
      setFocusedTaskId(null);
    }
  };

  return (
    <>
      <div className="focused-card animate__animated animate__backInLeft">
        <h2 className="focused-card-title">{focusedTask.task_subject}</h2>

        {focusedTask.subject_description && (
          <span className="focused-card-description animate__animated animate__fadeIn animate__delay-1s">
            <h3>Description:</h3>
            {focusedTask.subject_description}
          </span>
        )}

        {focusedTask.sub_tasks.length > 0 && (
          <span className="focused-card-stage card__content animate__animated animate__fadeIn animate__delay-1s">
            <h3>Stage:</h3>
            <ul>
              {focusedTask.sub_tasks
                .sort((a, b) => a.index - b.index)
                .map((subTask, subKey) => (
                  <li key={`${focusedTaskId}_${subKey}`}>
                    <SubTaskCheckBox
                      subKey={subTask.id}
                      name={subTask.name}
                      subTaskId={subTask.id}
                      completed={subTask.completed}
                      id={`${focusedTaskId}_${subKey}`}
                    />
                  </li>
                ))}
            </ul>
          </span>
        )}

        {focusedTask.resources.length > 0 && (
          <span className="focused-card-resources-container animate__animated animate__fadeIn animate__delay-1s ">
            <h3>Useful resources:</h3>
            {focusedTask.resources.map((resource) => (
              <li
                key={`${focusedTask.id}_${resource}`}
                className="resources-pill"
              >
                {resource.replace(/,/g, "")}
              </li>
            ))}
          </span>
        )}

        {focusedTask.reward && (
          <span className="focused-card-rewards-container animate__animated animate__fadeIn animate__delay-1s">
            <h3>Rewards:</h3>
            <div>{focusedTask.reward}</div>
          </span>
        )}

        <span className="focussed-task-btn-container">
          {!isTaskComplete ? (
            <button
              type="button"
              className="focussed-task-btn focussed-task-complete-btn animate__animated animate__rubberBand"
              value="complete-task"
              onClick={(e) => handleExitView(e)}
            >
              <MdDone />
              Complete Task
            </button>
          ) : (
            <button
              type="button"
              className="focussed-task-btn"
              value="new-task"
              onClick={(e) => handleExitView(e)}
            >
              Choose Another Task
            </button>
          )}
        </span>
      </div>
      <Pomodoro />
    </>
  );
};

export default FocusTaskView;
