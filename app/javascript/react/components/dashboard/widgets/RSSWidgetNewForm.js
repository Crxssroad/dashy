import React, { useState } from 'react'

import ErrorList from '../../ErrorList'

const RSSWidgetNewForm = ({ addWidget }) => {
  let defaultFeed = {
    url: ""
  }
  const [feed, setFeed] = useState(defaultFeed)
  const [errors, setErrors] = useState([])

  const addNewRSSFeed = () => {
    fetch('/api/v1/rss_feeds', {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(feed)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      if (!Array.isArray(parsedBody)) {
        addWidget({
          modulable_type: "RssFeed",
          modulable_id: parsedBody.id
        })
        setFeed(defaultFeed)
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in feed post fetch ${error.message}`))
  }

  const handleInput = event => {
    setFeed({
      ...feed,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNewRSSFeed()
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList errors={errors} />
      <div className="form-group">
        <input placeholder="URL" className="form-control" name="url" type="text" onChange={handleInput} value={feed.url}/>
      </div>

      <input className="btn btn-block" type="submit" value="Add New RSS Widget" />
    </form>
  )
}

export default RSSWidgetNewForm
