import React, { useState, useContext, useEffect } from "react";
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
  const { setTasksData } = useContext(GlobalContext);
  const [openEditPan, setOpenEditPan] = useState(false);
  const [taskSelected, setTaskSelected] = useState([]);
  const [taskIdsNotComplete, setTaskIdsNotComplete] = useState([]);

  useEffect(() => {
    const taskNotCompleteIds = props.data
      .filter((task) => {
        const allSubTasksArray = task.sub_task_option ? task.sub_tasks_checked.map((c) =>
          JSON.parse(c)
        ) : [];

        return allSubTasksArray.find(
          (task) => task.completed === false && task.task_archived !== false
        );
      })
      .map((task) => task.id);

    setTaskIdsNotComplete(taskNotCompleteIds);
  }, [props]);

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

  const handleTaskComplete = (e) => {
    const taskCompleteSound = new Audio(taskComplete);

    const completedTask = props.data.find(
      (task) => task.id === parseInt(e.target.id)
    );

    handleArchiveTask(completedTask);
    taskCompleteSound.play();
  };

  return (
    <>
      {props.data.map((task) => {
        const trimedString = task.resources.replace(/[{ } \\ " \s]/g, "");

        const stringArr = trimedString.split(",");

        return (
          <article
            key={task.id}
            className="card"
          >
            <header>
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
                    <li key={`${task.id}_${subKey}`}>
                      <SubTaskCheckBox
                        subKey={subKey}
                        subTask={subTask}
                        subjectId={task.id}
                        id={`${task.id}_${subKey}`}
                        subTasksChecked={task.sub_tasks_checked}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section className="card__rewards">
              <span className="animate__pulse">Rewards:</span>
              <p>{task.reward}</p>
            </section>
            <section className="card__resources">
              <span>Resources:</span>
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
                {!taskIdsNotComplete.includes(task.id) && !task.task_archived && (
                  <button
                    className="complete-task-button animate__animated animate__rubberBand"
                    id={task.id}
                    onClick={(e) => handleTaskComplete(e)}
                  >
                    <MdDone />
                    Complete Task
                  </button>
                )}
                {!taskIdsNotComplete.includes(task.id) && task.task_archived && (
                    <span className="card-footer-complete">Complete</span>
                  )}
                {taskIdsNotComplete.includes(task.id) && task.task_archived && (
                  <span className="card-footer-incomplete">Incomplete</span>
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
