import React, { useState } from 'react';

function AddSubTask(props) {
 const [subTask, setSubTask] = useState("");
 const change = (e) => {
  setSubTask(e.target.value);
  props.changeHandler(e, props.index); // send e (event) and index to the changeHandler function which is in the Form component.
 };
 return (
   <div key={props.index} >
     {/* <form onSubmit={submit}> */}
     <input
       type="text"
       name={"sub-task" + props.index}
       placeholder="Sub Task"
       value={subTask}
       onChange={change}
     />
     {/* </form> */}
   </div>
 );
}

export default AddSubTask;
