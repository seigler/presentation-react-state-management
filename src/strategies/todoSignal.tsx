import React, { useEffect } from 'react'
import localforage from 'localforage'
import { effect, signal } from '@preact/signals-react'

type Todo = {
  id: string
  text: string
  status: 'incomplete' | 'complete'
}

const isLoading = signal(true)
const todos = signal<Todo[]>([])
effect(() => {
  if (!isLoading.value) {
    localforage.setItem('react-state-management/todos', todos.value)
  }
})
const newTodoText = signal('')

function addTodo() {
  const newTodo = {
    id: crypto.randomUUID(),
    text: newTodoText.value,
    status: 'incomplete' as const
  }
  todos.value = todos.value.concat([newTodo])
  newTodoText.value = ''
}

function removeTodo(id: string) {
  todos.value = todos.value.filter((t) => t.id !== id)
}

function updateTodo(value: Todo) {
  todos.value = todos.value.map((t) => (t.id === value.id ? value : t))
}

export function TodoSignal() {
  useEffect(() => {
    // run once when mounted
    localforage.getItem('react-state-management/todos', (_err, value) => {
      isLoading.value = false
      if (value) {
        todos.value = value as Todo[] // validation first would be better
      }
    })
  }, [])

  return (
    <main
      style={isLoading.value ? { pointerEvents: 'none', cursor: 'wait' } : {}}>
      <TodoList />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo()
        }}>
        <label>
          New todo:{' '}
          <input
            type="text"
            value={newTodoText.value}
            onChange={(e) => (newTodoText.value = e.target.value)}
          />
        </label>
      </form>
    </main>
  )
}

function TodoList() {
  return (
    <>
      {todos.value.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  )
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <label
      style={
        todo.status === 'complete' ? { textDecoration: 'line-through' } : {}
      }>
      <a style={{ float: 'right' }} onClick={() => removeTodo(todo.id)}>
        x
      </a>
      <input
        type="checkbox"
        onChange={(e) => {
          updateTodo({
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
