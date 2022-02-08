import React from "react";
import EditForm from "./EditForm";

function EditPopUp({ task, openEditPan, submitComplete }) {
  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="popup-box animate__animated animate__fadeIn">
      <div
        className="box animate__animated animate__fadeInUpBig"
        onClick={(e) => handlePropagation(e)}
      >
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
