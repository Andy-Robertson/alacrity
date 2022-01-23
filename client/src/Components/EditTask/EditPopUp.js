import React from "react";
import EditForm from "./EditForm";
function EditPopUp({ task, openEditPan, submitComplete }) {
  return (
    <div className="popup-box">
      <div className="box">
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
