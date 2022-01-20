import React, { useState } from "react";

function AddSubTask(props) {
  const [subTask, setSubTask] = useState("");
  const [isDelete, setIsDelete] = useState(true);
  const change = (e) => {
    setSubTask(e.target.value);
    props.listHandler(e, props.index, e.target.value); // send e (event) and index to the changeHandler function which is in the Form component.
  };
  return (
    <div key={props.index}>
      {isDelete && (
        <div className="minus-container">
          <input
            type="text"
            name={"sub-task" + props.index}
            placeholder="Sub Task"
            value={subTask}
            onChange={change}
          />
          <button onClick={() => setIsDelete(false)} className="btn-minus">
            <i className="fa fa-minus"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default AddSubTask;
