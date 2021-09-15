import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles.css";
import EditContactForm from "./components/EditContactForm";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true); 
  const [contactToEdit, setContactToEdit] = useState([]); 

console.log("Inside State : ", contacts, hideForm, contactToEdit);

  // [TODO] Write a useEffect to fetch contacts here...

  useEffect(() => {

    fetch(`http://localhost:3030/contacts`)
    .then((res) => res.json())
    .then((inComingContactsData) => {
    console.log("Inside inComingcontacts", inComingContactsData)

      setContacts(inComingContactsData)
  })
  }, []);  

  console.log("Inside contacts: ", contacts)

  return (
    <>
     <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        setContactToEdit={setContactToEdit}
      />
      <main>
        {!hideForm && (
          <CreateContactForm 
          contacts={contacts} 
          setContacts={setContacts} 
          />
        )}
        {/* EditContactForm is the component we need to send the data*/}
        <EditContactForm
          contacts={contacts}
          setContacts={setContacts}
          contactToEdit={contactToEdit}
          />
      </main>

    </>
  );
}
