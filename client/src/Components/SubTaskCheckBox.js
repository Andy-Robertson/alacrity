import React, { useState, useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";

function SubTaskCheckBox(props) {
  const { setTasksData } = useContext(GlobalContext);

  const allSubTasksArray = props.subTasksChecked.map((c) => JSON.parse(c));
  const subTaskArray = allSubTasksArray.filter(
    (subTask) => subTask.index === props.subKey
  );
  const completed = subTaskArray[0].completed; // true or false

  const [ischecked, setIsChecked] = useState(completed);

  const clickHandler = (e) => {
    setIsChecked(e.target.checked);
    fetch("api/task/status", {
      method: "PUT",
      body: JSON.stringify({
        subject_id: props.subjectId,
        name: props.subTask,
        index: props.subKey,
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
          checked={ischecked}
        />
        <label htmlFor={props.id}></label>
      </span>
      <span>{props.subTask}</span>
    </div>
  );
}

export default SubTaskCheckBox;
