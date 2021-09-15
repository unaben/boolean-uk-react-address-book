import {useState} from "react"

function CreateContactForm(props) {
  // [TODO] Write form handlers here and POST requests here...

  const {contacts, setContacts} = props

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [blockContact, setBlockContact] = useState(false)
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [postCode, setPostCode] = useState("")

  console.log("Inside CreateContactFormState: ", {
    contact:{
      firstName,
      lastName,
      blockContact,
    },
    address:{
      street,
       city, 
       postCode
      },
  })

  const handleSubmit = event => {
    event.preventDefault()

    const addressToCreate = {
      street,
      city,
      postCode,
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressToCreate),
    }

    fetch("http://localhost:3030/addresses", fetchOptions)
      .then(res => res.json())
      .then(newAddress => {
        console.log("addresses POST request: ", newAddress)

        const contactToCreate = {
          firstName,
          lastName,
          blockContact,
          addressId: newAddress.id,
        }

        console.log("contact to create: ", contactToCreate)

        // Ready to write our next post request in here...

        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactToCreate),
        }

        fetch("http://localhost:3030/contacts", fetchOptions)
          .then(res => res.json())
          .then(newContact => {
            console.log("contacts POST request: ", newContact)

            const contactToAdd = {
              ...newContact,
              address: newAddress,
            }

            console.log("contact to add: ", contactToAdd)

            setContacts([...contacts, contactToAdd])
          })
      })
  }

  const handleFirstName= event => {setFirstName(event.target.value)};
  
  const handlelastName= event => {setLastName(event.target.value)};

  const handleBlockCheckbox= event => {setBlockContact(event.target.checked)};

  const handleStreet= event => {setStreet(event.target.value)};

  const handleCity= event => {setCity(event.target.value)};

  const handlePostCode= event => {setPostCode(event.target.value)};  

  return (
    <form className="form-stack light-shadow center contact-form" onSubmit={handleSubmit}>
      <h1>Create Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input id="first-name-input" name="first-name-input" type="text" onChange={handleFirstName}  />
      <label htmlFor="last-name-input">Last Name:</label>
      <input id="last-name-input" name="last-name-input" type="text" onChange={handlelastName}  />
      <label htmlFor="street-input">Street:</label>
      <input id="street-input" name="street-input" type="text" onChange={handleStreet}  />
      <label htmlFor="city-input">City:</label>
      <input id="city-input" name="city-input" type="text" onChange={handleCity} />
      <label htmlFor="post-code-input">Post Code:</label>
      <input id="post-code-input" name="post-code-input" type="text" onChange={handlePostCode} />
      <div className="checkbox-section">
        <input id="block-checkbox" name="block-checkbox" type="checkbox" onChange={handleBlockCheckbox}  />
        <label htmlFor="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateContactForm;
