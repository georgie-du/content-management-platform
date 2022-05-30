import React from 'react'
import Form from '../Form/Form';
import typewritter from '../../images/typewritter.jpg'

const Modal = ({ open, onClose, currentId, setCurrentId }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <img src={typewritter} alt='/' />
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            x
          </p>
          <div className='content'>
            <Form currentId={currentId} setCurrentId={setCurrentId} onClose={onClose} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal