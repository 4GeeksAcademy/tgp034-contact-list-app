
import React, { useState, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';

const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  const {
    contactId: initialId,
    contactName: initialName,
    contactEmail: initialEmail,
    contactPhone: initialPhone,
    contactAddress: initialAddress
  } = location.state || {};

  const [id] = useState(initialId || '');
  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [phone, setPhone] = useState(initialPhone || '');
  const [address, setAddress] = useState(initialAddress || '');

  const baseUrl  = 'https://playground.4geeks.com/contact/agendas/tgp034/contacts';

  const handleSave = () => {
    // Validación HTML5
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    const payload = { name, email, phone, address };

    if (id) {
      fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(resp => {
          if (!resp.ok) throw new Error(`Status ${resp.status}`);
          return resp.json();
        })
        .then(result => {
          dispatch({ type: 'UPDATE_CONTACT', payload: result });
          navigate('/');
        })
        .catch(err => {
          console.error('Error updating contact:', err);
        });

    } else {
      fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(resp => {
          if (!resp.ok) throw new Error(`Status ${resp.status}`);
          return resp.json();
        })
        .then(result => {
          dispatch({ type: 'ADD_CONTACT', payload: result });
          navigate('/');
        })
        .catch(err => {
          console.error('Error adding contact:', err);
        });
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>{id ? 'Edit Contact' : 'Add a New Contact'}</h1>
      <form ref={formRef} className="p-5 text-start" noValidate>
        <div className="form-group py-2">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-control mt-2"
            placeholder="Full name"
            required
          />
        </div>

        <div className="form-group py-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control mt-2"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group py-2">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            pattern="^\+?\d{7,15}$"
            className="form-control mt-2"
            placeholder="Enter phone"
            required
          />
        </div>

        <div className="form-group py-2">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="form-control mt-2"
            placeholder="Enter address"
            required
          />
        </div>

        <div className="form-group py-2 d-flex flex-column align-items-start">
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary mt-3 w-100"
          >
            Save
          </button>
          <Link to="/" className="mt-2">
            or get back to contacts
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
