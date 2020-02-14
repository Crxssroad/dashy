import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'

import UserNewForm from './UserNewForm'
import LoginForm from './LoginForm'

const  LandingPageContainer = () => {
  const [formType, setFormType] = useState(null)

  const imageCredit = <Fragment>
    <a
      className="unsplash-badge-container"
      href="https://unsplash.com/@samsomfotos?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
      target="_blank"
      rel="noopener noreferrer"
      title="Download free do whatever you want high-resolution photos from samsommer">
      <span className="unsplash-svg-container ">
        <svg
          className="unsplash-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>unsplash-logo</title>
          <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
        </svg>
      </span>
      <span className="unsplash-contributor-name">
        samsommer
      </span>
    </a>
  </Fragment>

  const buttonGroup = <div className="landing-page-buttons">
    <LoginForm />
    <UserNewForm />
  </div>
  return (
    <div className="landing-page">
      {buttonGroup}
      {imageCredit}
    </div>
  )
}

export default LandingPageContainer;
