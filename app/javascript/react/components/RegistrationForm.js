import React, { Fragment, useState } from 'react'
import Dropzone from 'react-dropzone'

import ModalForm from './ModalForm'
import ErrorList from './ErrorList'

const RegistrationForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_photo: ""
  })
  const [uploadedPhoto, setUploadedPhoto] = useState([{}])
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  if (shouldRedirect) {
    window.location.replace("/dash")
  }

  const wipePassword = () => {
    setUser({
      ...user,
      password: "",
      password_confirmation: ""
    })
  }

  const createUser = (registration) => {
    let body = new FormData()
    body.append("user[profile_photo]", registration.profile_photo)
    body.append("user[username]", registration.username)
    body.append("user[email]", registration.email)
    body.append("user[password]", registration.password)
    body.append("user[password_confirmation]", registration.password_confirmation)
    const csrfToken = $('meta[name="csrf-token"]').attr('content');
    fetch('/users',
      {
        credentials: 'same-origin',
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Accept': 'image/jpeg',
          'X-CSRF-Token': csrfToken
      },
      body: body
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      if (!Array.isArray(parsedBody)) {
        setShouldRedirect(true)
      } else {
        setErrors(parsedBody)
        wipePassword()
      }
    })
    .catch(error => console.error(`Error in fetch ${error.message}`))
  }

  const handleInput = event => {
    setUser({
      ...user,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    createUser(user)
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
  const errorList = <ErrorList errors={errors} />
  return(
    <Fragment>
     <a type="button" className="btn btn-primary" href="#signupModal" data-toggle="modal">Sign Up</a>

      <ModalForm type="signup">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input autoFocus
              className="form-control"
              placeholder="Username"
              onChange={handleInput}
              type="text"
              name="username"
              value={user.username}
              />
          </div>
          <div className="form-group">
            <input autoFocus
              className="form-control"
              placeholder="Email"
              onChange={handleInput}
              type="text"
              name="email"
              value={user.email}
              />
          </div>
          <div className="form-group">
            <input autoFocus
              className="form-control"
              placeholder="Password"
              onChange={handleInput}
              type="password"
              name="password"
              value={user.password}
              />
          </div>
          <div className="form-group">
            <input autoFocus
              className="form-control"
              placeholder="Confirm Password"
              onChange={handleInput}
              type="password"
              name="password_confirmation"
              value={user.password_confirmation}
              />
          </div>
          <img className="registration-photo" src={uploadedPhoto[0].preview} />
          <Dropzone onDrop={handleFileUpload}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop a profile photo, or click to select one</p>
                </div>
              </section>
            )}
          </Dropzone>
          <input
            className="btn btn-primary btn-lg btn-block login-btn"
            type="submit"
            value="Sign Up"
            />
        </form>
        {errorList}
      </ModalForm>
    </Fragment>
  )
}

export default RegistrationForm;
