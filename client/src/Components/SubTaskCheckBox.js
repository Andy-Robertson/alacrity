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
    <div className="task-checkbox">
      <input
        type="checkbox"
        id={props.id}
        checked={props.completed}
        onChange={clickHandler}
      />
      <label
        htmlFor={props.id}
        className="strikethrough"
      >
        {props.name}
      </label>
    </div>
  );
}

export default SubTaskCheckBox;
