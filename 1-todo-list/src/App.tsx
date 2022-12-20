import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import "./App.css";

interface Task{
  id:string
  title:string
  completed:boolean
  createdAt:Date
}


function App() {
   const textRef = React.useRef<HTMLInputElement | null>(null);
const [tasks, setTasks] = useState(loadTasks());

  function saveTasks() {
    localStorage.setItem("TASK", JSON.stringify(tasks));
    loadTasks()
  }

  function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASK");
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
  }

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault()
if(textRef.current?.value=== ""){
  return alert("Eksik giriş")
}
const newTask: Task = {
  id: uuidV4(),
  title: (textRef.current as HTMLInputElement).value,
  completed: false,
  createdAt: new Date(),
};
setTasks([...tasks,newTask]);
// tasks.push(newTask);

(textRef.current as HTMLInputElement).value = "";
saveTasks()
};
// function addListItem(task: Task) {
//   const item = document.createElement("li");
//   const label = document.createElement("label");
//   const checkbox = document.createElement("input");
//   checkbox.addEventListener("change", () => {
//     task.completed = checkbox.checked;
//     saveTasks();
//   });
//   checkbox.type = "checkbox";
//   checkbox.checked = task.completed;
//   label.append(checkbox, task.title);
//   item.append(label);
//   list?.append(item);
// }
const ethem = (task: React.ChangeEvent<HTMLInputElement>): void => {
  console.log(task);
  console.log(task.currentTarget.value)
};


const renderNots = (): JSX.Element[] => {
    return tasks?.map((task) => {

      return (
        <li key={task.id}>
          <span>{task.title}</span>

          <input
            type="checkbox"
            onChange={() => {
              task.completed = !task.completed;
              saveTasks();
              setTasks(tasks.map((tas)=>tas));
              
            }}
            checked={task.completed}
          />
        </li>
      );
   
        })
    }  
  
  return (
    <div className="App">
      <form id="new-task-form" onSubmit={(e) => handleSubmit(e)}>
        <input ref={textRef} type="text" id="new-task-title" />
        <button type="submit">Add</button>
      </form>
      <ul className="list" >{renderNots()}</ul>
    </div>
  );
}

export default App;
