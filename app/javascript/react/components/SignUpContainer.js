import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorList from './ErrorList'
import UserNewForm from './UserNewForm'

const SignUpContainer = () => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  if (shouldRedirect) {
    window.location.replace("/dash")
  }

  const createUser = (registration, wipePassword) => {
    let body = new FormData()
    body.append("user[profile_photo]", registration.profile_photo)
    body.append("user[username]", registration.username)
    body.append("user[email]", registration.email)
    body.append("user[password]", registration.password)
    body.append("user[password_confirmation]", registration.password_confirmation)
    debugger
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

  return (
    <Fragment>
      <h2>Sign up</h2>
      <ErrorList errors={errors} />
      <UserNewForm
        createUser={createUser}
      />
      <p>
        Already a signed up? <Link to="/users/login">Login</Link>
      </p>
    </Fragment>
  )
}

export default SignUpContainer;
