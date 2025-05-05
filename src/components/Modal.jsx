import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) => {
  if (!show) return null
  return ReactDOM.createPortal(
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='modal-header'>
          <h2>{title}</h2>
        </div>
        <div className='modal-content'>
          {content}
        </div>
        <div className='modal-actions'>
          <button className='cancel-button' onClick={onClose}>Annulla</button>
          <button className='confirm-button' onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>

    </div>,
    document.body
  )
}

export default Modal
