import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
function SubTaskCheckBox(props) {
  const [ischecked, setIsChecked] = useState(false);
  // const [id, setId] = useState("");

  const clickHandler = (e) => {
    setIsChecked(e.target.checked);
    // setId(e.target.id);
    fetch("api/ticket", {
      method: "POST",
      body: JSON.stringify({
        subject_id: props.subjectId,
        task_index: props.subKey,
        name: props.subTask,
        completed: e.target.checked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };


  // if (ischecked === true) {

  // }
  // if (ischecked === false) {
  //   fetch("api/ticket", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       subject_id: props.subjectId,
  //       task_element: props.subKey,
  //       id: id,
  //       boolean: ischecked,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  // const uuidKey = uuidv4();
  // const uuidId = uuidv4();
  // const id = `${props.subjectId}_${props.subKey}`;
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
