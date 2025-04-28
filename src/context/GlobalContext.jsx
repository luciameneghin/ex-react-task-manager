import { createContext, useContext } from 'react'
import useTasks from '../hook/useTasks';

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {

  const { tasks, setTasks, fetchTasks, addTask, removeTask, updateTask } = useTasks();

  const value = {
    tasks,
    setTasks,
    fetchTasks,
    addTask,
    removeTask,
    updateTask
  };

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
