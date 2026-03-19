export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CallFlow AI',
    url: 'https://callflow-ai-blue.vercel.app',
    logo: 'https://callflow-ai-blue.vercel.app/logo.png',
    description: 'AI-powered phone agents for small businesses',
    sameAs: [
      'https://twitter.com/callflow',
      'https://linkedin.com/company/callflow',
      'https://facebook.com/callflow',
    ],
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+1-800-CALLFLOW',
      email: 'support@callflow.ai',
    },
    areaServed: 'US',
    knowsAbout: [
      'AI Phone Agents',
      'Customer Service Automation',
      'Appointment Scheduling',
      'Lead Generation',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SoftwareApplicationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CallFlow AI',
    description:
      'AI-powered phone agents that answer calls, qualify leads, and schedule appointments 24/7',
    url: 'https://callflow-ai-blue.vercel.app',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '49.00',
      priceCurrency: 'USD',
      priceValidUntil: '2026-12-31',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '847',
    },
    screenshot:
      'https://callflow-ai-blue.vercel.app/screenshots/dashboard.png',
    features: [
      'AI Call Answering',
      'Appointment Scheduling',
      'Lead Qualification',
      'Call Analytics',
      'Integration with CRM & Calendar',
      'Call Transcripts',
      'IVR & Call Routing',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function PricingFaqJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I switch plans anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I exceed my monthly minutes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You\'ll be notified when you\'re approaching your limit. Additional minutes are charged at $0.50/min. You can upgrade to a higher plan anytime to get more included minutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a setup fee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No setup fees. Just sign up, configure your AI agent in minutes, and start taking calls.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer discounts for annual billing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, save 20% when you pay annually. That\'s like getting 2.4 months free!',
        },
      },
      {
        '@type': 'Question',
        name: 'What integrations are included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All plans include integrations with Calendly, Google Calendar, Zapier, and more. Scale plan includes advanced integrations like Salesforce and HubSpot.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I cancel anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Monthly plans can be cancelled anytime with no penalty. Annual plans can be cancelled, and we\'ll refund your remaining balance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer a free trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Start with a 14-day free trial on any plan. No credit card required to get started.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept all major credit cards (Visa, Mastercard, American Express). Annual plans can also be paid via invoice for enterprise customers.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
