import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, [auth]);

  return (
    <div className="container fade-in">
      <TaskForm setTasks={setTasks} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            <p>{task.status}</p>
            {/* Add buttons for updating and deleting tasks */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
