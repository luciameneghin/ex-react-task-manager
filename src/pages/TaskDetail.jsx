import { useParams, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

const TaskDetail = () => {
  const { tasks, removeTask, updateTask } = useGlobalContext()
  const { id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)

  useEffect(() => {
    const foundTask = tasks.find((task) => task.id === parseInt(id));
    if (foundTask) {
      setTask(foundTask);
    }
  }, [tasks, id]);

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      setShowModal(false);
      navigate('/');
    } catch (error) {
      alert("Errore nell'eliminazione della task: " + error.message);
    }
  }

  const handleEdit = async (taskToUpdate) => {
    try {
      await updateTask(taskToUpdate)
      alert("Task aggiornata con successo")
      setTask(taskToUpdate)
      setShowModalEdit(false)
    } catch (error) {
      alert("Errore nell'aggiornamento della task: " + error.message)
    }
  }

  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <div className="my-3">
      <h3>Dettagli della task</h3>
      <p><strong>Nome:</strong> {task.title}</p>
      <p><strong>Descrizione:</strong> {task.description}</p>
      <p><strong>Stato:</strong> {task.status}</p>
      <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

      <button onClick={() => setShowModalEdit(true)} className='btn btn-primary'>
        Modifica
      </button>
      <EditTaskModal
        show={showModalEdit}
        task={task}
        onClose={() => setShowModalEdit(false)}
        onSave={handleEdit}
      />
      <button onClick={() => setShowModal(true)} className="btn btn-danger">
        Elimina Task
      </button>

      <Modal
        title="Conferma Eliminazione"
        content="Sei sicuro di voler eliminare questo task?"
        show={showModal}
        onClose={handleClose}
        onConfirm={handleDelete}
        confirmText="Conferma"
      />
    </div >
  )
}

export default TaskDetail
