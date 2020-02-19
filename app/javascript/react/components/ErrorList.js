import React from 'react'

const ErrorList = ({ errors }) => {
  const allErrors = errors.map((error, index) => {
    return(
      <li key={index}><i className="fas fa-times-circle"></i> {error}</li>
    )
  })

  return(
    <ul className="error-list">
      {allErrors}
    </ul>
  )
}

export default ErrorList;
