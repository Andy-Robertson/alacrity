import React, { useState, useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import EditImg from "../Assets/img/icons8-edit(1).svg";
import ScheduleImg from "../Assets/img/schedule.svg";
import ArchiveImg from "../Assets/img/archive.png";
import RestoreImg from "../Assets/img/restore.png";
import { MdDone } from "react-icons/md";
import EditPopUp from "./EditTask/EditPopUp";
import SubTaskCheckBox from "./SubTaskCheckBox";
import taskComplete from "../Assets/audio/DADAA.mp3";

const Pans = (props) => {
  const [openEditPan, setOpenEditPan] = useState(false);
  const [taskSelected, setTaskSelected] = useState([]);
  const { setTasksData } = useContext(GlobalContext);
  const [taskCompleted] = useState(true);

  const handleEditPopup = (e, task) => {
    e.stopPropagation();
    setTaskSelected(task);
    setOpenEditPan(true);
  };

  const handleArchiveTask = (task) => {
    const taskArchived = task.task_archived ? false : true;

    fetch("/api/tasks/archived", {
      method: "PUT",
      body: JSON.stringify({
        task_id: task.id,
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
    });
  };

  // temp data
  const dbData = [
    {
      subject_id: 6,
      subtask_complete: true,
    },
    {
      subject_id: 6,
      subtask_complete: true,
    },
    {
      subject_id: 6,
      subtask_complete: true,
    },
  ];

  const handleTaskComplete = (e) => {
    const taskCompleteSound = new Audio(taskComplete);


    // needed in the db too
    // const task_complete = false;
    // const total_tasks_complete = 0;

    // returns true if any subtasks are false in array, undefined otherwise
    const remainingSubTasks = dbData.find(
      (sub) => sub.subtask_complete === false
    );

    // check task status (if undefined // no false) and complete task
    if (!remainingSubTasks) {
      const completedTask = props.data.find(
        (task) => task.id === parseInt(e.target.id)
      );

      handleArchiveTask(completedTask);
      taskCompleteSound.play();
    }
  };

  return (
    <>
      {props.data.map((task) => {
        const trimedString = task.resources.replace(/[{ } \\ " \s]/g, "");
        // console.log("trim", trimedString);
        const stringArr = trimedString.split(",");

        // console.log("arr",stringArr);
        return (
          <article key={task.id} className="card">
            <header>
              {/* <span className="round">
                <input
                  type="checkbox"
                  id={task.id}
                  onChange={(e) => handleTaskComplete(e)}
                />
                <label htmlFor={task.id}></label>
              </span> */}
              <span className="text">
                <h3>{task.task_subject}</h3>
              </span>
              <span className="ions">
                {!task.task_archived && (
                  <a href="#" onClick={(e) => handleEditPopup(e, task)}>
                    <img src={EditImg} alt="edit"></img>
                  </a>
                )}

                {!task.task_archived && (
                  <img src={ScheduleImg} alt="schedule"></img>
                )}

                <a href="#" onClick={() => handleArchiveTask(task)}>
                  <img
                    src={task.task_archived ? RestoreImg : ArchiveImg}
                    alt="archive"
                  ></img>
                </a>
              </span>
            </header>
            <section className="card__content">
              <p>{task.subject_description}</p>
            </section>
            {task.sub_task_option === true ? (
              <section className="card__content">
                <ul>
                  {task.sub_tasks.map((subTask, subKey) => (
                    <li key={subKey}>
                      <SubTaskCheckBox
                        subKey={subKey}
                        subTask={subTask}
                        subjectId={task.id}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section className="card__rewards">
              <span>Rewards:</span>
              <p>{task.reward}</p>
            </section>
            <section className="card__resources">
              <span>Resources:</span>
              {/* <div className="pill">
                <span>{task.resources}</span>
                </div> */}
              {stringArr.map(
                (resource, key) =>
                  resource && (
                    <div key={key} className="pill">
                      <span> {resource.replace(/,/g, "")} </span>
                    </div>
                  )
              )}
            </section>
            <footer className="card-footer">
              <time dateTime={task.by_time}>{task.by_time}</time>
              <span>
                {taskCompleted && !task.task_archived && (
                  <button
                    className="complete-task-button"
                    id={task.id}
                    onClick={(e) => handleTaskComplete(e)}
                  >
                    <MdDone/>Complete Task
                  </button>
                )}
                {taskCompleted && task.task_archived && <span>Complete</span>}
                {!taskCompleted && task.task_archived && (
                  <span>Incomplete</span>
                )}
              </span>
            </footer>
          </article>
        );
      })}
      {openEditPan && (
        <EditPopUp
          task={taskSelected}
          openEditPan={setOpenEditPan}
          submitComplete={props.submitComplete}
        />
      )}
    </>
  );
};

export default Pans;
