import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorList from './ErrorList'

const SignUpContainer = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  if (shouldRedirect) {
    window.location.replace("/dash")
  }

  const createUser = (registration) => {
    const csrfToken = $('meta[name="csrf-token"]').attr('content');
    fetch('/users',
      {
        credentials: 'same-origin',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({user:registration})
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
        setUser({
          ...user,
          password: "",
          password_confirmation: ""
        })
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

  return (
    <Fragment>
      <h2>Sign up</h2>
      <ErrorList errors={errors} />
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

        <input type="submit" value="Sign Up" />
        <p>
          Already a signed up? <Link to="/users/login">Login</Link>
        </p>
      </form>
    </Fragment>
  )
}

export default SignUpContainer;
