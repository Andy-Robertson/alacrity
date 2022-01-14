import React, { useState } from "react";
import AddSubTask from "./AddSubTask";
import Toggle from "./Toggle";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import * as dayjs from "dayjs";

function AddTask() {
  // data Variables that will be used to store whole data.
  // const [data, setData] = useState([]);
  // useState Variables Input
  const [taskSubject, setTaskSubject] = useState("");
  const [describe, setDescribe] = useState("");
  const [reward, setReward] = useState("");
  const [resources, setResources] = useState("");
  const [subTask, setSubTask] = useState(""); // The default of first subTask

  // Check box to have subTask option if the user wants.
  const [toggled, setToggled] = useState(false);
  // addInputList will help us to create subTasks as much as user wants
  const [addInputList, setAddInputList] = useState([]);
  // Date Time Picker Library
  const [valueDate, onChangeDate] = useState(new Date());
  const [valueTime, onChangeTime] = useState(new Date());
  // console.log(dayjs(valueTime).format("HH:mm"));
  // console.log(dayjs(valueDate).format("YYYY-MM-DD"));
  // Change handler function
  const changeHandler = (e) => {
    // each subTask will have a unique index so we can distinguesh between them
    // console.log(e.target.name);
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
    // else if ((e.target.name === "subTaskArray")) {

    // }
  };
  // addSubTasks();
  // const addSubTasks = () => {
  //   setSubTasks([...subTasks, subTask]);
  // };
  // addSubTasks();
  // Form function
  const submitForm = (e) => {
    e.preventDefault();
    // setSubTasks([...subTasks, e.target["sub-task"].value]);
    // let object = {
    //   task_subject: e.target["taskSubject"].value,
    //   subject_description: e.target["describe"].value,
    //   sub_task_option: toggled,
    //   sub_tasks: toggled
    //     ? [e.target["sub-task"].value].concat(
    //         addInputList.map((i, index) => {
    //           return e.target[`sub-task${index}`].value;
    //         })
    //       )
    //     : null,
    //   reward: e.target["reward"].value,
    //   resources: e.target["resources"].value,
    //   by_time: dayjs(valueTime).format("HH:mm"),
    //   by_day: dayjs(valueDate).format("YYYY-MM-DD"),
    // };
    if (taskSubject.length === 0) {
      alert("Task Subject has to be filled");
    } else if (toggled && subTask.length === 0) {
      alert("SubTask has to be filled");
    } else {
      fetch("http://localhost:5000/", {
        method: "POST",
        body: JSON.stringify({
          task_subject: e.target["taskSubject"].value,
          subject_description: e.target["describe"].value,
          sub_task_option: toggled,
          sub_tasks: toggled
            ? [e.target["sub-task"].value].concat(
                addInputList.map((i, index) => {
                  return e.target[`sub-task${index}`].value;
                })
              )
            : null,
          reward: e.target["reward"].value,
          resources: e.target["resources"].value,
          by_time: dayjs(valueTime).format("HH:mm"),
          by_day: dayjs(valueDate).format("YYYY-MM-DD"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload(false);
    }
    // setData([...data, object]); // Append Object Using Spread Operator
    // After submitting, clear all inputs
    setTaskSubject("");
    setDescribe("");
    setReward("");
    setResources("");
    setSubTask("");
  };
  // console.log(data);
  const handleAddInput = (e, subTask) => {
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
            <div className="plus-container">
              <button
                onClick={handleAddInput}
                class="btn-plus"
              >
                <i
                  class="fa fa-plus"
                ></i>
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
          />
        </div>
        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
}

export default AddTask;
