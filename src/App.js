import { useState, useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import "./styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);

  // [TODO] Write a useEffect to fetch contacts here...
  useEffect(() => {

    fetch(`http://localhost:3030/contacts`)
    .then((res) => res.json())
    .then((inComingContacts) => {
    console.log("Inside inComingcontacts", inComingContacts)

      setContacts(inComingContacts)
  })
  }, []);  

  console.log("Inside contacts: ", contacts)

  return (
    <>
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
      />
      <main>{!hideForm && <CreateContactForm contacts={contacts} setContacts={setContacts}/>}</main>
    </>
  );
}
