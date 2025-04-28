import { useEffect, useState } from 'react'

const useTasks = () => {
  const [tasks, setTasks] = useState([])

  const APIendpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${APIendpoint}/tasks`)
      const data = await response.json()
      setTasks(data)
      console.log('Tasks fetched:', data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])


  function addTask() {
    // da implementare
  }

  function removeTask() {
    // da implementare
  }

  function updateTask() {
    // da implementare
  }

  return {
    tasks,
    setTasks,
    fetchTasks,
    addTask,
    removeTask,
    updateTask,
  };
}

export default useTasks;