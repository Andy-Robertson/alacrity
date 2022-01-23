import React, { useState } from "react";
import EditImg from "../Assets/img/icons8-edit(1).svg";
import ScheduleImg from "../Assets/img/schedule.svg";
import EditPopUp from "./EditTask/EditPopUp";
const Pans = (props) => {
  const [openEditPan, setOpenEditPan] = useState(false);
  const [taskSelected, setTaskSelected] = useState([]);
  const editPupHandle = (e, task) => {
    e.stopPropagation();
    setTaskSelected(task);
    setOpenEditPan(true);
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
                <a href="#" onClick={(e) => editPupHandle(e, task)}>
                  <img src={EditImg} alt="edit"></img>
                </a>
                <img src={ScheduleImg} alt="schedule"></img>
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
