import React, { useState } from 'react'

type Todo = {
  id: string
  text: string
  status: 'incomplete' | 'complete' | 'hidden'
}

export function UseState() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  function addTodo() {
    const newTodo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      status: 'incomplete' as const
    }
    setTodos((t) => [...t, newTodo])
  }

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo()
        }}>
        <label>
          New todo:{' '}
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
        </label>
      </form>
    </main>
  )
}
