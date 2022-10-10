import React from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { strategies } from './strategies'
import { ErrorPage } from './error-page'

export function App() {
  return (
    <>
      <header>
        <h1>React State Management</h1>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'isActive' : '')}>
            Introduction
          </NavLink>
          {strategies.map(({ name }) => (
            <NavLink
              key={name}
              to={name}
              className={({ isActive }) => (isActive ? 'isActive' : '')}>
              {name}
            </NavLink>
          ))}
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" errorElement={<ErrorPage />}>
          <Route index element={<Introduction />} />
          {strategies.map(({ name, component: StrategyComponent }) => (
            <Route key={name} path={name} element={<StrategyComponent />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

function NotFound() {
  return (
    <main>
      <h2>You took a wrong turn</h2>
      <p>There's nothing here.</p>
    </main>
  )
}

function Introduction() {
  return (
    <main>
      <h2>Introduction</h2>
      <p>
        This repo has a simple ToDo app mostly using React's <code>useState</code> hook.
      </p>
      <p>
        We will rewrite this app with <code>useReducer</code>, <code>Redux</code>, <code>useContext</code>, and
        something new, Preact <code>signal</code>s.
      </p>
    </main>
  )
}
