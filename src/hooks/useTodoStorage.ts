import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoFilter } from '../types/todo';

const STORAGE_KEY = 'todos';

export const useTodoStorage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>({
    status: 'all',
    priority: 'all',
    searchQuery: '',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Failed to parse saved todos:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = useCallback((title: string, description?: string, priority: 'low' | 'medium' | 'high' = 'medium', dueDate?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
    };
    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const getFilteredTodos = useCallback((): Todo[] => {
    return todos.filter((todo) => {
      // Filter by status
      if (filter.status === 'active' && todo.completed) return false;
      if (filter.status === 'completed' && !todo.completed) return false;

      // Filter by priority
      if (filter.priority !== 'all' && todo.priority !== filter.priority) return false;

      // Filter by search query
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        return (
          todo.title.toLowerCase().includes(query) ||
          (todo.description?.toLowerCase().includes(query) ?? false) ||
          (todo.tags?.some((tag) => tag.toLowerCase().includes(query)) ?? false)
        );
      }

      return true;
    });
  }, [todos, filter]);

  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const highPriority = todos.filter((t) => !t.completed && t.priority === 'high').length;

    return { total, completed, active, highPriority };
  }, [todos]);

  return {
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
  };
};
