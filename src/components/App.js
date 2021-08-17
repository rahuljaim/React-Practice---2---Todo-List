import React, { useState } from "react";
import "./../styles/App.css";
function ListItem(props) {
  const { children, onModify, onDelete } = props;
  const [isedit, setIsedit] = useState(true);
  const [tempTask, setTempTask] = useState(children);

  return isedit ? (
    <>
      <li className="list">{children}</li>
      <button
        className="edit"
        onClick={function () {
          setIsedit(false);
        }}
      >
        Edit Task
      </button>
      <button className="delete" onClick={onDelete}>Delete</button>
    </>
  ) : (
    <>
      <textarea
        className="editTask"
		value={tempTask}
        onChange={function (e) {
          setTempTask(e.target.value);
        }}
      ></textarea>
      <button
        className="saveTask"
        onClick={function () {
          if (tempTask !== '') {
            onModify(tempTask);
          }
        }}
      >
        Save
      </button>
    </>
  );
}

function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);

  function onModify(updatedTask, index) {
    const newList = todoList.map(function (task, i) {
      if (i === index) {
        return updatedTask;
      }
      return task;
    });
    setTodoList(newList);
  }
  function onDelete(index){
	  const newList = todoList.filter(function(task, i){
		return i!==index;
	  });
	  setTodoList(newList);
  }
  return (
    <div id="main">
      <textarea
        id="task"
        value={task}
        onChange={function (event) {
          setTask(event.target.value);
        }}
      ></textarea>
      <button
        id="btn"
        onClick={function () {
          if (todoList !== "" && task!=="") {
            setTodoList([...todoList, task]);
            setTask("");
          }
        }}
      >
        Add Task
      </button>

      <ul>
		  {/* doubt to resolve */}
        {todoList.map((task, i) => {
          return (
            <ListItem i={i} 
			onModify={function(updatedTask){
				onModify(updatedTask, i);
			}} 
			onDelete={function(){
				onDelete(i);
			}} key={task}>
              {task}
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
