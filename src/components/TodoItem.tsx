import React, { useState } from 'react';
import { Trash2, Edit2, X, Check, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

const priorityColors = {
  low: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  high: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(todo.id, {
        title: editedTitle,
        description: editedDescription || undefined,
      });
      setIsEditing(false);
    }
  };

  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  if (isEditing) {
    return (
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white mb-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white mb-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none h-16"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition"
          >
            <Check size={16} /> Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditedTitle(todo.title);
              setEditedDescription(todo.description || '');
            }}
            className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition"
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-slate-800 rounded-lg p-4 border transition ${
        todo.completed ? 'border-slate-700 opacity-60' : 'border-slate-700 hover:border-slate-600'
      } ${isOverdue ? 'border-red-500/50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 mt-1 rounded cursor-pointer accent-cyan-500"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3
              className={`font-semibold ${
                todo.completed ? 'line-through text-slate-500' : 'text-white'
              }`}
            >
              {todo.title}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded border ${
                priorityColors[todo.priority]
              }`}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
          </div>

          {todo.description && (
            <p className="text-slate-400 text-sm mb-2">{todo.description}</p>
          )}

          <div className="flex items-center gap-4 flex-wrap text-xs text-slate-400">
            {todo.dueDate && (
              <div
                className={`flex items-center gap-1 ${
                  isOverdue ? 'text-red-400' : ''
                }`}
              >
                <Calendar size={14} />
                {new Date(todo.dueDate).toLocaleDateString()}
                {isOverdue && <span className="text-red-400 font-semibold ml-1">(Overdue)</span>}
              </div>
            )}
            <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-slate-400 hover:text-cyan-400 p-2 rounded-lg hover:bg-slate-700 transition"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-700 transition"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
