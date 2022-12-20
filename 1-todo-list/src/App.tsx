import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import "./App.css";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

function App() {
  const textRef = React.useRef<HTMLInputElement | null>(null);
  const asdd = React.useRef<HTMLInputElement | null>(null);
  console.log(asdd.current?.value)
  const [tasks, setTasks] = useState(loadTasks());

  function saveTasks() {
    localStorage.setItem("TASK", JSON.stringify(tasks));
    loadTasks();
  }

  function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASK");
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (textRef.current?.value === "") {
      return alert("Eksik giriş");
    }
    const newTask: Task = {
      id: uuidV4(),
      title: (textRef.current as HTMLInputElement).value,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);

    (textRef.current as HTMLInputElement).value = "";
    saveTasks();
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
              setTasks(tasks.map((tas) => tas));
            }}
            checked={task.completed}
          />
        </li>
      );
    });
  };

  return (
    <div className="App">
      <h1>Todo List Örneği</h1>
      <form id="new-task-form" onSubmit={(e) => handleSubmit(e)}>
        <input ref={textRef} type="text" id="new-task-title" />
        <button type="submit">Add</button>
      </form>
      <ul className="list">{renderNots()}</ul>
      <h1>useRef Hook'unda Örnek</h1>
      <input type="text" ref={asdd} onChange={()=>console.log(asdd.current?.value)} />
      <button >BAS</button>
    </div>
  );
}

export default App;
