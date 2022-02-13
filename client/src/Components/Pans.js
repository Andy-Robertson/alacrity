import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import { TaskAndPomContext } from "../Contexts/TaskAndPomContext";
import EditImg from "../Assets/img/icons8-edit(1).svg";
import ScheduleImg from "../Assets/img/schedule.svg";
import ArchiveImg from "../Assets/img/archive.png";
import RestoreImg from "../Assets/img/restore.png";
import { MdDone } from "react-icons/md";
import EditPopUp from "./EditTask/EditPopUp";
import SubTaskCheckBox from "./SubTaskCheckBox";
import taskComplete from "../Assets/audio/DADAA.mp3";

const Pans = (props) => {
  const { setTasksData, setIsTaskFocused } = useContext(GlobalContext);
  const { setFocusedTaskId } = useContext(TaskAndPomContext);

  const [openEditPan, setOpenEditPan] = useState(false);
  const [taskSelected, setTaskSelected] = useState([]);
  const [taskIdsNotComplete, setTaskIdsNotComplete] = useState([]);

  useEffect(() => {
    const taskNotCompleteIds = props.data
      .filter((task) => task.sub_tasks.some((subTask) => !subTask.completed))
      .map((task) => task.id);

    setTaskIdsNotComplete(taskNotCompleteIds);
  }, [props]);

  // console.log(taskIdsNotComplete);
  // const taskCompleteIds = props.data.filter(
  //   (task) => !taskIdsNotComplete.includes(task.id)
  // );
  // console.log(taskCompleteIds);
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
      fetch("/api/tasks/analytics", {
        method: "POST",
        body: JSON.stringify({
          user_id: task.user_id,
          task_id: task.id,
          task_archived: taskArchived,
          by_date: task.by_date,
          is_completed: !taskIdsNotComplete.includes(task.id) ? true : false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          setTasksData(data);
        });
    });
  };

  // update analytics table if the sub tasks are clicked in the archive tab.
  const updateAnalyticsTable = (id, boolean) => {
    fetch("/api/tasks/analytics", {
      method: "PUT",
      body: JSON.stringify({
        task_id: id,
        is_completed: boolean,
      }),
      headers: {
        "Content-Type": "application/json",
      },
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

  if (props.expiredTasks) {
    props.expiredTasks.forEach((task) => handleArchiveTask(task));
  }

  const handleActiveView = (task) => {
    console.log(task.id);
    setIsTaskFocused(true);
    setFocusedTaskId(task.id);
  };

  return (
    <>
      {props.data.map((task) => {

        return (
          <article
            key={task.id}
            className="card animate__animated animate__backInLeft"
          >
            <header>
              <span className="text">
                <h3>{task.task_subject}</h3>
              </span>
              <span className="ions animate__animated animate__fadeIn animate__delay-1s animate__slow">
                {!task.task_archived && (
                  <a href="#" onClick={(e) => handleEditPopup(e, task)}>
                    <img src={EditImg} alt="edit"></img>
                  </a>
                )}

                {!task.task_archived && (
                  <a href="#" className="focus-mode-btn" onClick={() => handleActiveView(task)}>
                    <img src={ScheduleImg} alt="schedule"></img>
                  </a>
                )}

                <a href="#" onClick={() => handleArchiveTask(task)}>
                  <img
                    src={task.task_archived ? RestoreImg : ArchiveImg}
                    alt="archive"
                  ></img>
                </a>
              </span>
            </header>
            <section className="card__content animate__animated animate__fadeIn animate__delay-1s animate__slow">
              <p>{task.subject_description}</p>
            </section>
            {task.sub_task_option === true ? (
              <section className="card__content animate__animated animate__fadeIn animate__delay-1s animate__slow">
                <ul>
                  {task.sub_tasks
                    .sort((a, b) => a.index - b.index)
                    .map((subTask, subKey) => (
                      <li key={`${task.id}_${subKey}`}>
                        <SubTaskCheckBox
                          subKey={subTask.id}
                          name={subTask.name}
                          subTaskId={subTask.id}
                          completed={subTask.completed}
                          id={`${task.id}_${subKey}`}
                        />
                      </li>
                    ))}
                </ul>
              </section>
            ) : null}
            <section className="card__rewards animate__animated animate__fadeIn animate__delay-1s animate__slow">
              <span className="animate__pulse">Rewards:</span>
              <p>{task.reward}</p>
            </section>
            <section className="card__resources animate__animated animate__fadeIn animate__delay-1s animate__slow">
              <span>Resources:</span>
              {task.resources.map(
                (resource, key) =>
                  resource && (
                    <div key={key} className="resources-pill">
                      <span> {resource.replace(/,/g, "")} </span>
                    </div>
                  )
              )}
            </section>
            <footer className="card-footer animate__animated animate__fadeIn animate__delay-1s animate__slow">
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
                  <div>
                    {updateAnalyticsTable(task.id, true)}
                    <span className="card-footer-complete">Complete</span>
                  </div>
                )}
                {taskIdsNotComplete.includes(task.id) && task.task_archived && (
                  <div>
                    {updateAnalyticsTable(task.id, false)}
                    <span className="card-footer-incomplete">Incomplete</span>
                  </div>
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
