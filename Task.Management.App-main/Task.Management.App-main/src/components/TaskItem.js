import React, { useState, useEffect } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [flag, setFlag] = useState(false);
  const [tracking, setTracking] = useState(task.tracking);
  const [timeSpent, setTimeSpent] = useState(task.timeSpent);
  const [startTime, setStartTime] = useState(task.startTime);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;

    if (tracking && startTime) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const totalElapsedTime = elapsedTime + (currentTime - startTime);
        const formattedTime = formatTime(totalElapsedTime);
        setTimeSpent(formattedTime);
        setElapsedTime(totalElapsedTime);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [tracking, startTime, elapsedTime]);

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const togglesSave = () => {
    if (!flag) {
    setTracking(false);
    setFlag(!flag);
    }
  };

  const toggleUpdate = () => {
    if (flag) {
    setTracking(true);
    setStartTime(Date.now());
    setFlag(!flag);
    }
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
  };

  return (
    <tr>
      <td>#</td>
      <th scope="row">
        {flag ? (
          <span>{title}</span>
        ) : (
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        )}
      </th>
      <td>
        {flag ? (
          <span>{status}</span>
        ) : (
          <input class="inputstatus" type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        )}
      </td>
      <td>
        <span>{timeSpent}</span>
      </td>
      <td>
        <span>UserName</span>
      </td>
      <td>
        <button type="save" onClick={togglesSave}>
          Save
        </button>
        <button type="update" onClick={toggleUpdate}>
          Update
        </button>
        <button type="delete" onClick={handleDeleteTask}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
