import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (title: string, description?: string, priority?: 'low' | 'medium' | 'high', dueDate?: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title, description || undefined, priority, dueDate || undefined);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setShowAdvanced(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-4 shadow-lg">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-xs text-cyan-400 hover:text-cyan-300 mb-3 transition"
      >
        {showAdvanced ? '▼ Hide' : '▶ Show'} advanced options
      </button>

      {showAdvanced && (
        <div className="space-y-3 border-t border-slate-700 pt-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none h-20 transition"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
