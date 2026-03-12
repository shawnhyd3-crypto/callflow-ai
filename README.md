# CallFlow AI - AI Phone Agents for Small Business

A production-ready SaaS platform that enables small businesses to deploy AI phone agents that answer calls, book appointments, handle FAQs, and route urgent calls.

## Features

- **AI Phone Agents**: Powered by Vapi AI voice API
- **Call Management**: Full call logging with transcripts and recordings
- **Appointment Booking**: Automated appointment scheduling and tracking
- **Multi-Agent Support**: Create and manage multiple agents per organization
- **Industry Templates**: Pre-configured prompts for plumbers, dentists, restaurants, salons, etc.
- **Analytics Dashboard**: Call metrics, durations, outcomes, and usage tracking
- **Stripe Integration**: Subscription management with Starter, Pro, and Enterprise plans
- **Real-time Webhooks**: Handle call events and updates in real-time
- **Secure Authentication**: NextAuth.js with database session storage

## Tech Stack

- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Voice AI**: Vapi AI SDK
- **Payments**: Stripe
- **Hosting**: Vercel, Railway, or self-hosted

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+ (local or hosted)
- Vapi AI account and API key
- Stripe account and API keys
- Git

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd callflow-ai/app
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/callflow_ai"

# Authentication
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Vapi
VAPI_API_KEY="your_vapi_api_key"
VAPI_WEBHOOK_SECRET="your_vapi_webhook_secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_STARTER_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."
```

### 3. Database Setup

```bash
# Initialize Prisma and create database
npm run db:push

# Optional: Open Prisma Studio to view data
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
callflow-ai/app/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css          # Global styles
│   │   ├── dashboard/
│   │   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   │   ├── page.tsx         # Main dashboard
│   │   │   ├── agents/
│   │   │   │   └── page.tsx     # Agent management
│   │   │   ├── calls/
│   │   │   │   └── page.tsx     # Call logs and analytics
│   │   │   └── settings/
│   │   │       └── page.tsx     # Account/billing/phone settings
│   │   └── api/
│   │       ├── vapi/
│   │       │   └── webhook/route.ts    # Vapi webhook handler
│   │       └── stripe/
│   │           └── webhook/route.ts    # Stripe webhook handler
│   ├── components/
│   │   └── DashboardSidebar.tsx # Navigation sidebar
│   └── lib/
│       ├── prisma.ts            # Prisma client singleton
│       ├── stripe.ts            # Stripe utilities and config
│       └── vapi.ts              # Vapi SDK wrapper
├── prisma/
│   └── schema.prisma            # Database schema
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .env.example
└── README.md
```

## API Integration Guide

### Vapi Integration

1. **Create Vapi Account**: https://www.vapi.ai
2. **Get API Key**: From your Vapi dashboard
3. **Configure Webhook**:
   - Set webhook URL to: `https://your-domain.com/api/vapi/webhook`
   - Receive events: call-started, call-ended, speech-update, etc.

### Stripe Integration

1. **Create Stripe Account**: https://stripe.com
2. **Create Products and Prices**:
   - Starter: $29/month, 100 minutes
   - Pro: $99/month, 500 minutes
   - Enterprise: $299/month, 2000+ minutes
3. **Configure Webhook**:
   - Endpoint: `https://your-domain.com/api/stripe/webhook`
   - Events: checkout.session.completed, customer.subscription.*

### NextAuth Setup

1. Generate secret: `openssl rand -base64 32`
2. Add to `.env.local`
3. Optional: Configure OAuth providers (Google, GitHub, etc.)

## Database Schema

### Core Models

- **User**: Business owner accounts
- **Organization**: The small business using CallFlow
- **PhoneAgent**: Configuration for each AI agent
- **AgentTemplate**: Pre-configured templates (Plumber, Dentist, etc.)
- **CallLog**: Records of all incoming calls with transcripts
- **Appointment**: Booked appointments from calls
- **Subscription**: Stripe subscription tracking
- **UsageRecord**: Monthly minute usage per organization
- **PhoneNumber**: Phone numbers assigned to agents

See `prisma/schema.prisma` for full schema.

## Deployment

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Railway

```bash
# Install Railway CLI
npm i -g railway

# Login and link project
railway login
railway link

# Deploy
railway up

# Set environment variables
railway variables set DATABASE_URL=...
```

