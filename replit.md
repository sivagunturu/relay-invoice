# RelayInvoice

## Overview
RelayInvoice is a professional, multi-tenant invoicing system built with Next.js 16 and Supabase. It supports multiple invoice types (C2C, W2, 1099), implements state-based tax compliance for all 50 US states, and generates professional PDF invoices.

## Project Architecture
- **Framework**: Next.js 16.1.1 with Turbopack
- **UI**: React 19 with Tailwind CSS
- **Database/Auth**: Supabase (external service)
- **PDF Generation**: Puppeteer with Handlebars templates
- **Icons**: Lucide React

## Directory Structure
```
src/
  app/               # Next.js App Router pages
    (dashboard)/     # Dashboard layout group
      invoices/      # Invoice management pages
      clients/       # Client management pages
      consultants/   # Consultant management pages
      settings/      # Organization settings
    api/             # API routes
    auth/            # Authentication pages
    onboarding/      # User onboarding
  components/        # Reusable React components
    ui/              # Base UI components (Button, Card, Input)
    invoices/        # Invoice-specific components
    settings/        # Settings-specific components
  lib/               # Utilities and server actions
    actions/         # Server actions for CRUD operations
    config/          # Configuration files (us-states.ts)
    supabase/        # Supabase client configuration
    types/           # TypeScript type definitions
worker/              # Background worker (PDF generation)
  jobs/              # Job handlers
  templates/         # HTML templates for PDFs
```

## Key Features
- **Multi-tenant Architecture**: Organizations with memberships
- **Invoice Types**: Corp-to-Corp (C2C), W-2 Employee, 1099 Contractor
- **State Tax Compliance**: All 50 US states + DC with dynamic tax calculations
- **Professional PDF Generation**: Modern design with gradient headers, compliance notices
- **Payment Instructions**: Bank details displayed on invoices
- **Client Management**: State-based address with tax ID tracking

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

Run the PDF worker (optional, for PDF generation):
```bash
node worker/index.js
```

## Configuration Notes
- `postcss.config.cjs` and `tailwind.config.cjs` use CommonJS syntax
- `next.config.js` is configured with `allowedDevOrigins` for Replit proxy support
- Package type is set to "module" in package.json

## Recent Changes (January 2026)
- Added US state tax configuration with compliance rules
- Implemented C2C/W2/1099 invoice type selection
- Enhanced client form with state, city, zip, and tax ID fields
- Redesigned professional PDF template with modern styling
- Added payment instructions to settings and PDF output
- Updated invoice creation with consultant selection and auto-generated compliance text
