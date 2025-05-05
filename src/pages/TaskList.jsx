//elenco task
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"
import { useState, useMemo, useCallback } from "react"

const TaskList = () => {
  const { tasks } = useGlobalContext()

  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [timeoutId, setTimeoutId] = useState(null)

  const debounce = useCallback((func, delay) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const id = setTimeout(() => {
      func()
    }, delay)
    setTimeoutId(id)
  }, [timeoutId]);

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

    const filteredTasks = tasks.filter(task => {
      return task.title.toLowerCase().includes(searchQuery.toLowerCase())
    })

    return [...filteredTasks].sort((a, b) => {
      if (sortBy === "status") {
        return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder
      } else if (sortBy === "createdAt") {
        return (new Date(a.createdAt) - new Date(b.createdAt)) * sortOrder
      } else {
        return a.title.localeCompare(b.title) * sortOrder
      }
    })
  }, [tasks, sortBy, sortOrder, searchQuery])


  return (
    <div>
      <h2>Lista dei Task</h2>
      <div className="d-flex justify-content-around my-4">
        <input
          type="text"
          placeholder="Cerca la task in base al suo nome..."
          onChange={(e) => debounce(() => setSearchQuery(e.target.value), 500)}
          className="form-control w-75"
        />
      </div>
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
