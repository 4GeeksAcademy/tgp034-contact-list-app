import { useNavigate } from 'react-router-dom';
import ContactCard from "../components/ContactCard.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";

const Contact = () => {

    const { store, dispatch } = useGlobalReducer()
    const [contacts, setContacts] = useState([]);
    const baseUrl = "https://playground.4geeks.com/contact/";
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/add-contact');
    }
    async function ensureAgendaExists() {
        const urlAgenda = baseUrl + "agendas/tgp034";
        fetch(urlAgenda, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(resp => {
                console.log(resp.status); // Status code 201, 300, 400, etc.
                if (resp.status == 404) {
                    fetch(urlAgenda, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" }
                    })
                    console.log("Usuario creado correctamente");
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

    async function getContacts() {
        const urlAgenda = baseUrl + "agendas/tgp034";
        fetch(urlAgenda, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok); // Will be true if the response is successful
                console.log(resp.status); // Status code 201, 300, 400, etc.
                return resp.json(); // Will attempt to parse the result to JSON and return a promise where you can use .then to continue the logic
            })
            .then(data => {
                // This is where your code should start after the fetch is complete
                const contacts = data.contacts.map(({ name, phone, email, address, id }) => ({ name, phone, email, address, id }));
                console.log(contacts);
                setContacts(contacts);
                console.log(data); // This will print the exact object received from the server to the console
            })
            .catch(error => {
                // Error handling
                console.log(error);
            });
    }

    useEffect(() => { ensureAgendaExists(); getContacts() }, []);

    return (
        <div className="container-fluid d-flex flex-column align-items-end p-5">
            <button className="btn btn-success mb-3" onClick={handleClick}>Add new contact</button>
            <div className="container-fluid contacts border border-secondary-emphasis border-bottom-0 rounded-1">
                <div className="row ">
                    {contacts.map((contact, index) => (
                        console.log(contact),
                        <ContactCard key={index} contactName={contact.name} contactPhone={contact.phone} contactAddress={contact.address} contactEmail={contact.email} contactId={contact.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;