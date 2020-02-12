import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

const UserNewForm = ({ createUser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_photo: ""
  })
  const [uploadedPhoto, setUploadedPhoto] = useState([{}])

  const handleInput = event => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const wipePassword = () => {
      setUser({
        ...user,
        password: "",
        password_confirmation: ""
      })
    }
    createUser(user, wipePassword)
  }

  const handleFileUpload = (acceptedFiles) => {
    setUploadedPhoto(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    setUser({
      ...user,
      profile_photo: acceptedFiles[0]
    })
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input autoFocus
          onChange={handleInput}
          type="text"
          name="username"
          value={user.username}
        />
      </label>

      <label>
        Email
        <input
          onChange={handleInput}
          type="text"
          name="email"
          value={user.email}
        />
      </label>

      <label>
        Password
        <input
          onChange={handleInput}
          type="password"
          name="password"
          value={user.password}
        />
      </label>

      <label>
        Password Confirmation
        <input
          onChange={handleInput}
          type="password"
          name="password_confirmation"
          value={user.password_confirmation}
        />
      </label>
      <img src={uploadedPhoto[0].preview} />
      <Dropzone onDrop={handleFileUpload}>
           {({getRootProps, getInputProps}) => (
             <section>
               <div {...getRootProps()}>
                 <input {...getInputProps()} />
                 <p>Drag 'n' drop some files here, or click to select files</p>
               </div>
             </section>
           )}
         </Dropzone>
      <input type="submit" value="Sign Up" />
    </form>
  )
}

export default UserNewForm;
