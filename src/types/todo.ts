export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  priority?: 'low' | 'medium' | 'high' | 'all';
  searchQuery: string;
}
