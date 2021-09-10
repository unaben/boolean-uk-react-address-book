function ContactsList(props) {
  const { contacts, hideForm, setHideForm, editForm, setEditForm, setContactEdit} = props;

  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => setHideForm(!hideForm)}
          className="button new-contact-btn"
        >
          {hideForm ? "Create" : "Cancel"}
        </button>
      </header>
      <ul>
        {contacts.map((contact, index) => {
          const { firstName, lastName, address } = contact;
          console.log("Inside Contactlist: ", contact)
          return (
            <li key={index}>
              <h3>
                {firstName} {lastName}
              </h3>
              <p>
                {/* {address.street}, {address.postCode} */}
              </p>
              <button
                onClick={() => {setEditForm(!editForm),setContactEdit(contact)} }
                className="button new-contact-btn"
                >
                  {editForm ? "edit" : "cancel"}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ContactsList;
