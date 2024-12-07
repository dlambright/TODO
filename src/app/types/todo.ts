export interface Todo {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed';
  updatedAt: string;
  createdAt?: string;
  __typename?: string;
}

export interface TodoFilterState {
  pending: boolean;
  completed: boolean;
  all: boolean;
} 