import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTodoStorage } from '../hooks/useTodoStorage';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { TodoFilterComponent } from '../components/TodoFilter';

export const TodoApp: React.FC = () => {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    getFilteredTodos,
    getStats,
    isLoaded,
  } = useTodoStorage();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  const filteredTodos = getFilteredTodos();
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={32} className="text-cyan-400" />
            <h1 className="text-4xl font-bold">Task Manager</h1>
          </div>
          <p className="text-slate-400">Stay organized and track your productivity</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Section */}
          <div className="lg:col-span-2 space-y-6">
            <TodoForm onAddTodo={addTodo} />
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          </div>

          {/* Sidebar */}
          <div>
            <TodoFilterComponent
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
