import { useNavigate } from 'react-router-dom';
import ContactCard from "../components/ContactCard.jsx";
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';

const Contacts = () => {

    const { store } = useGlobalReducer();
    const contacts = store.contacts;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/add-contact');
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-end p-5">
            <button className="btn btn-success mb-3" onClick={handleClick}>Add new contact</button>
            <div className="container-fluid contacts border border-secondary-emphasis border-bottom-0 rounded-1">
                <div className="row ">
                    {contacts.map((contact, index) => (
                        <ContactCard key={index} contactName={contact.name} contactPhone={contact.phone} contactAddress={contact.address} contactEmail={contact.email} contactId={contact.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contacts;