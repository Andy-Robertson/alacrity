import React from "react";
import EditForm from "./EditForm";
function EditPopUp({ task, openEditPan, submitComplete }) {

  const handlePropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="popup-box">
      <div className="box" onClick={(e) => handlePropagation(e)}>
        <span className="close-icon" onClick={() => openEditPan(false)}>
          x
        </span>
        <EditForm
          task={task}
          submitComplete={submitComplete}
          openEditPan={openEditPan}
        />
      </div>
    </div>
  );
}

export default EditPopUp;
