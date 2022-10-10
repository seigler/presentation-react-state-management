import React, { useState } from 'react'
import localforage from 'localforage'

type Todo = {
  id: string
  text: string
  status: 'incomplete' | 'complete'
}

export function UseState() {
  const [isLoading, setLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  localforage.getItem('react-state-management/todos', (_err, value) => {
    if (value) {
      setTodos(value as Todo[]) // validation first would be better
    }
    setLoading(false)
  })

  function updateTodos(newTodos: Todo[]) {
    // alternative to tricky useEffect
    setLoading(true)
    setTodos(newTodos)
    localforage.setItem('react-state-management/todos', newTodos).then(() => {
      setLoading(false)
    })
  }

  function addTodo() {
    const newTodo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      status: 'incomplete' as const
    }
    const newTodos = [...todos, newTodo]
    setNewTodoText('')
    updateTodos(newTodos)
  }

  function todoSetter(id: string, newValue?: Todo) {
    updateTodos(
      todos.reduce((acc, cur) => {
        if (cur.id === id) {
          if (newValue === undefined) {
            return acc
          } else {
            return [...acc, newValue]
          }
        } else {
          return [...acc, cur]
        }
      }, [] as Todo[])
    )
  }

  return (
    <main style={isLoading ? { pointerEvents: 'none', cursor: 'wait' } : {}}>
      <TodoList todos={todos} todoSetter={todoSetter} />
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

function TodoList({
  todos,
  todoSetter
}: {
  todos: Todo[]
  todoSetter: (id: string, newValue?: Todo) => void
}) {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} todoSetter={todoSetter} />
      ))}
    </>
  )
}

function TodoItem({
  todo,
  todoSetter
}: {
  todo: Todo
  todoSetter: (id: string, newValue?: Todo) => void
}) {
  return (
    <label
      style={
        todo.status === 'complete' ? { textDecoration: 'line-through' } : {}
      }>
      <a
        style={{ float: 'right' }}
        onClick={() => todoSetter(todo.id, undefined)}>
        x
      </a>
      <input
        type="checkbox"
        onChange={(e) => {
          todoSetter(todo.id, {
            ...todo,
            status: e.target.checked ? 'complete' : 'incomplete'
          })
        }}
        checked={todo.status === 'complete'}
      />{' '}
      {todo.text}
    </label>
  )
}
