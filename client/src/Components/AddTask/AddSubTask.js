import React, { useState } from "react";

function AddSubTask(props) {
  const [subTask, setSubTask] = useState(props.value);
  const change = (e) => {
    setSubTask(e.target.value);
    props.listHandler(e, props.index, e.target.value); // send e (event) and index to the changeHandler function which is in the Form component.
  };
  const deleteHandler = (e, index) => {
    props.deleteHandlerFromList(e, index);
  };
  return (
    <div key={props.index} className="minus-container">
        <input
          type="text"
          name={"sub-task" + props.index}
          placeholder="Sub Task"
          value={subTask}
          onChange={change}
        />
        <button
          onClick={(e) => deleteHandler(e, props.index)}
          className="btn-minus"
        >
          <i className="fa fa-minus"></i>
        </button>
    </div>
  );
}

export default AddSubTask;
