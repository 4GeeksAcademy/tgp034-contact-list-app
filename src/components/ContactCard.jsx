import "../index.css";
import { useNavigate } from "react-router-dom";
import Contact from "../pages/Contact";
const ContactCard = ({ contactName, contactAddress, contactPhone, contactEmail, contactId }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/add-contact', { state: { contactName, contactAddress, contactPhone, contactEmail, contactId } });
    }

    const baseUrl = "https://playground.4geeks.com/contact/";

    async function deleteContact() {
        const urlDeleteContact = baseUrl + "agendas/tgp034/contacts/" + contactId;
        fetch(urlDeleteContact, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then(resp => {
                console.log(resp.status); // Status code 201, 300, 400, etc.
                if (resp.ok) {
                    console.log("Contact deleted");
                    navigate(0);
                }
            })
            .catch(error => {
                // Error handling
                console.log(error);
            });
    }

    return <div className="p-3 container-fluid d-flex justify-content-between align-items-center border-secondary-emphasis border-bottom" style={{ maxHeight: "200px" }}>
        <div className="w-25 p-2" style={{ maxWidth: "180px", overflow: "hidden" }}>
            <img className="rounded-circle p-1 w-100" src="https://pictures.alignable.com/eyJidWNrZXQiOiJhbGlnbmFibGV3ZWItcHJvZHVjdGlvbiIsImtleSI6InVzZXJzL3BpY3R1cmVzL29yaWdpbmFsLzIwNzY1NDIvMTU0MDg5MDI3NV82NDExYjQ1MWNmMjQ3MTQwMDVkMWYxNGQ1NGNhZjI2Yi5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjE4MiwiaGVpZ2h0IjoxODJ9fX0=" alt="" />
        </div>
        <div className="w-50 h-100 ps-4 d-flex flex-column justify-content-evenly align-items-start">
            <h5 className="fw-normal text-black fs-5">{contactName}</h5>
            <div className="d-flex align-items-center text-body-secondary">
                <i className="fa-solid fa-location-dot"></i>
                <p className="ms-2 mb-0">{contactAddress}</p>
            </div>
            <div className="d-flex align-items-center text-body-secondary">
                <i className="fa-solid fa-phone "></i>
                <p className="ms-2 mb-0">{contactPhone}</p>
            </div>
            <div className="d-flex align-items-center text-body-secondary">
                <i className="fa-solid fa-envelope "></i>
                <p className="ms-2 mb-0">{contactEmail}</p>
            </div>

        </div>
        <div className="w-25 h-100 d-flex align-items-top justify-content-evenly">
            <button className="btn h-25" onClick={handleClick}><i className="fa-solid fa-pencil"></i></button>
            <button className="btn h-25" onClick={deleteContact}><i className="fa-solid fa-trash-can"></i></button>
        </div>
    </div>;
};

export default ContactCard;