import React from 'react';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="contact-card">
      <div className="contact-info">
        <h3>{contact.nombre} {contact.apellido}</h3>
        <p className="contact-phone">📞 {contact.telefono}</p>
      </div>
      <div className="contact-actions">
        <button 
          onClick={() => onEdit(contact)} 
          className="btn-edit"
          title="Editar contacto"
        >
          ✏️ Editar
        </button>
        <button 
          onClick={() => onDelete(contact.id)} 
          className="btn-delete"
          title="Eliminar contacto"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default ContactCard;