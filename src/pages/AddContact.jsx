import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import React, { useRef } from 'react';

const AddContact = () => {

    const location = useLocation();
    const { store, dispatch } = useGlobalReducer()
    const [name, setName] = useState(location.state == null ? '' : location.state.contactName || '');
    const [email, setEmail] = useState(location.state == null ? '' : location.state.contactEmail || '');
    const [phone, setPhone] = useState(location.state == null ? '' : location.state.contactPhone || '');
    const [address, setAddress] = useState(location.state == null ? '' : location.state.contactAddress || '');
    const id = location.state == null ? '' : location.state.contactId || '';
    console.log(id);
    const navigate = useNavigate();
    const formRef = useRef(null);
    const handleClick = () => {
        navigate('/');
    }
    const baseUrl = "https://playground.4geeks.com/contact/";

    const handleSave = () => {
        const form = formRef.current;
        // .checkValidity() comprueba HTML5 (required, type, pattern...)
        if (!form.checkValidity()) {
            // Muestra mensajes nativos de error
            form.reportValidity();
            return;
        }
        // Si es válido, llamamos a addContact con los datos
        if (id) {
            updateContact();
        } else {
            addContact();
        }
    };

    async function updateContact() {
        const urlPutTask = baseUrl + "agendas/tgp034/contacts/" + id;
        const payload = {
            name: (document.getElementById("name").value || "Mike Anamendolla"),
            phone: (document.getElementById("phone").value || "(870) 288-4149"),
            email: (document.getElementById("email").value || "5842 Hillcrest Rd"),
            address: (document.getElementById("address").value || "mike.ana@example.com")
        }
        
        fetch(urlPutTask, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        })
            .then(resp => {
                console.log(resp.status); // Status code 201, 300, 400, etc.
                if (resp.ok) {
                    console.log("Contact edited");
                    navigate('/'); // Redirect to the contacts page
                }
                return resp.json(); // Will attempt to parse the result to JSON and return a promise where you can use .then to continue the logic
            })
            .then(data => {
                // This is where your code should start after the fetch is complete
                console.log(data); // This will print the exact object received from the server to the console
            })
            .catch(error => {
                // Error handling
                console.log(error);
            });
    }


    async function addContact() {
        const urlPostTask = baseUrl + "agendas/tgp034/contacts";
        const payload = {
            name: (document.getElementById("name").value || "Mike Anamendolla"),
            phone: (document.getElementById("phone").value || "(870) 288-4149"),
            email: (document.getElementById("email").value || "5842 Hillcrest Rd"),
            address: (document.getElementById("address").value || "mike.ana@example.com")
        }
        fetch(urlPostTask, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        })
            .then(resp => {
                console.log(resp.status); // Status code 201, 300, 400, etc.
                if (resp.ok) {
                    console.log("Contact added");
                    navigate('/'); // Redirect to the contacts page
                }
                return resp.json(); // Will attempt to parse the result to JSON and return a promise where you can use .then to continue the logic
            })
            .then(data => {
                // This is where your code should start after the fetch is complete
                console.log(data); // This will print the exact object received from the server to the console
            })
            .catch(error => {
                // Error handling
                console.log(error);
            });
    }

    return (
        <div className="text-center mt-5">
            <h1>Add a new contact</h1>
            <form ref={formRef} className="p-5 text-start" noValidate>
                <div className="form-group py-2">
                    <label htmlFor="name">Full name</label>
                    <input type="text" value={name} onChange={e=> setName(e.target.value)} className="form-control mt-2" id="name" placeholder="Full name" required />
                </div>
                <div className="form-group py-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={e=> setEmail(e.target.value)} className="form-control mt-2" id="email" placeholder="Enter email" required />
                </div>
                <div className="form-group py-2">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" value={phone} onChange={e=> setPhone(e.target.value)} pattern="^\+?\d{7,15}$" className="form-control mt-2" id="phone" placeholder="Enter phone" required />
                </div>
                <div className="form-group py-2">
                    <label htmlFor="address">Address</label>
                    <input type="text" value={address} onChange={e=> setAddress(e.target.value)} className="form-control mt-2" id="address" placeholder="Enter address" required />
                </div>
                <div className="form-group py-2 d-flex flex-column align-items-start">
                    <button type="button" onClick={handleSave} className="btn btn-primary mt-3 w-100">Save</button>
                    <Link onClick={handleClick}>or get back to contacts</Link>
                </div>
            </form>
        </div>
    );
};

export default AddContact;