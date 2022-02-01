import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function SubTaskCheckBox(props) {
  const [ischecked, setIsChecked] = useState(null);
  const [id, setId] = useState("");

  const clickHandler = (e) => {
    setIsChecked(e.target.checked);
    setId(e.target.id);
  };
  if (ischecked === true) {
    fetch("api/ticket", {
      method: "POST",
      body: JSON.stringify({
        subject_id: props.subjectId,
        task_element: props.subKey,
        id: id,
        boolean: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (ischecked === false) {
    fetch("api/ticket", {
      method: "POST",
      body: JSON.stringify({
        subject_id: props.subjectId,
        task_element: props.subKey,
        id: id,
        boolean: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const uuidKey = uuidv4();
  const uuidId = uuidv4();

  return (
    <div key={uuidKey}>
      <span className="round">
        <input
          type="checkbox"
          id={uuidId}
          onChange={clickHandler}
          checked={ischecked}
        />
        <label htmlFor={uuidId}></label>
      </span>
      <span>{props.subTask}</span>
    </div>
  );
}

export default SubTaskCheckBox;
