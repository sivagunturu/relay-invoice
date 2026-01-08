# RelayInvoice

## Overview
RelayInvoice is a Next.js 16 invoicing application with Supabase authentication and database. It allows users to create and manage invoices, clients, consultants, and invoice templates.

## Project Architecture
- **Framework**: Next.js 16.1.1 with Turbopack
- **UI**: React 19 with Tailwind CSS
- **Database/Auth**: Supabase (external service)
- **Icons**: Lucide React

## Directory Structure
```
src/
  app/               # Next.js App Router pages
    (dashboard)/     # Dashboard layout group
    api/             # API routes
    auth/            # Authentication pages
    onboarding/      # User onboarding
  components/        # Reusable React components
  lib/               # Utilities and server actions
    actions/         # Server actions for CRUD operations
    supabase/        # Supabase client configuration
worker/              # Background worker (PDF generation)
```

## Environment Variables
The app requires the following environment variables (configured in .env.local):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

## Development
Run the development server:
```bash
npm run dev -- -H 0.0.0.0 -p 5000
```

## Configuration Notes
- `postcss.config.cjs` and `tailwind.config.cjs` use CommonJS syntax
- `next.config.js` is configured with `allowedDevOrigins` for Replit proxy support
- Package type is set to "module" in package.json
