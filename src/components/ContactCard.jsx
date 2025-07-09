import "../index.css";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const ContactCard = ({
  contactName,
  contactAddress,
  contactPhone,
  contactEmail,
  contactId
}) => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const handleEdit = () => {
    navigate("/add-contact", {
      state: {
        contactId,
        contactName,
        contactAddress,
        contactPhone,
        contactEmail
      }
    });
  };

  const srcs = ["https://pictures.alignable.com/eyJidWNrZXQiOiJhbGlnbmFibGV3ZWItcHJvZHVjdGlvbiIsImtleSI6InVzZXJzL3BpY3R1cmVzL29yaWdpbmFsLzIwNzY1NDIvMTU0MDg5MDI3NV82NDExYjQ1MWNmMjQ3MTQwMDVkMWYxNGQ1NGNhZjI2Yi5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjE4MiwiaGVpZ2h0IjoxODJ9fX0=",
    "https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBlPlpTtK_z4wQ4W74DmV5pxpZYatxBAmzrg&s",
    "https://www.realsimple.com/thmb/Jocfe0aOW6_d7qMtARgrAiT02KA=/350x350/filters:no_upscale():max_bytes(150000):strip_icc()/leslie-corona-headshot-2-58e493325b3e4b898062a97a982ae3c9.jpg",
    "https://i0.wp.com/nik.art/wp-content/uploads/2024/06/4-things-happy-people-dont-do-cover.png?resize=750%2C410&ssl=1"
  ]

  const deleteContact = () => {
    const base = "https://playground.4geeks.com/contact/agendas/tgp034/contacts";
    const url = `${base}/${contactId}`;

    fetch(url, { method: "DELETE" })
      .then(resp => {
        if (!resp.ok) throw new Error(`Status ${resp.status}`);
        dispatch({ type: "DELETE_CONTACT", payload: contactId });
      })
      .catch(err => {
        console.error("Error deleting contact:", err);
      });
  };

  return (
    <div
      className="p-3 container-fluid d-flex justify-content-between align-items-center
                 border-secondary-emphasis border-bottom"
      style={{ maxHeight: "200px" }}
    >
      <div
        className="ratio ratio-1x1 rounded-circle overflow-hidden"
        style={{ maxWidth: "130px" }}
      >
        <img
          src={srcs[Math.floor(Math.random() * srcs.length)]}
          alt={contactName}
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="w-50 h-100 ps-4 d-flex flex-column justify-content-evenly align-items-start">
        <h5 className="fw-normal text-black fs-5">{contactName}</h5>
        <div className="d-flex align-items-center text-body-secondary">
          <i className="fa-solid fa-location-dot"></i>
          <p className="ms-2 mb-0">{contactAddress}</p>
        </div>
        <div className="d-flex align-items-center text-body-secondary">
          <i className="fa-solid fa-phone"></i>
          <p className="ms-2 mb-0">{contactPhone}</p>
        </div>
        <div className="d-flex align-items-center text-body-secondary">
          <i className="fa-solid fa-envelope"></i>
          <p className="ms-2 mb-0">{contactEmail}</p>
        </div>
      </div>

      <div className="w-25 h-100 d-flex align-items-top justify-content-evenly">
        <button className="btn h-25" onClick={handleEdit}>
          <i className="fa-solid fa-pencil"></i>
        </button>
        <button className="btn h-25" onClick={deleteContact}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
