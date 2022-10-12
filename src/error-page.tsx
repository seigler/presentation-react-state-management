import React from 'react'
import { useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>
        <figure>
          <img
            src={`http://placekitten.com/${
              500 + Math.round(Math.random() * 300)
            }`}
            style={{ width: '100%' }}
            alt="kitten"
          />
          <figcaption>It's not so bad, here's a kitten</figcaption>
        </figure>
      </p>
    </div>
  )
}
