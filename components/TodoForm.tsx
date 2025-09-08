'use client';

import { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

interface TodoFormProps {}

export default function TodoForm({}: TodoFormProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;

    const todoContent = content.trim();
    setContent(''); // Clear input immediately
    setIsLoading(true);

    try {
      // Client-side creation - real-time subscription will update the UI
      await client.models.Todo.create({
        content: todoContent,
        priority: 0,
      });
      
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error creating todo:', error);
      setContent(todoContent); // Restore content on error
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter todo content"
          required
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button 
          type="submit"
          disabled={isLoading || !content.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
        >
          {isLoading ? '...' : '+ new'}
        </button>
      </div>
      {isLoading && (
        <p className="text-sm text-gray-500 mt-1">Adding todo...</p>
      )}
    </form>
  );
}
