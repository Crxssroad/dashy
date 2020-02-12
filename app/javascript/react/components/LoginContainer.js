import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import ErrorList from './ErrorList'

const LoginContainer = () => {
  const [user, setUser] = useState({
    login: "",
    password: ""
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  if (shouldRedirect) {
    window.location.replace("/dash")
  }

  const loginUser = formPayload => {
    const csrfToken = $('meta[name="csrf-token"]').attr('content');
    fetch('/users/login',
      {
        credentials: 'same-origin',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({user:formPayload})
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
    event.preventDefault();
    loginUser(user)
  }

  return(
    <Fragment>
      <h2>Log in</h2>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Email or Username
          <input autoFocus type="text" onChange={handleInput} name="login" value={user.login}/>
        </label>
        <label>
          Password
          <input type="password" onChange={handleInput} name="password" value={user.password}/>
        </label>

        <label>
          Remember me
          <input type="checkbox" name="remember_me" />
        </label>
        <input type="submit" value="Log in"/>
        <Link to="/users/signup">Or sign up!</Link>
      </form>
    </Fragment>
  )
}

export default LoginContainer;