### Self-Hosted (Docker)

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t callflow-ai .
docker run -p 3000:3000 --env-file .env.production callflow-ai
```

## Configuration Guide

### Vapi Voice Configuration

Available voices in `src/lib/vapi.ts`:
- Asteria (Female, Friendly)
- Orion (Male, Professional)
- Lora (Female, Calm)
- Shelby (Female, Energetic)
- Skylar (Female, Warm)

### System Prompts

Customize agent behavior by editing system prompts:

```typescript
const systemPrompt = `You are a professional receptionist for [Business Name].
Your responsibilities:
1. Answer calls courteously
2. Collect caller information
3. Book appointments when requested
4. Answer frequently asked questions
5. Route complex issues to the owner

Key facts:
- Business hours: 9 AM - 5 PM, Monday - Friday
- Services offered: [List services]
- Pricing: [List pricing]
`;
```

### Pricing Plans

Edit plans in `src/lib/stripe.ts`:

```typescript
const STRIPE_PLANS = {
  starter: {
    name: 'Starter',
    price: 29,
    minutesPerMonth: 100,
    agents: 1,
    features: [...],
  },
  // ... more plans
}
```

## API Routes

### Vapi Webhook
`POST /api/vapi/webhook`

Receives events:
- `call-started`: Call begins
- `call-ended`: Call completes with transcript
- `speech-update`: Real-time speech updates
- `function-calls`: Agent triggers functions

### Stripe Webhook
`POST /api/stripe/webhook`

Receives events:
- `checkout.session.completed`: Payment successful
- `customer.subscription.created|updated|deleted`: Subscription changes
- `invoice.payment_succeeded|failed`: Payment status

## Usage Tracking

The system automatically:
1. Records call duration in seconds
2. Converts to minutes (rounded up)
3. Increments monthly usage record
4. Checks against plan limits
5. Alerts when approaching limit

## Monitoring & Analytics

Dashboard provides:
- Total calls this month
- Average call duration
- Appointments booked
- Urgent escalations
- Recent calls list
- Active agents status
- Monthly usage meter

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
prisma db execute --stdin
SELECT 1;

# Reset database (development only)
npm run db:push -- --force-reset
```

### Vapi Integration Issues
- Verify API key in `.env.local`
- Check webhook signature in logs
- Ensure webhook URL is publicly accessible
- Test with Vapi dashboard's "Send Test Event"

### Stripe Integration Issues
- Verify webhook signing secret
- Check event types enabled in Stripe dashboard
- Review webhook logs in Stripe console
- Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Authentication Issues
- Regenerate NEXTAUTH_SECRET if changed
- Clear browser cookies and auth session
- Check database `sessions` table
- Verify NEXTAUTH_URL matches domain

## Performance Optimization

- Database queries optimized with indexes
- Call logs paginated (50 per page)
- Images optimized with Next.js Image
- API routes use compression
- Tailwind CSS purged for production

## Security Considerations

- All API routes validate requests
- Webhook signatures verified
- Stripe keys never exposed client-side
- Database credentials in environment variables only
- CORS configured appropriately
- Rate limiting recommended for production
- SQL injection prevented with Prisma ORM

## Common Customizations

### Add New Agent Template
1. Add new record to `agent_templates` table
2. Create system prompt
3. Display in UI

### Custom Voice Settings
Edit Vapi integration in `src/lib/vapi.ts` to support:
- Language-specific voices
- Voice cloning
- Advanced voice parameters

### Extend Call Recording
Modify `handleCallEnded` in `src/app/api/vapi/webhook/route.ts` to:
- Store recordings in cloud storage (S3, etc.)
- Transcribe with more advanced NLP
- Generate call summaries

### Add Phone Number Management
Already included! Use `/dashboard/settings` to add/remove phone numbers

## Support & Resources

- **Vapi Docs**: https://docs.vapi.ai
- **Stripe Docs**: https://stripe.com/docs
- **NextAuth Docs**: https://next-auth.js.org
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs

## License

MIT

## Contributing

Contributions welcome! Please submit pull requests or open issues for bugs.

## Connecting to Paperclip

CallFlow AI can integrate with Paperclip for business automation:

1. **Export Call Data**: Use API to send call logs and appointments
2. **Create Workflows**: Automate follow-up tasks in Paperclip
3. **Sync Contacts**: Send new customers to Paperclip CRM
4. **Trigger Actions**: Use Paperclip webhooks to control agents

Example integration:
```typescript
// Send appointment to Paperclip
const response = await fetch('https://api.paperclip.app/contacts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${PAPERCLIP_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: appointment.clientName,
    email: appointment.clientEmail,
    phone: appointment.clientPhone,
    notes: `Appointment: ${appointment.service} at ${appointment.appointmentTime}`,
  }),
});
```

## Next Steps

1. ✅ Deploy to production
2. ✅ Set up custom domain
3. ✅ Configure email notifications
4. ✅ Add SMS notifications (Twilio)
5. ✅ Implement call recording storage (AWS S3)
6. ✅ Add CRM integrations (HubSpot, Salesforce, etc.)
7. ✅ Set up analytics dashboard (Mixpanel, Segment)
8. ✅ Add team management and permissions
9. ✅ Build mobile app with React Native
10. ✅ Add advanced AI features (sentiment analysis, quality scoring)
