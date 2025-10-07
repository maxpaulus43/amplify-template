## AWS Amplify Next.js (App Router) Starter Template

This repository provides a starter template for creating applications using Next.js (App Router) and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational Next.js application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
---

# Product Overview

This is a **Todo Management Application** built as an AWS Amplify Gen2 starter template. The application demonstrates a full-stack serverless architecture with real-time capabilities.

## Core Features

- **User Authentication**: Google OAuth integration via Amazon Cognito
- **Real-time Todo Management**: Create, read, and delete todos with live updates
- **Owner-based Authorization**: Users can only access their own todos
- **Responsive UI**: Clean, modern interface built with Tailwind CSS

## Target Use Case

This serves as a foundational template for developers building scalable web applications with AWS Amplify Gen2. It showcases best practices for:
- Server-side rendering with Next.js App Router
- Real-time data synchronization
- Secure user authentication
- Optimistic UI updates

The application is designed to be easily extensible for more complex business requirements while maintaining AWS best practices.

# Technology Stack

## Core Framework
- **Next.js 15.5.2** with App Router
- **React 18.3.1** with TypeScript
- **Tailwind CSS 4.1.13** for styling

## AWS Amplify Gen2 Stack
- **AWS Amplify Backend** - Infrastructure as Code
- **Amazon Cognito** - Authentication (Google OAuth)
- **AWS AppSync** - GraphQL API with real-time subscriptions
- **Amazon DynamoDB** - NoSQL database
- **AWS CDK** - Infrastructure deployment

## Key Libraries
- `aws-amplify` - Client SDK for AWS services
- `@aws-amplify/adapter-nextjs` - Next.js integration
- `@aws-amplify/ui-react` - Pre-built UI components
- `@aws-amplify/backend` - Backend resource definitions

## Development Tools
- **TypeScript 5.6.2** - Type safety
- **ESBuild** - Fast bundling
- **TSX** - TypeScript execution
- **Turbopack** - Fast development builds

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Amplify Backend
```bash
npx ampx sandbox     # Start local development environment
npx ampx deploy      # Deploy to AWS
npx ampx generate    # Generate client code
```

## Architecture Patterns
- **Server-Side Rendering (SSR)** with Next.js App Router
- **Real-time subscriptions** using AWS AppSync
- **Optimistic UI updates** for better UX
- **Owner-based authorization** with Cognito user pools
- **Cookie-based authentication** for server components

# Project Structure

## Root Level
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `amplify_outputs.json` - Generated Amplify configuration
- `amplify.yml` - Amplify hosting configuration

## Core Directories

### `/app` - Next.js App Router
- `layout.tsx` - Root layout component
- `page.tsx` - Home page with SSR authentication check
- `globals.css` - Global styles
- `/api` - API routes

### `/amplify` - Backend Infrastructure
- `backend.ts` - Main backend configuration
- `/auth/resource.ts` - Cognito authentication setup
- `/data/resource.ts` - GraphQL schema and data models
- `package.json` - Backend dependencies
- `tsconfig.json` - Backend TypeScript config

### `/components` - React Components
- `ConfigureAmplifyClientSide.tsx` - Client-side Amplify setup
- `TodoForm.tsx` - Todo creation form with optimistic updates
- `TodoList.tsx` - Todo display with real-time subscriptions

### `/utils` - Utility Functions
- `amplifyServerUtils.ts` - Server-side Amplify helpers

### `/public` - Static Assets
- SVG logos and icons

## Key Conventions

### File Naming
- React components: PascalCase (e.g., `TodoForm.tsx`)
- Utilities: camelCase (e.g., `amplifyServerUtils.ts`)
- Pages: lowercase (e.g., `page.tsx`)

### Import Patterns
- Use `@/` alias for root-level imports
- Import Amplify types from `@/amplify/data/resource`
- Server utilities from `@/utils/amplifyServerUtils`

### Component Structure
- Client components marked with `'use client'`
- Server components handle authentication checks
- Separate concerns: forms, lists, configuration

### Authorization Model
- Owner-based access control in data schema
- Server-side authentication validation
- Client-side optimistic updates with error handling