import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import UserNewForm from './UserNewForm'
import LoginForm from './LoginForm'

const  LandingPageContainer = () => {
  const [formType, setFormType] = useState(null)

  const buttonGroup = <div>
    <UserNewForm />
    <LoginForm />
  </div>
  return (
    <div className="landing-page">
      Landing Page
      {buttonGroup}
    </div>
  )
}

export default LandingPageContainer;
