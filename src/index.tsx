import React from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './error-page'
import { App } from './App'

const router = createHashRouter([
  {
    path: '*',
    element: <App />,
    errorElement: <ErrorPage />
  }
])

const appEntry = document.getElementById('app')
const root = createRoot(appEntry!)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
