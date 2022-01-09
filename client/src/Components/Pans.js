import React from "react";
import EditImg from "../Assets/img/icons8-edit(1).svg";
import ScheduleImg from "../Assets/img/schedule.svg";

const Pans = (props) => {
  console.log(props.data);
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
                <img src={EditImg} alt="edit"></img>
                <img src={ScheduleImg} alt="schedule"></img>
              </span>
            </header>
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
            ) : (
              <section className="card__content">
                <p>{task.subject_describtion}</p>
              </section>
            )}
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
