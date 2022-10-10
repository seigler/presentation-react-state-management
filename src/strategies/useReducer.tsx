import React, { useEffect, useReducer, useState } from 'react'
import localforage from 'localforage'

type Todo = {
  id: string
  text: string
  status: 'incomplete' | 'complete'
}

type TodoAction =
  | {
      type: 'delete'
      value: string
    }
  | {
      type: 'add'
      value: Todo
    }
  | {
      type: 'replace'
      value: Todo[]
    }
  | {
      type: 'update'
      value: Todo
    }
const reducer = (state: Todo[], action: TodoAction) => {
  const { type, value } = action
  switch (type) {
    case 'delete':
      return state.filter((todo) => todo.id !== value)
    case 'add':
      return state.concat([value])
    case 'replace':
      return value
    case 'update':
      return state.map((todo) => (todo.id === value.id ? value : todo))
  }
}

export function UseReducer() {
  const [isLoading, setLoading] = useState(true)
  const [todos, dispatchTodoAction] = useReducer(reducer, [])
  const [newTodoText, setNewTodoText] = useState('')

  useEffect(() => {
    // run once when mounted
    localforage.getItem('react-state-management/todos', (_err, value) => {
      if (value) {
        dispatchTodoAction({ type: 'replace', value: value as Todo[] }) // validation first would be better
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    // keep local db up to date
    localforage.setItem('react-state-management/todos', todos)
  }, [todos])

  function addTodo() {
    const newTodo = {
      id: crypto.randomUUID(),
      text: newTodoText,
      status: 'incomplete' as const
    }
    dispatchTodoAction({
      type: 'add',
      value: newTodo
    })
    setNewTodoText('')
  }

  return (
    <main style={isLoading ? { pointerEvents: 'none', cursor: 'wait' } : {}}>
      <TodoList todos={todos} dispatch={dispatchTodoAction} />
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
  dispatch
}: {
  todos: Todo[]
  dispatch: (TodoAction) => void
}) {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </>
  )
}

function TodoItem({
  todo,
  dispatch
}: {
  todo: Todo
  dispatch: (TodoAction) => void
}) {
  return (
    <label
      style={
        todo.status === 'complete' ? { textDecoration: 'line-through' } : {}
      }>
      <a
        style={{ float: 'right' }}
        onClick={() => dispatch({ type: 'delete', value: todo.id })}>
        x
      </a>
      <input
        type="checkbox"
        onChange={(e) => {
          dispatch({
            type: 'update',
            value: {
              ...todo,
              status: e.target.checked ? 'complete' : 'incomplete'
            }
          })
        }}
        checked={todo.status === 'complete'}
      />{' '}
      {todo.text}
    </label>
  )
}
