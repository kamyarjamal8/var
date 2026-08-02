import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoApp } from './pages/TodoApp'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
)
