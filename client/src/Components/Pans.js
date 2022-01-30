import React, { useState, useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import EditImg from "../Assets/img/icons8-edit(1).svg";
import ScheduleImg from "../Assets/img/schedule.svg";
import ArchiveImg from "../Assets/img/archive.png";
import RestoreImg from "../Assets/img/restore.png";
import EditPopUp from "./EditTask/EditPopUp";

const Pans = (props) => {
  const [openEditPan, setOpenEditPan] = useState(false);
  const [taskSelected, setTaskSelected] = useState([]);
  const { setTasksData } = useContext(GlobalContext);

  const handleEditPopup = (e, task) => {
    e.stopPropagation();
    setTaskSelected(task);
    setOpenEditPan(true);
  };

  const handleArchiveTask = (e, task) => {
    e.stopPropagation();

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
    });

    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasksData(data);
      });
  };

  return (
    <>
      {props.data.map((task, index) => {
        return (
          <article key={task.id} className="card">
            <header>
              <span className="round">
                <input type="checkbox" id={"checkbox-" + index} />
                <label htmlFor={"checkbox-" + index}></label>
              </span>

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

                <a href="#" onClick={(e) => handleArchiveTask(e, task)}>
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
                      <span className="round">
                        <input
                          type="checkbox"
                          id={"checkbox-subtask-" + subKey}
                        />
                        <label htmlFor={"checkbox-subtask-" + subKey}></label>
                      </span>
                      <span>{subTask}</span>
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
              <p>{task.resources}</p>
            </section>
            <footer className="card_footer">
              <time dateTime={task.by_time}>{task.by_time}</time>
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
