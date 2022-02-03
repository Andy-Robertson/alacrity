import React, { useState } from "react";
import AddSubTask from "./AddSubTask";
import Toggle from "./Toggle";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

function AddTask(props) {
  // useState Variables Input
  const [taskSubject, setTaskSubject] = useState("");
  const [describe, setDescribe] = useState("");
  const [reward, setReward] = useState("");
  const [resources, setResources] = useState("");
  const [subTask, setSubTask] = useState(""); // The default of first subTask
  const [resourcesList, setResourcesList] = useState([]);

  // Check box to have subTask option if the user wants.
  const [toggled, setToggled] = useState(false);
  // addInputList will help us to create subTasks as much as user wants
  const [addInputList, setAddInputList] = useState([]);
  const [id, setId] = useState([]);
  // Date Time Picker Library
  const [valueDate, onChangeDate] = useState(new Date());
  const [valueTime, onChangeTime] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
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

  const handleKeyUp = (evt) => {
    evt.preventDefault();
    if (evt.key === "," && evt.target.value) {
      if (!resourcesList.includes(evt.target.value)) {
        // const allVals = evt.target.value.split(",").map((v) => v.trim()).filter(Boolean);
        // console.log("allVals",allVals);
        setResourcesList(resourcesList.concat(evt.target.value));
      }
      setResources("");
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

    const subTaskList = [...addInputList].filter(
      (task) => task.trim().length >= 1
    );

    if (taskSubject.length === 0) {
      alert("Task Subject has to be filled");
    } else if (toggled && subTask.length === 0) {
      alert("SubTask has to be filled");
    } else {
      const subTaskArrayChecked = [];
      if (toggled === true) {
        const subTaskArray = [subTask].concat(subTaskList);
        subTaskArray.forEach((task) => {
          subTaskArrayChecked.push({
            name: task,
            // index: index,
            completed: false,
          });
        });
        // console.log(subTaskArrayChecked);
      }
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          task_subject: taskSubject,
          subject_description: describe,
          sub_task_option: toggled,
          // sub_tasks: toggled ? [subTask].concat(subTaskList) : null,
          reward: reward,
          resources: resourcesList,
          by_time: valueTime,
          by_date: valueDate,
          sub_tasks: toggled ? subTaskArrayChecked : null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        props.submitComplete();
        props.closeOnSubmit(false);
      });
    }
  };
  return (
    <div>
      <form className="form" onSubmit={(e) => submitForm(e)}>
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
        <Toggle handleCheck={(evt) => setToggled(evt.target.checked)} checked={toggled}/>
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
            <div>
              {addInputList.map((sub, index) => (
                <AddSubTask
                  value={sub}
                  key={index}
                  index={index}
                  listHandler={listHandler}
                  deleteHandlerFromList={deleteHandlerFromList}
                />
              ))}
            </div>
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
            onKeyUp={handleKeyUp}
            onChange={changeHandler}
          />
          {resourcesList.map((resource, key) => (
            <div key={key} className="pill">
              <span> {resource.replace(/,/g, "")} </span>
            </div>
          ))}
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
            maxTime={"23:59"}
          />
        </div>
        <div className="buttons">
          <button className="btn cancel" onClick={() => props.closeBtn(false)} >
            <span>
              Cancel
            </span>
          </button>
          <button className="btn" type="submit">
            <span>
              Add
            </span>
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddTask;


// {"https://syllabus.codeyourfuture.io/react/week-3/lesson,","https://www.google.com/,","https://reactjs.org/docs/getting-started.html,"}

