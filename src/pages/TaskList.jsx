//elenco task
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

const TaskList = () => {
  const { tasks } = useGlobalContext()

  return (
    <div>
      <h2>Lista dei Task</h2>

      {tasks.length === 0 ? (
        <p>Nessun task disponibile.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Titolo</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Stato</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Creato il</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TaskList
