# RelayInvoice

## Overview
RelayInvoice is a professional, multi-tenant invoicing system built on a fully AWS-native serverless architecture. It supports multiple invoice types (C2C, W2, 1099), implements state-based tax compliance for all 50 US states, and generates professional PDF invoices.

## AWS Architecture
```
Users → AWS Amplify (Next.js) → CloudFront CDN
                ↓
    ┌───────────┼───────────┐
    ↓           ↓           ↓
 Cognito    Aurora      S3 Buckets
  (Auth)   Serverless   (PDFs/Logos)
              v2
                ↓
           SQS Queue
                ↓
         Lambda (PDF)
```

## AWS Services
- **Frontend/API**: AWS Amplify with Next.js App Router
- **Authentication**: Amazon Cognito User Pools (email/password, verification, password reset)
- **Database**: Aurora Serverless v2 PostgreSQL with Data API
- **File Storage**: Amazon S3 (private, with presigned URLs)
- **PDF Generation**: AWS Lambda with Puppeteer/Chromium
- **Job Queue**: Amazon SQS (FIFO)

## Project Architecture
- **Framework**: Next.js 16.1.1 with Turbopack
- **UI**: React 19 with Tailwind CSS
- **Infrastructure as Code**: SST v3 (Serverless Stack)
- **PDF Generation**: Lambda with @sparticuz/chromium
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
    api/             # API routes (auth, onboarding, pdf-url)
    auth/            # Authentication pages (login, signup, verify, forgot-password)
    onboarding/      # User onboarding
  components/        # Reusable React components
    ui/              # Base UI components
    invoices/        # Invoice-specific components
    settings/        # Settings-specific components
  lib/               # Utilities and server actions
    actions/         # Server actions for CRUD operations
    aws/             # AWS SDK utilities
      auth.ts        # Cognito authentication
      database.ts    # RDS Data API queries
      storage.ts     # S3 file operations
      queue.ts       # SQS message sending
      session.ts     # Session management
    config/          # Configuration files (us-states.ts)
    types/           # TypeScript type definitions
functions/           # AWS Lambda functions
  pdf-generator.ts   # PDF generation Lambda
infra/               # Infrastructure files
  schema.sql         # Database schema
  seed-tax-rules.sql # Tax rules for all 50 states
sst.config.ts        # SST infrastructure configuration
```

## Key Features
- **Multi-tenant Architecture**: Organizations with memberships
- **Invoice Types**: Corp-to-Corp (C2C), W-2 Employee, 1099 Contractor
- **State Tax Compliance**: All 50 US states + DC with dynamic tax calculations
- **Professional PDF Generation**: Modern design with gradient headers, compliance notices
- **Payment Instructions**: Bank details displayed on invoices
- **Client Management**: State-based address with tax ID tracking

## Environment Variables (AWS)
Required for deployment:
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (e.g., us-east-1)
- `NEXT_PUBLIC_AWS_REGION` - AWS region for client-side
- `NEXT_PUBLIC_USER_POOL_ID` - Cognito User Pool ID
- `NEXT_PUBLIC_USER_POOL_CLIENT_ID` - Cognito App Client ID
- `DATABASE_ARN` - Aurora cluster ARN
- `DATABASE_SECRET_ARN` - Secrets Manager ARN for DB credentials
- `INVOICE_BUCKET_NAME` - S3 bucket for PDFs
- `LOGOS_BUCKET_NAME` - S3 bucket for logos
- `PDF_QUEUE_URL` - SQS queue URL for PDF jobs

## Development
Run the development server:
```bash
npm run dev -- -H 0.0.0.0 -p 5000
```

Deploy to AWS with SST:
```bash
npx sst dev      # Development with live AWS resources
npx sst deploy   # Production deployment
```

## Deployment
The app uses SST for deployment:
1. `npx sst dev` - Starts local development with live AWS resources
2. `npx sst deploy --stage production` - Deploys to production

## Configuration Notes
- `postcss.config.cjs` and `tailwind.config.cjs` use CommonJS syntax
- `next.config.js` is configured with `allowedDevOrigins` for Replit proxy support
- Package type is set to "module" in package.json
- SST v3 (Ion) is used for AWS infrastructure management

## Authentication Flow
1. User signs up with email/password via `/auth/signup`
2. Verification code sent to email, verified at `/auth/verify`
3. User logs in via `/auth/login`
4. JWT tokens stored in HTTP-only cookies
5. Middleware protects authenticated routes
6. Token refresh handled automatically via session management

## Migration Status (Complete)
- [x] SST project setup
- [x] AWS utility files (auth, database, storage, queue, session)
- [x] Lambda PDF generator
- [x] Database schema design
- [x] Tax rules seed data (all 50 states)
- [x] Cognito authentication integration
- [x] Replace all Supabase calls with AWS SDK
- [x] SQS integration for PDF jobs
- [x] S3 presigned URLs for file access
- [ ] Deploy and test on AWS (pending AWS account configuration)

## Recent Changes (January 2026)
- Completed migration from Supabase to AWS-native architecture
- Implemented Cognito authentication with full auth flow
- All server actions now use RDS Data API
- File storage uses S3 with presigned URLs
- PDF generation queued via SQS to Lambda
- Removed all Supabase dependencies
