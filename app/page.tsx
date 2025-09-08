import { cookieBasedClient } from '@/utils/amplifyServerUtils';
import type { Schema } from '@/amplify/data/resource';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplifyClientSide';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default async function App() {
  // Server-side data fetching for initial render
  const { data: todos, errors } = await cookieBasedClient.models.Todo.list();

  if (errors) {
    console.error('Error fetching todos:', errors);
  }

  return (
    <>
      {/* Configure Amplify for client-side usage */}
      <ConfigureAmplifyClientSide />
      
      <main className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">My Todos</h1>
        
        {/* Interactive form with client-side creation */}
        <TodoForm />
        
        {/* Real-time todo list with client-side deletion */}
        <TodoList initialTodos={todos || []} />
      </main>
    </>
  );
}
