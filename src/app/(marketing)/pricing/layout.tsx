import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | CallFlow AI',
  description: 'Simple, transparent pricing for AI phone agents. Start at $49/month.',
  openGraph: {
    title: 'Pricing | CallFlow AI',
    description: 'Simple, transparent pricing for AI phone agents.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
