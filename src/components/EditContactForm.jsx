import {useEffect, useState} from "react"

export default function EditContactForm (props){
  const{contacts, setContacts, contactToEdit} = props

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [blockContact, setBlockContact] = useState(false)
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [postCode, setPostCode] = useState("")

console.log("EditContactForm State: ", {

  contact:{
    firstName,
    lastName,
    blockContact
  },
  address:{ street, city, postCode}

})

useEffect(() => {

if (contactToEdit) {

  // const { firstName, lastName, blockContact, address } = contactToEdit;

  // const { street, city, postCode } = address;

  setFirstName(contactToEdit.firstName);
  setLastName(contactToEdit.lastName);
  setBlockContact(contactToEdit.blockContact);
  setStreet(contactToEdit.address.street);
  setCity(contactToEdit.address.city);
  setPostCode(contactToEdit.address.postCode);
}
  }, [contactToEdit]);
  
  const handleSubmit = event => {
    event.preventDefault()

    const addressToCreate = {
        street,
        city,
        postCode,
      }
  
      const addressesfetchOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressToCreate),
      }
  
      fetch("http://localhost:3030/addresses", addressesfetchOptions)
        .then(res => res.json())
        .then(newAddress => {
          console.log("addresses PATCH request: ", newAddress)
  
          const contactToCreate = {
            firstName,
            lastName,
            blockContact,
            addressId: newAddress.id,
          }
  
          console.log("contact to create: ", contactToCreate)
  
          const fetchOptions = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactToCreate),
          }
  
          fetch("http://localhost:3030/contacts", fetchOptions)
            .then(res => res.json())
            .then(newContact => {
              console.log("contacts PATCH request: ", newContact)
  
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

    return(
        <form className="form-stack light-shadow center contact-form" onSubmit={handleSubmit} >
      <h1>Edit Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input id="first-name-input" name="first-name-input" type="text" onChange={handleFirstName} value={firstName} />
      <label htmlFor="last-name-input">Last Name:</label>
      <input id="last-name-input" name="last-name-input" type="text" onChange={handlelastName} value={lastName} />
      <label htmlFor="street-input">Street:</label>
      <input id="street-input" name="street-input" type="text" onChange={handleStreet} value={street} />
      <label htmlFor="city-input">City:</label>
      <input id="city-input" name="city-input" type="text" onChange={handleCity} value={city} />
      <label htmlFor="post-code-input">Post Code:</label>
      <input id="post-code-input" name="post-code-input" type="text" onChange={handlePostCode}  value={postCode} />
      <div className="checkbox-section">
        <input id="block-checkbox" name="block-checkbox" type="checkbox" onChange={handleBlockCheckbox} checked={blockContact} />
        <label htmlFor="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Update
        </button>
      </div>
    </form>
    )
}

// Method Two: Dynamic

// const dynamicFormHandlers = () => {

// const [contactInputs, setContactInputs] = useState({
//   firstName: "",
//   lastName: "",
//   blockContact: false
// });

// console.log("EditContactForm State: ", { contactInputs });

// const handleContactInputs = (event) => {
//   console.log(
//     "Inside handleContactInputs: ",
//     event.target.name,
//     event.target.value
//   );

//   const inputType = event.target.type;

//   const inputName = event.target.name;

//   // In order to dynamically update our object we need to edit the name attribute on our inputs

//   if (inputType === "checkbox") {
//     setContactInputs({
//       ...contactInputs,
//       [inputName]: event.target.checked
//     });
//   } else {
//     setContactInputs({
//       ...contactInputs,
//       [inputName]: event.target.value
//     });
//   }
// };

// return (
// <form
//   onSubmit={handleSubmit}
//   className="form-stack light-shadow center contact-form"
// >
//   <h1>Edit Contact</h1>
//   <label htmlFor="first-name-input">First Name:</label>
//   <input
//     id="first-name-input"
//     name="first-name-input"
//     type="text"
//     onChange={handleFirstName}
//     value={firstName}
//   />
//   <label htmlFor="last-name-input">Last Name:</label>
//   <input
//     id="last-name-input"
//     name="last-name-input"
//     type="text"
//     onChange={handleLastName}
//     value={lastName}
//   />
//   <label htmlFor="street-input">Street:</label>
//   <input
//     id="street-input"
//     name="street-input"
//     type="text"
//     onChange={handleStreet}
//     value={street}
//   />
//   <label htmlFor="city-input">City:</label>
//   <input
//     id="city-input"
//     name="city-input"
//     type="text"
//     onChange={handleCity}
//     value={city}
//   />
//   <label htmlFor="post-code-input">Post Code:</label>
//   <input
//     id="post-code-input"
//     name="post-code-input"
//     type="text"
//     onChange={handlePostCode}
//     value={postCode}
//   />
//   <div className="checkbox-section">
//     <input
//       id="block-checkbox"
//       name="block-checkbox"
//       type="checkbox"
//       onChange={handleBlockCheckbox}
//       checked={blockContact}
//     />
//     <label htmlFor="block-checkbox">Block</label>
//   </div>
//   <div className="actions-section">
//     <button className="button blue" type="submit">
//       Create
//     </button>
//   </div>
// </form>
// );
// }

// export default EditContactForm;
