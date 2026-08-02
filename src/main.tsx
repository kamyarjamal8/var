import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'todos';

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = () => {
    if (title.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTodos([newTodo, ...todos]);
      setTitle('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">📋 Task Manager</h1>
        <p className="text-slate-400 mb-8">Stay organized and track your productivity</p>

        {/* Add Task Form */}
        <div className="bg-slate-800 rounded-lg p-4 shadow-lg mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
            <button
              onClick={addTodo}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-slate-400 text-lg">No tasks yet</p>
              <p className="text-slate-500 text-sm mt-2">Add a new task to get started!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition flex items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 rounded cursor-pointer accent-cyan-500"
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold ${
                    todo.completed ? 'line-through text-slate-500' : 'text-white'
                  }`}>
                    {todo.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Priority: <span className={`font-semibold ${
                      todo.priority === 'high' ? 'text-red-400' :
                      todo.priority === 'medium' ? 'text-yellow-400' :
                      'text-blue-400'
                    }`}>{todo.priority}</span>
                  </p>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-slate-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-slate-700 transition"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 text-center border border-slate-700">
            <div className="text-2xl font-bold text-cyan-400">{todos.length}</div>
            <div className="text-xs text-slate-400 mt-1">Total Tasks</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center border border-slate-700">
            <div className="text-2xl font-bold text-green-400">{todos.filter(t => t.completed).length}</div>
            <div className="text-xs text-slate-400 mt-1">Completed</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center border border-slate-700">
            <div className="text-2xl font-bold text-blue-400">{todos.filter(t => !t.completed).length}</div>
            <div className="text-xs text-slate-400 mt-1">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <TodoApp />
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found!');
}
