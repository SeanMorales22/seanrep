import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TaskItem from './TaskItem';

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    status: '',
    timeSpent: '',
  });
  const [counter, setCounter] = useState(0);

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleCreateTask = () => {
    const createdTask = { ...newTask, id: counter + 1 };
    setTasks((prevTasks) => [...prevTasks, createdTask]);
    setNewTask({ title: '', status: '', timeSpent: '' });
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <p className="tasktitle">My Tasks</p>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th className="column-1" scope="col">#</th>
            <th className="column-width" scope="col">Title</th>
            <th className="column-show" scope="col">Status</th>
            <th className="column-show" scope="col">Time Spent</th>
            <th className="column-show" scope="col">Username</th>
            <th className="column-show" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCreateTask}>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default Homepage;
