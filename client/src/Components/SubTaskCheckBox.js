import React, {  useState } from "react";
// import { v4 as uuidv4 } from "uuid";
function SubTaskCheckBox(props) {
  // console.log(props.subTasksChecked.map((c) => JSON.parse(c)));
  const allSubTasksArray = props.subTasksChecked.map((c) => JSON.parse(c));
  const subTaskArray = allSubTasksArray.filter((subTask) => subTask.index === props.subKey);
  const completed = subTaskArray[0].completed; // true or false
  console.log(subTaskArray);
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
