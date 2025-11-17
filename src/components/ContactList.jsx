import React from 'react';
import ContactCard from './ContactCard.jsx';
import '../styles/ContactList.css';

const ContactList = ({ contacts, onEdit, onDelete }) => {
  if (contacts.length === 0) {
    return (
      <div className="contact-list-container">
        <h2>Mis Contactos</h2>
        <div className="empty-state">
          <p>📭 No hay contactos aún</p>
          <p>Agrega tu primer contacto usando el formulario</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-list-container">
      <h2>Mis Contactos ({contacts.length})</h2>
      <div className="contact-list">
        {contacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;