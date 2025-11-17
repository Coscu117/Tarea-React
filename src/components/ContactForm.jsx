import React, { useState, useEffect } from 'react'
import '../styles/ContactForm.css'

const ContactForm = ({ onSubmit, editingContact, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact)
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: ''
      })
    }
  }, [editingContact])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim() && formData.phone.trim()) {
      onSubmit(formData)
      if (!editingContact) {
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: ''
        })
      }
    }
  }

  return (
    <div className="contact-form-container">
      <h2>{editingContact ? 'Editar Contacto' : 'Agregar Nuevo Contacto'}</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nombre *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Ej: +34 612 345 678"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: juan@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ej: Calle Principal 123, Madrid"
            rows="3"
          />
        </div>

        <div className="form-actions">
          {editingContact && (
            <button type="button" onClick={onCancel} className="btn btn-cancel">
              Cancelar
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editingContact ? 'Actualizar' : 'Agregar'} Contacto
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm