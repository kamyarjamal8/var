import React from 'react';
import { Filter, Trash2 } from 'lucide-react';
import { TodoFilter } from '../types/todo';

interface TodoFilterProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
  stats: { total: number; completed: number; active: number; highPriority: number };
}

export const TodoFilterComponent: React.FC<TodoFilterProps> = ({
  filter,
  onFilterChange,
  onClearCompleted,
  stats,
}) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Filters & Stats</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pb-4 border-b border-slate-700">
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-cyan-400">{stats.total}</div>
          <div className="text-xs text-slate-400">Total Tasks</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{stats.active}</div>
          <div className="text-xs text-slate-400">Active</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.completed}</div>
          <div className="text-xs text-slate-400">Completed</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-400">{stats.highPriority}</div>
          <div className="text-xs text-slate-400">High Priority</div>
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Status</label>
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => onFilterChange({ ...filter, status })}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter.status === status
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Priority</label>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'low', 'medium', 'high'] as const).map((priority) => (
            <button
              key={priority}
              onClick={() => onFilterChange({ ...filter, priority })}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter.priority === priority
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Search</label>
        <input
          type="text"
          value={filter.searchQuery}
          onChange={(e) => onFilterChange({ ...filter, searchQuery: e.target.value })}
          placeholder="Search tasks..."
          className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
      </div>

      {/* Clear Completed */}
      {stats.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
        >
          <Trash2 size={18} />
          Clear Completed ({stats.completed})
        </button>
      )}
    </div>
  );
};
