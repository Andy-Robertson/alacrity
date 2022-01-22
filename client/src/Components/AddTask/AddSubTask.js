import React from "react";


function AddSubTask(props) {
  const change = (e) => {
    props.listHandler(e, props.index, e.target.value); // send e (event) and index to the changeHandler function which is in the Form component.
  };
  const deleteHandler = (e, index) => {
    props.deleteHandlerFromList(e, index);
  };
  return (
    <div key={props.key} className="minus-container">
      <input
        type="text"
        id={props.index}
        name={"sub-task" + props.index}
        placeholder="Sub Task"
        value={props.value}
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
