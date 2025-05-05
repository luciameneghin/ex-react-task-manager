import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Modal from './Modal'

const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [editedTask, setEditedTask] = useState(task)
  const editFormRef = useRef()

  useEffect(() => {
    setEditedTask(task)
  }, [task])


  const handleSubmit = (e) => {
    e.preventDefault(e)
    const updateTask = {
      ...editedTask,
      title: editFormRef.current.title.value,
      description: editFormRef.current.description.value,
      status: editFormRef.current.status.value,
    }
    onSave(updateTask)
    onClose()
  }


  const formContent = (
    <form onSubmit={handleSubmit} ref={editFormRef}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Titolo
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descrizione
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Stato
        </label>
        <select
          className="form-select"
          id="status"
          name="status"
          value={editedTask.status}
          onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
        >
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </form>
  )

  return (
    <div>
      <Modal
        title="Modifica Task"
        show={show}
        onClose={onClose}
        confirmText="Salva"
        content={formContent}
        onConfirm={() => editFormRef.current.requestSubmit()}
      />
    </div>
  )
}

export default EditTaskModal
