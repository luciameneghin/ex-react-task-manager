import React from 'react'

const TaskRow = React.memo(({ task }) => {

  const statusStyle = (status) => {
    switch (status) {
      case 'To do':
        return { backgroundColor: 'red', color: 'white' }
      case 'Doing':
        return { backgroundColor: 'yellow', color: 'black' }
      case 'Done':
        return { backgroundColor: 'green', color: 'white' }
    }
  };

  return (
    <>
      <tr>
        <td style={{ border: "1px solid black", padding: "8px" }}>{task.title}</td>
        <td style={{ ...statusStyle(task.status), border: "1px solid black" }}>
          {task.status}
        </td>
        <td style={{ border: "1px solid black", padding: "8px" }}>
          {new Date(task.createdAt).toLocaleDateString()}
        </td>
      </tr>
    </>
  );
});

export default TaskRow
