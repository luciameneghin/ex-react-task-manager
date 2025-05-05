//elenco task
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"
import { useState, useMemo } from "react"

const TaskList = () => {
  const { tasks } = useGlobalContext()

  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(-sortOrder)
    } else {
      setSortBy(column)
      setSortOrder(1)
    }
  }

  const sortedTasks = useMemo(() => {
    const statusOrder = {
      'To do': 0,
      'Doing': 1,
      'Done': 2,
    }
    return [...tasks].sort((a, b) => {
      if (sortBy === "status") {
        return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder
      } else if (sortBy === "createdAt") {
        return (new Date(a.createdAt) - new Date(b.createdAt)) * sortOrder
      } else {
        return a.title.localeCompare(b.title) * sortOrder
      }
    })
  }, [tasks, sortBy, sortOrder])

  return (
    <div>
      <h2>Lista dei Task</h2>

      {tasks.length === 0 ? (
        <p>Nessun task disponibile.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }} onClick={() => handleSort('title')}>Titolo</th>
              <th style={{ border: "1px solid black", padding: "8px" }} onClick={() => handleSort('status')}>Stato</th>
              <th style={{ border: "1px solid black", padding: "8px" }} onClick={() => handleSort('createdAt')}>Creato il</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TaskList
