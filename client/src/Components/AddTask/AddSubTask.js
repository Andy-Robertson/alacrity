import React from "react";


function AddSubTask(props) {
  const change = (e) => {
    props.listHandler(e, props.index, e.target.value); // send e (event) and index to the changeHandler function which is in the Form component.
  };
  const deleteHandler = (e, compositIndex) => {
    props.deleteHandlerFromList(e, compositIndex);
  };
  return (
    <div className="minus-container">
      <input
        type="text"
        id={`${props.index}_${props.value}`}
        name={"sub-task" + props.index}
        placeholder="Sub Task"
        value={props.value}
        onChange={change}
      />
      <button
        onClick={(e) => deleteHandler(e, `${props.index}_${props.value}`)}
        className="btn-minus"
      >
        <i className="fa fa-minus"></i>
      </button>
    </div>
  );
}

export default AddSubTask;
