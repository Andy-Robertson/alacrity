import React, { useState } from "react";
import EditImg from "../Assets/img/icons8-edit(1).svg";
import ScheduleImg from "../Assets/img/schedule.svg";
import EditPopUp from "./EditTask/EditPopUp";

const Pans = (props) => {
  // console.log(props.data);
  const [openEditPan, setOpenEditPan] = useState(false);
  return (
    <>
      {props.data.map((task, index) => {
        return (
          <article key={index} className="card">
            <header>
              <span className="round">
                <input type="checkbox" id={"checkbox-" + index} />
                <label htmlFor={"checkbox-" + index}></label>
              </span>
              <span className="text">
                <h3>{task.task_subject}</h3>
              </span>
              <span className="ions">
                <a href="#" onClick={() => setOpenEditPan(true)}>
                  <img src={EditImg} alt="edit"></img>
                </a>
                {openEditPan && (
                  <EditPopUp task={task} openEditPan={setOpenEditPan} />
                )}
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
    </>
  );
};

export default Pans;
