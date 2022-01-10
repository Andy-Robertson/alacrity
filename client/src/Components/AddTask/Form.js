import React, { useState } from "react";
// import AddSubTask from "./AddSubTask";
import Toggle from "./Toggle";

function AddTask() {
  // data Variables
  const [data, setData] = useState([]);
  // useState Variables Input
  const [taskSubject, setTaskSubject] = useState("");
  const [describe, setDescribe] = useState("");
  const [reward, setReward] = useState("");
  const [resources, setResources] = useState("")
  // const [subTasksDisplay, setSubTasksDisplay] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [subTasks, setSubTasks] = useState([]);

  // Checkbox => Add Sub Task Handler
  // const addSubTaskHandler = (e) => {
  //   if (e.target.checked == true) {
  //     setSubTasksDisplay(true);
  //     // console.log("True");
  //   } else {
  //     // console.log("false");
  //     setSubTasksDisplay(false);
  //   }
  // };

  // Change handler function
  const changeHandler = (e) => {
    if (e.target.name === "taskSubject") {
      setTaskSubject(e.target.value);
    } else if (e.target.name === "describe") {
      setDescribe(e.target.value);
    }else if (e.target.name === "reward"){
     setReward(e.target.value);
    }else if (e.target.name === "resources"){
     setResources(e.target.value);
    }
  };

  // Form function
  const submitForm = (e) => {
    e.preventDefault();
    let object = {
      task_subject: e.target["taskSubject"].value,
      subject_description: e.target["describe"].value,
      sub_task_option: toggled,
      reward: e.target["reward"].value,
      resources: e.target["resources"].value,
    };
    setData([...data, object]); // Append Object Using Spread Operator
    // After submitting, clear all inputs
    setTaskSubject("");
    setDescribe("");
    setReward("");
    setResources("");
  };
  // console.log(data);
  return (
    <div>
      <form className="form" onSubmit={submitForm}>
        <div>
          {/* <label>Task Subject</label> */}
          <input
            type="text"
            name="taskSubject"
            placeholder="Task Subject ..."
            value={taskSubject}
            onChange={changeHandler}
          />
        </div>
        <div>
          {/* <label>Describe</label> */}
          <input
            type="text"
            name="describe"
            placeholder="Describe it ..."
            value={describe}
            onChange={changeHandler}
          />
        </div>
        <h4>Sub Tasks</h4>
        <Toggle handleCheck={(evt) => setToggled(evt.target.checked)} />
        {/* <p> the button is {toggled ? "on" : "off"}</p> */}
        {toggled && (
          <div>
            <input type="text" name="sub-task" placeholder="Sub Task" />
          </div>
        )}
        <div>
          {/* <label>Reward</label> */}
          <input
            type="text"
            name="reward"
            placeholder="Reward yourself ..."
            value={reward}
            onChange={changeHandler}
          />
        </div>
        <div>
          {/* <label>Resources</label> */}
          <input
            type="text"
            name="resources"
            placeholder="Resources help you ..."
            value={resources}
            onChange={changeHandler}
          />
        </div>
        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
}

export default AddTask;
