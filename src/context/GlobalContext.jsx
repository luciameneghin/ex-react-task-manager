import { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {

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

  const value = {
    tasks,
    setTasks,
    fetchTasks
  }
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };
