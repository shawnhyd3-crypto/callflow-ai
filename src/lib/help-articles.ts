export interface HelpArticle {
  slug: string;
  title: string;
  category: string;
  content: string;
  order: number;
}

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with CallFlow AI',
    category: 'Getting Started',
    order: 1,
    content: `
      <h2>Welcome to CallFlow AI</h2>
      <p>CallFlow AI is an AI-powered phone agent that handles incoming calls for your business. With minimal setup, your agent can answer calls, book appointments, and handle customer inquiries 24/7.</p>

      <h3>Key Features</h3>
      <ul>
        <li><strong>24/7 Availability:</strong> Your agent answers calls around the clock</li>
        <li><strong>Smart Routing:</strong> Direct calls to the right department or person</li>
        <li><strong>Appointment Booking:</strong> Automatically schedule appointments</li>
        <li><strong>Call Analytics:</strong> Track all calls with detailed logs and insights</li>
        <li><strong>Easy Integration:</strong> Works with your existing phone system</li>
      </ul>

      <h3>Next Steps</h3>
      <ol>
        <li>Complete the onboarding wizard to create your first agent</li>
        <li>Customize your agent's greeting and behavior</li>
        <li>Forward your business phone number to CallFlow AI</li>
        <li>Monitor calls in the dashboard</li>
      </ol>
    `,
  },
  {
    slug: 'creating-first-agent',
    title: 'Creating Your First Agent',
    category: 'Agents',
    order: 2,
    content: `
      <h2>Creating Your First Phone Agent</h2>
      <p>Follow these steps to create your first AI-powered phone agent.</p>

      <h3>Step 1: Business Information</h3>
      <p>Fill in your business name, select your industry, and optionally add your business phone number. This helps us customize the agent for your specific needs.</p>

      <h3>Step 2: Choose a Template</h3>
      <p>Select from pre-built templates like "Appointment Booking" or "Lead Capture". Templates come with pre-configured prompts and behaviors tailored to specific industries.</p>

      <h3>Step 3: Customize Your Agent</h3>
      <p>Give your agent a name, write a custom greeting, select a voice, and choose which features to enable:</p>
      <ul>
        <li><strong>Answer Calls:</strong> Agent responds to incoming calls</li>
        <li><strong>Book Appointments:</strong> Agent can schedule appointments in your calendar</li>
        <li><strong>Answer FAQ:</strong> Agent responds to frequently asked questions</li>
        <li><strong>Urgent Routing:</strong> Route urgent calls to a human</li>
      </ul>

      <h3>Step 4: Phone Setup</h3>
      <p>Your agent will be assigned a dedicated phone number. This is the number your customers will call.</p>

      <h3>Step 5: Launch</h3>
      <p>Review your settings and activate your agent. It will immediately start handling incoming calls.</p>
    `,
  },
  {
    slug: 'phone-numbers',
    title: 'Managing Phone Numbers',
    category: 'Phone Numbers',
    order: 3,
    content: `
      <h2>Phone Numbers and Routing</h2>
      <p>CallFlow AI assigns dedicated phone numbers to each agent. Here's how to manage them.</p>

      <h3>Assigned Numbers</h3>
      <p>When you create an agent, CallFlow AI assigns a dedicated phone number. Your customers can call this number to reach your agent.</p>

      <h3>Forwarding Your Existing Number</h3>
      <p>To use your existing business phone number with CallFlow AI:</p>
      <ol>
        <li>In your phone provider's portal, set up call forwarding</li>
        <li>Forward calls to your agent's assigned CallFlow AI number</li>
        <li>Calls to your business number will now route to your agent</li>
      </ol>

      <h3>Call Routing</h3>
      <p>You can configure your agent to:</p>
      <ul>
        <li>Route urgent calls to a human support team</li>
        <li>Send specific call types to different departments</li>
        <li>Provide options for customers to choose (press 1 for appointments, etc.)</li>
      </ul>

      <h3>Multiple Agents</h3>
      <p>Create multiple agents for different purposes. Each gets its own phone number and can handle different types of calls.</p>
    `,
  },
  {
    slug: 'customizing-agent',
    title: 'Customizing Your Agent',
    category: 'Agents',
    order: 4,
    content: `
      <h2>Customizing Agent Behavior and Voice</h2>
      <p>After creating your agent, you can customize many aspects of how it behaves and sounds.</p>

      <h3>Voice Selection</h3>
      <p>Choose from multiple AI voices:</p>
      <ul>
        <li><strong>Emma:</strong> Professional female voice, great for formal businesses</li>
        <li><strong>James:</strong> Friendly male voice, good for approachable brands</li>
        <li><strong>Olivia:</strong> Warm female voice, excellent for healthcare and services</li>
        <li><strong>Michael:</strong> Professional male voice, ideal for corporate settings</li>
      </ul>

      <h3>Greeting Message</h3>
      <p>Customize the greeting your agent says when answering calls. Make it personal and on-brand. Example:</p>
      <blockquote>"Thank you for calling ABC Plumbing. This is Emma. How can I help you today?"</blockquote>

      <h3>Custom Instructions</h3>
      <p>Provide detailed instructions about how your agent should behave. For example:</p>
      <ul>
        <li>How to handle specific customer scenarios</li>
        <li>What information to collect</li>
        <li>When to transfer to a human</li>
        <li>How to handle edge cases</li>
      </ul>

      <h3>Knowledge Base</h3>
      <p>Upload your FAQ, pricing, policies, or other information. Your agent will reference this when answering questions.</p>

      <h3>Testing</h3>
      <p>Call your agent's number to test the new settings. Listen to the greeting and behavior, then adjust as needed.</p>
    `,
  },
  {
    slug: 'understanding-call-logs',
    title: 'Understanding Call Logs and Analytics',
    category: 'Calls',
    order: 5,
    content: `
      <h2>Call Logs and Analytics</h2>
      <p>Every call your agent handles is logged and analyzed. Use this data to understand performance and improve your agent.</p>

      <h3>Call Log Information</h3>
      <p>Each log entry includes:</p>
      <ul>
        <li><strong>Date & Time:</strong> When the call occurred</li>
        <li><strong>Duration:</strong> How long the call lasted</li>
        <li><strong>Caller Number:</strong> The phone number that called (if available)</li>
        <li><strong>Status:</strong> Whether the call was answered, missed, or transferred</li>
        <li><strong>Summary:</strong> AI-generated summary of the call</li>
        <li><strong>Recording:</strong> Full audio recording of the call</li>
      </ul>

      <h3>Filtering and Searching</h3>
      <p>Filter calls by:</p>
      <ul>
        <li>Date range</li>
        <li>Duration</li>
        <li>Agent</li>
        <li>Status (answered, missed, transferred)</li>
      </ul>

      <h3>Key Metrics</h3>
      <ul>
        <li><strong>Call Volume:</strong> Total calls received</li>
        <li><strong>Answer Rate:</strong> Percentage of calls answered by the agent</li>
        <li><strong>Avg Duration:</strong> Average call length</li>
        <li><strong>Transfers:</strong> Number of calls routed to a human</li>
      </ul>

      <h3>Analytics Dashboard</h3>
      <p>View charts and graphs showing call trends, busiest times, and agent performance. Use these insights to optimize your setup.</p>
    `,
  },
  {
    slug: 'billing-faq',
    title: 'Billing and Pricing FAQ',
    category: 'Billing',
    order: 6,
    content: `
      <h2>Billing and Pricing</h2>
      <p>Understand how CallFlow AI billing works.</p>

      <h3>Pricing Models</h3>
      <p>CallFlow AI offers flexible pricing:</p>
      <ul>
        <li><strong>Starter Plan:</strong> 1 agent, 100 calls/month, $29/month</li>
        <li><strong>Pro Plan:</strong> 5 agents, 1,000 calls/month, $99/month</li>
        <li><strong>Enterprise:</strong> Unlimited agents and calls, custom pricing</li>
      </ul>

      <h3>What's Included</h3>
      <ul>
        <li>AI-powered phone agent</li>
        <li>Dedicated phone number</li>
        <li>Call recordings and analytics</li>
        <li>Dashboard and call logs</li>
        <li>Email support</li>
      </ul>

      <h3>Overage Charges</h3>
      <p>If you exceed your plan's call limit, additional calls are charged at $0.05 per call.</p>

      <h3>Billing Cycle</h3>
      <p>Billing occurs monthly on your account anniversary date. You'll receive an invoice via email before each charge.</p>

      <h3>Cancellation</h3>
      <p>Cancel anytime. No setup fees or long-term contracts required. Your agent will stop handling calls immediately.</p>

      <h3>Invoice and Payment</h3>
      <p>View and download invoices from your Account Settings. We accept all major credit cards.</p>
    `,
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting Common Issues',
    category: 'Troubleshooting',
    order: 7,
    content: `
      <h2>Troubleshooting Guide</h2>
      <p>Solutions to common issues you might encounter.</p>

      <h3>Agent Not Answering Calls</h3>
      <p><strong>Problem:</strong> Customers call but the agent doesn't answer.</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Check that the agent is enabled in settings</li>
        <li>Verify your phone number is correctly set up</li>
        <li>Check your call routing configuration</li>
        <li>Ensure calls are forwarded to the correct number if using existing business number</li>
      </ul>

      <h3>Poor Call Quality</h3>
      <p><strong>Problem:</strong> Customers report unclear or robotic audio.</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Try a different voice option</li>
        <li>Check your internet connection</li>
        <li>Reduce background noise on the caller's end</li>
        <li>Contact support if issue persists</li>
      </ul>

      <h3>Agent Misunderstanding Requests</h3>
      <p><strong>Problem:</strong> Agent doesn't understand or mishandles customer requests.</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Update the agent's instructions with clearer guidelines</li>
        <li>Add more examples to the knowledge base</li>
        <li>Simplify the greeting message</li>
        <li>Review call recordings to identify patterns</li>
      </ul>

      <h3>Calls Not Being Recorded</h3>
      <p><strong>Problem:</strong> Call logs show no recording.</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Verify call recording is enabled in agent settings</li>
        <li>Check that the call was actually completed</li>
        <li>Wait a few minutes for the recording to process</li>
        <li>Check your storage quota</li>
      </ul>

      <h3>Contact Support</h3>
      <p>If you're still experiencing issues, contact our support team at support@callflow.ai or use the help chat in the dashboard.</p>
    `,
  },
  {
    slug: 'api-integration',
    title: 'API Integration Guide',
    category: 'Getting Started',
    order: 8,
    content: `
      <h2>Integrating CallFlow AI with Your Systems</h2>
      <p>Connect CallFlow AI to your existing tools and workflows via API.</p>

      <h3>Overview</h3>
      <p>The CallFlow AI API allows you to:</p>
      <ul>
        <li>Create and manage agents programmatically</li>
        <li>Retrieve call logs and analytics</li>
        <li>Update agent settings</li>
        <li>Integrate with CRM systems</li>
        <li>Build custom workflows</li>
      </ul>

      <h3>Authentication</h3>
      <p>All API requests require authentication using your API key. Include your key in the Authorization header:</p>
      <code>Authorization: Bearer YOUR_API_KEY</code>

      <h3>Base URL</h3>
      <code>https://api.callflow.ai/v1</code>

      <h3>Common Endpoints</h3>
      <ul>
        <li><code>GET /agents</code> - List your agents</li>
        <li><code>POST /agents</code> - Create a new agent</li>
        <li><code>GET /calls</code> - Retrieve call logs</li>
        <li><code>GET /analytics</code> - Get analytics data</li>
      </ul>

      <h3>Webhooks</h3>
      <p>Receive real-time notifications for events like:</p>
      <ul>
        <li>New incoming call</li>
        <li>Call completed</li>
        <li>Appointment booked</li>
      </ul>

      <h3>Rate Limiting</h3>
      <p>API calls are limited to 100 requests per minute. Plan your integrations accordingly.</p>

      <h3>Documentation</h3>
      <p>Full API documentation is available at https://docs.callflow.ai</p>
    `,
  },
  {
    slug: 'best-practices',
    title: 'Best Practices for Your AI Agent',
    category: 'Agents',
    order: 9,
    content: `
      <h2>Best Practices for Maximum Effectiveness</h2>
      <p>Get the most out of your CallFlow AI agent with these proven strategies.</p>

      <h3>Write Clear Instructions</h3>
      <p>The more detailed your agent instructions, the better it performs:</p>
      <ul>
        <li>Be specific about what the agent should and shouldn't do</li>
        <li>Provide example conversations</li>
        <li>List edge cases and how to handle them</li>
        <li>Update instructions based on actual call recordings</li>
      </ul>

      <h3>Maintain a Knowledge Base</h3>
      <p>Keep your FAQ and product information current:</p>
      <ul>
        <li>Update prices when they change</li>
        <li>Add new services to the knowledge base</li>
        <li>Remove outdated information</li>
        <li>Include links to resources for complex questions</li>
      </ul>

      <h3>Monitor Call Quality</h3>
      <p>Regularly review call logs:</p>
      <ul>
        <li>Listen to recordings of difficult calls</li>
        <li>Identify patterns in agent failures</li>
        <li>Make incremental improvements</li>
        <li>Test changes with small groups first</li>
      </ul>

      <h3>Set Expectations for Handoff</h3>
      <p>When should your agent transfer to a human?</p>
      <ul>
        <li>Define criteria for urgent calls</li>
        <li>Make sure humans are available during off-hours</li>
        <li>Have a clear message when transferring</li>
      </ul>

      <h3>Seasonal Adjustments</h3>
      <p>Update your agent for seasonal changes:</p>
      <ul>
        <li>Holiday hours and closures</li>
        <li>Seasonal promotions</li>
        <li>Peak season workflows</li>
      </ul>
    `,
  },
];

export function getArticlesByCategory(category: string): HelpArticle[] {
  return HELP_ARTICLES.filter((article) => article.category === category).sort(
    (a, b) => a.order - b.order
  );
}

export function getAllCategories(): string[] {
  const categories = new Set(HELP_ARTICLES.map((article) => article.category));
  return Array.from(categories).sort();
}

export function getArticleBySlug(slug: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((article) => article.slug === slug);
}

export function getArticleIndex(slug: string): number {
  return HELP_ARTICLES.findIndex((article) => article.slug === slug);
}

export function getPreviousArticle(slug: string): HelpArticle | undefined {
  const index = getArticleIndex(slug);
  return index > 0 ? HELP_ARTICLES[index - 1] : undefined;
}

export function getNextArticle(slug: string): HelpArticle | undefined {
  const index = getArticleIndex(slug);
  return index < HELP_ARTICLES.length - 1 ? HELP_ARTICLES[index + 1] : undefined;
}
