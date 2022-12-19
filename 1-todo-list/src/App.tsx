import React from "react";
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

  const tasks:Task[]=loadTasks()

  function saveTasks() {
    localStorage.setItem("TASK", JSON.stringify(tasks));
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
tasks.push(newTask);

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
const ethem = (task:Task[]): void => {};


const renderNots = (): JSX.Element[] => {
    return tasks.map((task) => {
      return (
        <li key={task.id}>
          <span>{task.title}</span>
          <input type="checkbox" onClick={()=>ethem(task)}/>
        </li>
      );
   
        })
    }  
  
  return (
    <div className="App">
      <ul className="list">
        {renderNots()
   }
      </ul>
      <form id="new-task-form" onSubmit={(e) => handleSubmit(e)}>
        <input ref={textRef} type="text" id="new-task-title" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
