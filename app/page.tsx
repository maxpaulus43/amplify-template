import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth/server';
import { cookieBasedClient } from '@/utils/amplifyServerUtils';
import type { Schema } from '@/amplify/data/resource';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplifyClientSide';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default async function App() {
  let isAuthenticated = false;
  let todos: Schema["Todo"]["type"][] = [];
  let email: string | undefined;

  try {
    // Check if user is authenticated
    await runWithAmplifyServerContext({
      nextServerContext: { cookies: (await import('next/headers')).cookies },
      operation: async (contextSpec) => {
        try {
          await getCurrentUser(contextSpec);
          const userAttrs = await fetchUserAttributes(contextSpec);
          email = userAttrs.email;
          isAuthenticated = true;
        } catch (error) {
          isAuthenticated = false;
        }
      },
    });

    // Only fetch todos if user is authenticated
    if (isAuthenticated) {
      const { data, errors } = await cookieBasedClient.models.Todo.list();
      if (errors) {
        console.error('Error fetching todos:', errors);
      } else {
        todos = data || [];
      }
    }
  } catch (error) {
    console.error('Authentication check failed:', error);
    isAuthenticated = false;
  }

  return (
    <>
      {/* Configure Amplify for client-side usage */}
      <ConfigureAmplifyClientSide />

      <main className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">My Todos</h1>

        {isAuthenticated ? (
          <>
            {email && <div>{email}</div>}
            {/* Interactive form with client-side creation */}
            <TodoForm />

            {/* Real-time todo list with client-side deletion */}
            <TodoList initialTodos={todos} />
          </>
        ) : (
          <TodoList initialTodos={[]} />
        )}
      </main>
    </>
  );
}
