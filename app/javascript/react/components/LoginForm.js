import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import ErrorList from './ErrorList'
import ModalForm from './ModalForm'

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
      } else if (response.status === 401 && response.statusText){
        setErrors(["Invalid login or password"])
        setUser({
          ...user,
          password: "",
          password_confirmation: ""
        })
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      if (parsedBody) {
        setShouldRedirect(true)
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
     <a type="button" className="btn btn-primary" href="#loginModal" data-toggle="modal">Log In</a>
      <ModalForm type="login" >
        <ErrorList errors={errors} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input autoFocus
              className="form-control"
              placeholder="Email or Username"
              onChange={handleInput}
              type="text"
              name="login"
              value={user.login}
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
          <label>
            <input type="checkbox" name="remember_me" />
            Remember me
          </label>
          <input
            className="btn btn-primary btn-lg btn-block login-btn"
            type="submit"
            value="Log In"
          />
        </form>
      </ModalForm>
    </Fragment>
  )
}

export default LoginContainer;
