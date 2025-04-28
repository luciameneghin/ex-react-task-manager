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


  async function addTask(task) {
    try {
      const response = await fetch(`${APIendpoint}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Errore nella richiesta API');
      }

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) => [...prevTasks, data.task]);
        console.log('Task aggiunto:', data.task);
      } else {
        throw new Error(data.message || 'Qualcosa è andato storto...');
      }
    } catch (error) {
      console.error('Errore nell\'aggiunta del task:', error.message);
      throw error;
    }
  }


  async function removeTask(id) {
    try {
      const response = await fetch(`${APIendpoint}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Errore nella richiesta API');
      }

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        console.log('Task rimosso:', id);
      } else {
        throw new Error(data.message || 'Qualcosa è andato storto...');
      }
    } catch (error) {
      console.error('Errore nella rimozione del task:', error.message);
      throw error;
    }
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