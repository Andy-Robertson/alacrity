import React, { useState } from "react";
import Toggle from "../AddTask/Toggle";
import AddSubTask from "../AddTask/AddSubTask";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

function EditForm({ task, submitComplete }) {
  // useState Variables Input
  const [taskSubject, setTaskSubject] = useState(task.task_subject);
  const [describe, setDescribe] = useState(task.task_describe);
  const [reward, setReward] = useState(task.reward);
  const [resources, setResources] = useState(task.resources);
  const [subTask, setSubTask] = useState(
    task.sub_task_option ? task.sub_tasks[0] : null
  ); // The default of first subTask
  // Check box to have subTask option if the user wants.
  const [toggled, setToggled] = useState(task.sub_task_option);
  // addInputList will help us to create subTasks as much as user wants
  const [addInputList, setAddInputList] = useState(
    task.sub_task_option ? task.sub_tasks.slice(1) : []
  );
  const [id, setId] = useState([]);

  // Date Time Picker Library
  const [valueDate, onChangeDate] = useState(task.by_date);
  const [valueTime, onChangeTime] = useState(task.by_time);
  // Change handler function
  const changeHandler = (e) => {
    // each subTask will have a unique index so we can distinguesh between them
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
    }
  };
  // Functions for sub task array
  const listHandler = (e, index, subTask) => {
    // function to add the element of subtask to the array
    e.preventDefault();
    const list = [...addInputList];
    list[index] = subTask;
    setAddInputList(list);
  };
  const handleAddInput = (e) => {
    // function to add a field for subtask with initial empty string
    e.preventDefault(); // To prevent submit from the subTask button
    setId([...id, ""]);
    setAddInputList([...addInputList, ""]);
  };
  const deleteHandlerFromList = (e, index) => {
    // function to delete the element of subtask from the array
    e.preventDefault();
    const list = [...addInputList];
    list.splice(index, 1);
    setAddInputList(list);
  };
  // Form function
  const submitForm = (e) => {
    e.preventDefault();
    if (taskSubject.length === 0) {
      alert("Task Subject has to be filled");
    } else if (toggled && subTask.length === 0) {
      alert("SubTask has to be filled");
    } else {
      fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify({
          id: task.id,
          task_subject: taskSubject,
          subject_description: describe,
          sub_task_option: toggled,
          sub_tasks: toggled ? [subTask].concat(addInputList) : null,
          reward: reward,
          resources: resources,
          by_time: valueTime,
          by_date: valueDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        submitComplete();
      });
    }
    // After submitting, clear all inputs
    setTaskSubject("");
    setDescribe("");
    setReward("");
    setResources("");
    setSubTask("");
    setAddInputList([]);
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
                value={sub}
                key={`add_${id[index]}`}
                index={index}
                listHandler={listHandler}
                deleteHandlerFromList={deleteHandlerFromList}
              />
            ))}
            <div className="plus-container">
              <button onClick={handleAddInput} className="btn-plus">
                <i className="fa fa-plus"></i>
              </button>
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
        <div>
          <DatePicker
            onChange={onChangeDate}
            value={valueDate}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
          <TimePicker
            onChange={onChangeTime}
            value={valueTime}
            format="HH:mm"
            minTime={new Date()}
          />
        </div>
        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
}

export default EditForm;
