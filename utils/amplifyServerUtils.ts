import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import outputs from '@/amplify_outputs.json';
import { cookies } from 'next/headers';
import type { Schema } from '@/amplify/data/resource';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});
