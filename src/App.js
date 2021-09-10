import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles.css";
import EditForm from "./components/EditForm";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);
  const [editForm, setEditForm] = useState(true);

  const [contactEdit, setContactEdit] = useState([]);
  console.log("Inside contactEdit: ", contactEdit);

  // [TODO] Write a useEffect to fetch contacts here...
  useEffect(() => {

    fetch(`http://localhost:3030/contacts`)
    .then((res) => res.json())
    .then((serverContacts) => {
    console.log("Inside inComingcontacts", serverContacts)

      setContacts(serverContacts)
  })
  }, []);  

  console.log("Inside contacts: ", contacts)

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        editForm={editForm}
        setEditForm={setEditForm}
        setContactEdit={setContactEdit}
      />
      <main>{!hideForm && <CreateContactForm contacts={contacts} setContacts={setContacts}/>}
            {!editForm && <EditForm setContacts={setContacts} contactEdit={contactEdit} />} 
      </main>

    </>
  );
}
