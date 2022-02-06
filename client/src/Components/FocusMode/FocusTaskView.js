import React, { useContext } from "react";
import { TaskAndPomContext } from "../../Contexts/TaskAndPomContext";
import { GlobalContext } from "../../Contexts/GlobalContext";
import SubTaskCheckBox from "../SubTaskCheckBox";
import Pomodoro from "../../Components/Pomodoro/Pomodoro";
import { MdDone } from "react-icons/md";
import taskComplete from "../../Assets/audio/DADAA.mp3";

const FocusTaskView = ({ taskData }) => {
  const { setIsTaskFocused, setTasksData } = useContext(GlobalContext);
  const { focusedTask, setFocusedTask } = useContext(TaskAndPomContext);

  const isTaskComplete = taskData
    .filter((task) => task.id === focusedTask.id)
    .find((task) => task.sub_tasks.find((subTask) => !subTask.completed));

  const handleExitView = (e) => {
    if (e.target.value === "complete-task") {
      const taskArchived = focusedTask.task_archived ? false : true;
      const taskCompleteSound = new Audio(taskComplete);
      fetch("/api/tasks/archived", {
        method: "PUT",
        body: JSON.stringify({
          task_id: focusedTask.id,
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
        setFocusedTask({});
      });
    } else {
      setIsTaskFocused(false);
      setFocusedTask({});
    }
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
