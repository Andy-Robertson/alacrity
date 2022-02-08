import React, { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";

function SubTaskCheckBox(props) {
  const { setTasksData } = useContext(GlobalContext);

  const clickHandler = (e) => {
    fetch("api/task/status", {
      method: "PUT",
      body: JSON.stringify({
        id: props.subTaskId,
        completed: e.target.checked,
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

  return (
    <div>
      <span className="round">
        <input
          type="checkbox"
          id={props.id}
          onChange={clickHandler}
          checked={props.completed}
        />
        <label htmlFor={props.id}></label>
      </span>
      <span className="card-task-name">{props.name}</span>
    </div>
  );
}

export default SubTaskCheckBox;
