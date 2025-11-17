import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';
import './styles/App.css';

const API_URL = 'http://www.raydelto.org/agenda.php';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 Haciendo fetch a:', API_URL);
      const response = await fetch(API_URL);
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Datos recibidos:', data);
      console.log('📊 Total de contactos:', data.length);
      
      // Asignar IDs únicos si no los tienen
      const contactsWithIds = data.map((contact, index) => ({
        ...contact,
        id: contact.id || index + 1
      }));
      
      setContacts(contactsWithIds);
    } catch (error) {
      console.error('❌ Error completo:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: contact.nombre,
          apellido: contact.apellido,
          telefono: contact.telefono
        }),
      });

      if (response.ok) {
        await fetchContacts();
        setEditingContact(null);
        alert('✅ Contacto guardado exitosamente');
      } else {
        alert('❌ Error al guardar el contacto');
      }
    } catch (error) {
      console.error('Error al guardar contacto:', error);
      alert('❌ Error al guardar el contacto');
    }
  };

  const editContact = (contact) => {
    setEditingContact(contact);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const cancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div className="App">
      <h1>📇 Agenda de Contactos</h1>
      
      {loading && <p>⏳ Cargando contactos...</p>}
      {error && <p style={{color: 'red'}}>❌ Error: {error}</p>}
      
      <ContactForm
        onSubmit={addContact}
        editingContact={editingContact}
        onCancel={cancelEdit}
      />
      
      <ContactList
        contacts={contacts}
        onEdit={editContact}
        onDelete={deleteContact}
      />
    </div>
  );
}

export default App;