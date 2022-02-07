import React, { useState } from "react";
import Toggle from "../AddTask/Toggle";
import AddSubTask from "../AddTask/AddSubTask";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

function EditForm({ task, submitComplete, openEditPan }) {
  // useState Variables Input
  const [taskSubject, setTaskSubject] = useState(task.task_subject);
  const [describe, setDescribe] = useState(task.subject_description);
  const [reward, setReward] = useState(task.reward);
  const [resources, setResources] = useState("");
  const [resourcesList, setResourcesList] = useState(task.resources);
  const [subTask, setSubTask] = useState(
    task.sub_task_option ? task.sub_tasks[0].name : ""
  ); // The default of first subTask
  // Check box to have subTask option if the user wants.
  const [toggled, setToggled] = useState(task.sub_task_option);
  // addInputList will help us to create subTasks as much as user wants
  const [addInputList, setAddInputList] = useState(
    task.sub_task_option ? task.sub_tasks.slice(1).map((sub) => sub.name) : []
  );

  // Date Time Picker Library
  const d = new Date(task.by_date);
  let formattedDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  const [valueDate, onChangeDate] = useState(new Date(formattedDate));
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

  // const resourcesFromDb = task.resources;
  // Resource Function
  const handleKeyUp = (evt) => {
    // evt.preventDefault();
    if (evt.key === "," && evt.target.value) {
      if (!resourcesList.includes(evt.target.value)) {
        setResourcesList(resourcesList.concat(evt.target.value));
      }
      setResources("");
    }
    // console.log(resourcesList);
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
    setAddInputList([...addInputList, ""]);
  };
  const [subTaskDataBase, setSubTaskDataBase] = useState(task.sub_tasks);
  const [deleteItems, setDeletItems] = useState([]);
  const deleteHandlerFromList = (e, index) => {
    // function to delete the element of subtask from the array
    e.preventDefault();
    const list = [...addInputList];
    list.splice(index, 1);
    setAddInputList(list);
    let subTaskOnDelete = [];
    if (subTaskDataBase[index + 1]){
      subTaskOnDelete = subTaskDataBase.filter(
        (ele) => ele.id !== subTaskDataBase[index + 1].id
      );
    }else{
      return;
    }
    setSubTaskDataBase(subTaskOnDelete);

    const deleteItemsFiltered = subTaskDataBase.filter(
      (ele) => ele.id === subTaskDataBase[index + 1].id
    );
      setDeletItems([...deleteItems, deleteItemsFiltered[0]]);
  };
  // Form function
  const submitForm = (e) => {
    e.preventDefault();
    const subTaskList = [...addInputList].filter(
      (task) => task.length >= 1 && task.trim().length >= 1
    );
    if (taskSubject.length === 0) {
      alert("Task Subject has to be filled");
    } else if (toggled && subTask.length === 0) {
      alert("SubTask has to be filled");
    } else {
      const subTaskArrayChecked = [];
      if (toggled === true) {
        const subTaskArray = [subTask].concat(subTaskList);
        subTaskArray.forEach((task, index) => {
          subTaskArrayChecked.push({
            id: subTaskDataBase[index] ? subTaskDataBase[index].id : null,
            name: task,
            index: index,
            completed: subTaskDataBase[index]
              ? subTaskDataBase[index].completed
              : false,
          });
        });
        // console.log(subTaskArray);
      }
      fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify({
          task_id: task.id,
          task_subject: taskSubject,
          subject_description: describe,
          sub_task_option: toggled,
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
        submitComplete();
        openEditPan(false);
      });
      const deleteItemsArray = [];
      // console.log(deleteItems);
      deleteItems.forEach((deleteItem) => {
        // console.log(deleteItem);
        if (deleteItem["id"]){
          deleteItemsArray.push(deleteItem["id"]);
        } else{
          return;
        }
      });
      // console.log(deleteItemsArray);
      fetch("/api/tasks", {
        method: "DELETE",
        body: JSON.stringify({
          id: deleteItemsArray,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
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
        <Toggle
          handleCheck={(evt) => setToggled(evt.target.checked)}
          checked={toggled}
        />
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
                key={index}
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
            // minTime={new Date()}
          />
        </div>
        <div className="buttons">
          <button className="btn cancel" onClick={() => openEditPan(false)}>
            <span>Cancel</span>
          </button>
          <button className="btn" type="submit">
            <span>Edit</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
