import React, { useState } from "react";
import AddSubTask from "./AddSubTask";
// import AddSubTask from "./AddSubTask";
import Toggle from "./Toggle";

function AddTask() {
  // data Variables that will be used to store whole data.
  const [data, setData] = useState([]);
  // useState Variables Input
  const [taskSubject, setTaskSubject] = useState("");
  const [describe, setDescribe] = useState("");
  const [reward, setReward] = useState("");
  const [resources, setResources] = useState("");
  const [subTask, setSubTask] = useState(""); // The default of first subTask
  const [subTasks, setSubTasks] = useState([]); // subTasks array
  // Check box to have subTask option if the user wants. 
  const [toggled, setToggled] = useState(false);
  // addInputList will help us to create subTasks as much as user wants
  const [addInputList, setAddInputList] = useState([]);

  // Change handler function
  const changeHandler = (e, index) => {
   // each subTask will have a unique index so we can distinguesh between them 
   // console.log(e.target.name, index);
    if (e.target.name === "taskSubject") {
      setTaskSubject(e.target.value);
    } else if (e.target.name === "describe") {
      setDescribe(e.target.value);
    } else if (e.target.name === "reward") {
      setReward(e.target.value);
    } else if (e.target.name === "resources") {
      setResources(e.target.value);
    } else if (e.target.name === "sub-task") {
      setSubTask(e.target.value);
      setSubTasks([...subTasks, e.target.value]);
    } else if (index !== undefined) {
      setSubTasks([...subTasks, e.target.value]); // subTask will concat to the subTasks array
      // console.log(e.target.value);
    }

  };
  // Form function
  const submitForm = (e) => {
    e.preventDefault();
    let object = {
      task_subject: e.target["taskSubject"].value,
      subject_description: e.target["describe"].value,
      sub_task_option: toggled,
      sub_tasks: subTasks,
      reward: e.target["reward"].value,
      resources: e.target["resources"].value,
    };
    setData([...data, object]); // Append Object Using Spread Operator
    // After submitting, clear all inputs
    setTaskSubject("");
    setDescribe("");
    setReward("");
    setResources("");
    setSubTask("");
  };
  console.log(data);
  const handleAddInput = (e , subTask) => {
    e.preventDefault(); // To prevent submit from the subTask button
    setAddInputList(addInputList.concat(subTask)); // When ever we click on the button we create a new undefined element that will help us to create a new input field depending on the number of elements (The number of click)
    // console.log(subTask);
  };
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
            {/* <AddSubTask value={subTasks} changeHandler={changeHandler} /> */}
            <div>
              <input
                type="text"
                name="sub-task"
                placeholder="Sub Task"
                value={subTask}
                onChange={changeHandler}
              />
            </div>
            {addInputList.map((sub, index) => (
              <AddSubTask
                index={index}
                changeHandler={changeHandler}
                submitForm={submitForm}
              />
            ))}
            <div>
              <button onClick={handleAddInput}>Add Sub Task</button>
            </div>
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
