import React, { useEffect, useState } from 'react'
import localforage from 'localforage'

type Todo = {
  id: string
  text: string
  status: 'incomplete' | 'complete'
}

export function TodoUseState() {
  const [isLoading, setLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  useEffect(() => {
    // run once when mounted
    localforage.getItem('react-state-management/todos', (_err, value) => {
      if (value) {
        setTodos(value as Todo[]) // validation first would be better
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
    const newTodos = [...todos, newTodo]
    setNewTodoText('')
    setTodos(newTodos)
  }

  function todoSetter(id: string, newValue?: Todo) {
    setTodos(
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
