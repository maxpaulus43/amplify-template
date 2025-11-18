'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";


const client = generateClient<Schema>();
export const { useAIConversation, useAIGeneration } = createAIHooks(client);

interface TodoListProps {
  initialTodos: Array<Schema["Todo"]["type"]>;
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>(initialTodos);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Set up real-time subscription only when authenticated
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => {
        setTodos([...data.items]);
      },
      error: (error) => {
        console.error('Subscription error:', error);
      }
    });

    return () => subscription.unsubscribe();
  }, [isAuthenticated]);

  const [
    {
      data: { messages },
      isLoading: isLoadingChat,
    },
    handleSendMessage,
  ] = useAIConversation('chat');

  const checkAuthStatus = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSignIn = () => {
    signInWithRedirect({ provider: "Google" });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setTodos([]);
      // Refresh the page to reset server-side state
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Please sign in to view and manage your todos.</p>
        <button
          onClick={handleSignIn}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">You are signed in</p>
        <button
          onClick={handleSignOut}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Sign out
        </button>

        <AIConversation
          messages={messages}
          isLoading={isLoadingChat}
          handleSendMessage={handleSendMessage}
        />
      </div>

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
    </div>
  );
}
