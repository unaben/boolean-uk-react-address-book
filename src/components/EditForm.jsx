import {useEffect, useState} from "react"

export default function EditForm (props){

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [blockContact, setBlockContact] = useState(false)
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [postCode, setPostCode] = useState("")

const{contactEdit} = props
console.log("Inside ContactEdit: ", contactEdit)

useEffect(() => {

if(contactEdit){
console.log("")
setFirstName(contactEdit.firstName)
setLastName(contactEdit.lastName)
setPostCode(contactEdit.address.postCode)
setStreet(contactEdit.address.street)
setCity(contactEdit.address.city)
setBlockContact(contactEdit.blockContact)

}
  }, [contactEdit]);
  
  const handleSubmit = event => {
    event.preventDefault()
  }

  const handleFirstName= event =>{
    setFirstName(event.target.value)
  }
  
  const handlelastName= event =>{
    setLastName(event.target.value)
  }

  const handleBlockCheckbox= event =>{
    setBlockContact(event.target.checked)
  }

  const handleStreet= event =>{
    setStreet(event.target.value)
  }

  const handleCity= event =>{
    setCity(event.target.value)
  }

  const handlePostCode= event =>{
    setPostCode(event.target.value)
  }

    return(
        <form className="form-stack light-shadow center contact-form" onSubmit={handleSubmit} >
      <h1>Create Contact</h1>
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
          Create
        </button>
      </div>
    </form>
    )
}