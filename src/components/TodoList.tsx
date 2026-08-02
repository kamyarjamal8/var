import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-slate-400 text-lg">No tasks found</p>
        <p className="text-slate-500 text-sm mt-2">Create a new task or adjust your filters</p>
      </div>
    );
  }

  // Sort by priority and completion
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="space-y-3">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
