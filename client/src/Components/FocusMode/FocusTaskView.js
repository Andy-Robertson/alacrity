import React, { useContext, useState } from "react";
import { TaskAndPomContext } from "../../Contexts/TaskAndPomContext";
import { GlobalContext } from "../../Contexts/GlobalContext";
import SubTaskCheckBox from "../SubTaskCheckBox";
import Pomodoro from "../../Components/Pomodoro/Pomodoro";

const FocusTaskView = () => {
  const { setIsTaskFocused } = useContext(GlobalContext);
  const { focusedTask, setFocusedTask } = useContext(TaskAndPomContext);

  const [isTaskComplete] = useState();

  const handleActiveView = () => {
    setIsTaskFocused(false);
    setFocusedTask({});
  };

  return (
    <>
      <div className="focused-card animate__animated animate__fadeInLeftBig">
        <h2 className="focused-card-title">{focusedTask.task_subject}</h2>

        {focusedTask.subject_description && (
          <p className="focused-card-description">
            <h3>Description:</h3>
            {focusedTask.subject_description}
          </p>
        )}

        {focusedTask.sub_tasks && (
          <span className="focused-card-stage card__content">
            <h3>Stage:</h3>
            <ul>
              {focusedTask.sub_tasks.map((subTask, subKey) => (
                <li key={`${focusedTask.id}_${subKey}`}>
                  <SubTaskCheckBox
                    subKey={subTask.id}
                    name={subTask.name}
                    subTaskId={subTask.id}
                    completed={subTask.completed}
                    id={`${focusedTask.id}_${subKey}`}
                  />
                </li>
              ))}
            </ul>
          </span>
        )}

        {focusedTask.resources && focusedTask.resources !== "{}" && (
          <span className="focused-card-resources-container">
            <h3>Useful resources:</h3>
            <div>{focusedTask.resources}</div>
          </span>
        )}

        {focusedTask.reward && (
          <span className="focused-card-rewards-container">
            <h3>Rewards:</h3>
            <div>{focusedTask.reward}</div>
          </span>
        )}

        <span className="focussed-task-btn-container">
          {isTaskComplete ? (
            <button
              type="button"
              className="focussed-task-btn"
              onClick={handleActiveView}
            >
              Choose Another Task
            </button>
          ) : (
            <button
              type="button"
              className="focussed-task-btn"
              onClick={handleActiveView}
            >
              Complete Task
            </button>
          )}
        </span>
      </div>
      <Pomodoro />
    </>
  );
};

export default FocusTaskView;
