'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

interface TodoListProps {
  initialTodos: Array<Schema["Todo"]["type"]>;
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>(initialTodos);

  useEffect(() => {
    // Set up real-time subscription
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => {
        setTodos([...data.items]);
      },
      error: (error) => {
        console.error('Subscription error:', error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleOptimisticDelete = async (todoId: string) => {
    // Optimistic update - remove from UI immediately
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    
    try {
      // Client-side deletion - real-time subscription will confirm
      await client.models.Todo.delete({ id: todoId });
    } catch (error) {
      console.error('Error deleting todo:', error);
      // On error, the subscription will restore the correct state
    }
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
          <span>{todo.content}</span>
          <button 
            onClick={() => handleOptimisticDelete(todo.id)}
            className="text-red-500 hover:text-red-700 ml-2 px-2 py-1 rounded hover:bg-red-50"
          >
            Delete
          </button>
        </li>
      ))}
      {todos.length === 0 && (
        <li className="text-gray-500 italic p-2">No todos yet. Add one above!</li>
      )}
    </ul>
  );
}
