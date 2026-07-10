import { useState, useEffect } from "react"

import Header from "./compontents/Header"
import TodoInput from "./compontents/TodoInput"
import EmptyState from "./compontents/EmptyState"
import TodoList from "./compontents/TodoList"
import Toolbar from "./compontents/Toolbar"


function App() {
  // localstorage-hez a kulcs
  const STORAGE_KEY = 'todos-app'

  // belső állapotok
  const [text, setText] = useState('')
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })
  const [filter, setFilter] = useState('all')
  console.log(todos);

  // mellékhatások
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // új todo hozzáadása függvény
  const addTodo = () => {
    const todoText = text.trim()

    if (!todoText) return

    const newTodo = {
      id: crypto.randomUUID(),
      text: todoText,
      isChecked: false,
      createdAt: Date.now()
    }

    setTodos((prev) => [newTodo, ...prev])
    setText('')
  }

  // ez fogja kezelni az ENTER gomb lenyomását
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  // ez fogja kivenni/betenni a pipát a checkboxba
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, isChecked: !prevTodo.isChecked } : prevTodo
      )
    )
  }

  // egy todo törlése funkció
  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((prevTodo) => prevTodo.id !== id)
    )
  }

  // szűrés funkció = új szűrt tömböt hoz létre
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.isChecked
    if (filter === 'done') return todo.isChecked
    return true
  })

  // a kész feladatok törlése gomb funkciója
  const clearCompleted = () => {
    setTodos((prev) =>
      prev.filter((prevTodo) => !prevTodo.isChecked)
    )
  }

  // változó ami megszámolja, hogy hány kész todo-nk van
  const completedCount = todos.filter((todo) => todo.isChecked).length

  // JSX
  return (
    <div className="app-root">
      <div className="todo-card">
        <Header />
        <TodoInput
          value={text}
          onChange={setText}
          onAdd={addTodo}
          onKeyDown={handleKeyDown}
        />
        {todos.length > 0 ? (
          <>
            <Toolbar
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
              disableClear={completedCount === 0}
            />
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

export default App
