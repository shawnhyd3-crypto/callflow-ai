# Investor Metrics Dashboard + Pitch Materials (Draft)

> Scope: AI phone agent business (callflow-ai). This is a working draft with explicit assumptions. Replace placeholders with real data as it becomes available.

---

## 1) Investor Metrics Dashboard (single‑page view)

### Core Growth
- **MRR** = Sum of active customer monthly subscription fees + usage margins.
- **ARR** = MRR × 12.
- **Customer Count** = # of active paying logos.
- **ARPA (Average Revenue Per Account)** = MRR / Active customers.

### Retention & Churn
- **Gross Revenue Retention (GRR)** = (Starting MRR − Churned MRR) / Starting MRR.
- **Net Revenue Retention (NRR)** = (Starting MRR − Churned MRR + Expansion MRR) / Starting MRR.
- **Logo Churn** = Churned customers / Starting customers.
- **Revenue Churn** = Churned MRR / Starting MRR.

### Unit Economics
- **Gross Margin** = (Revenue − COGS) / Revenue.
- **CAC (Customer Acquisition Cost)** = Sales + Marketing spend / New customers.
- **LTV (Lifetime Value)** = ARPA × Gross Margin × (1 / Monthly Revenue Churn).
- **LTV:CAC** = LTV / CAC.
- **Payback Period (months)** = CAC / Gross Margin per month.

### Efficiency
- **Burn Rate** = Monthly cash outflows − inflows.
- **Runway (months)** = Cash on hand / Burn rate.
- **Magic Number** = (Current Qtr Net New ARR × 4) / Prior Qtr S&M spend.

### Product / Ops
- **Call Volume** = # calls handled per month.
- **Containment Rate** = % calls resolved without human transfer.
- **Automation Savings** = (Avg human minutes saved × blended hourly rate).
- **CSAT / NPS** = survey results.

### Suggested Dashboard Layout (one page)
1) Headline numbers: MRR, ARR, Customers, NRR, Burn, Runway
2) Trend charts (12 months): MRR, Customers, NRR/GRR
3) Unit economics block: CAC, LTV, LTV:CAC, Payback
4) Product metrics: Call volume, containment, CSAT

---

## 2) Pitch Deck Outline (10–12 slides)

1) **Title** – Callflow AI: AI Phone Agents for SMBs
2) **Problem** – SMBs miss calls / high labor costs / low after-hours coverage
3) **Solution** – AI phone agent handles inbound/outbound; integrates with CRM
4) **Market** – TAM/SAM/SOM (see section 3)
5) **Product** – Live demo flow + integrations (Retell, Twilio, CRM)
6) **Traction** – pilots, MRR, usage, retention, logos
7) **Business Model** – subscription + usage + setup
8) **Go‑to‑Market** – verticals: home services, med spa, dental, trades
9) **Competition** – call center BPOs, voice‑AI startups, in‑house hiring
10) **Moat** – vertical playbooks, data, integrations, GTM partnerships
11) **Financials** – revenue projections + unit economics
12) **Ask** – fundraising/partnering, use of funds

---

## 3) TAM / SAM / SOM (working model)

> **Assumptions (replace w/ validated numbers):**
> - Market size ranges from public reports for voice‑AI agents and call center AI.
> - We model AI phone agents as a subset of call center AI / voice AI agent markets.

### Market Size Inputs (range-based)
- **Voice AI agents market**: ~**$2.4B (2024)**, high growth (~35% CAGR to 2034).
- **Call center AI market**: **$2–20B (2024)** depending on source.
- **North America share**: ~40% (typical for enterprise SaaS).

### TAM (global)
- **TAM (global voice AI agents)**: $2.4B (2024) → $3.2B (2025 est.).

### SAM (North America)
- **SAM (NA ~40%)**: $1.0B (2024) → $1.3B (2025 est.).

### SOM (initial 3–5 years)
- **SOM (1–3% of SAM)**: $10–40M annual revenue potential.

> These numbers should be verified with sources (e.g., ResearchAndMarkets, MarketsandMarkets, MRFR) before external use.

---

## 4) Comparable Companies & Valuation Ranges (directional)

> Public valuation data for early‑stage voice‑AI startups is limited. Use SaaS revenue multiples + recent funding rounds for comps.

### Comparable Types
- **Voice AI / Call automation**: Retell AI, Bland AI, Air.ai, PolyAI, Cresta (enterprise call QA), Observe.AI
- **Contact center platforms**: Five9, NICE, Genesys (public comps for valuation multiples)

### Directional SaaS Multiples (private market, 2024–2025)
- **Early‑stage high growth**: **8–15× ARR**
- **Mid‑stage**: **6–10× ARR**
- **Public comps**: **4–7× ARR** (depends on growth + margins)

> Use these multiples alongside growth rate, NRR, and gross margin to triangulate.

---

## 5) Revenue Projections (simple model)

### Assumptions
- **ARPA**: $500–$2,000 / month (subscription + usage)
- **Gross margin**: 65–80% (depends on telco/LLM costs)
- **Churn**: 2–6% monthly

### 3‑Year Example (fill with real pipeline)
| Year | Customers | ARPA/mo | ARR | Notes |
|------|-----------|---------|-----|------|
| Y1 | 25 | $1,000 | $300k | pilots + referrals |
| Y2 | 100 | $1,200 | $1.44M | vertical GTM |
| Y3 | 300 | $1,500 | $5.4M | scale channels |

---

## 6) Next Steps
1) Validate market size with 2–3 reputable sources.
2) Populate dashboard with live metrics (Stripe + CRM + product usage).
3) Draft full pitch deck slides (Google Slides) using this outline.
4) Add 3–5 customer case studies and ROI numbers.

