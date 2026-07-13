# AlphaForge AI — Multi-Agent Investment Research Platform

AlphaForge AI is an AI-powered investment research platform that analyzes publicly listed companies and generates explainable investment recommendations using a team of specialized AI analysts.

Rather than relying on a single large language model prompt, AlphaForge mimics the workflow of an institutional equity research team by delegating research tasks to multiple domain experts and aggregating their opinions through an AI Investment Committee.

---
## Project Link
* [Click here](#https://investment-research-agent-ep1t-six.vercel.app/)

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [AI Agents](#ai-agents)
* [Dashboard Features](#dashboard-features)
* [Technology Stack](#technology-stack)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Architecture](#architecture)
* [AI Architecture](#ai-architecture)
* [Design Decisions and Trade-offs](#design-decisions-and-trade-offs)
* [Example Recommendations](#example-recommendations)
* [Challenges Encountered](#challenges-encountered)
* [Future Improvements](#future-improvements)
* [AI Usage](#ai-usage)
* [License](#license)

---

## Overview

Traditional investment tools often provide little transparency into how recommendations are produced.

AlphaForge AI approaches investment research differently.

Instead of asking a single prompt:

> Should I invest in Tesla?

The platform distributes the analysis across multiple specialist AI agents:

* Business Quality Analyst
* Financial Analyst
* Risk Analyst
* Market Analyst
* News Analyst
* Investment Committee

The Investment Committee consolidates all analyst opinions and produces:

* **INVEST**
* **HOLD**
* **PASS**

Along with:

* Confidence score
* Overall rating
* Detailed investment thesis
* Supporting evidence from each analyst

---

## Features

### Research Engine

* Company search via Finnhub API
* Automatic ticker resolution
* Company profile retrieval
* Financial metrics extraction
* Recent company news retrieval
* Multi-agent AI analysis
* Final investment recommendation generation

---

## AI Agents

### Business Analyst

Evaluates:

* Business model
* Competitive advantages
* Management quality
* Scalability
* Long-term growth drivers

Outputs:

* Summary
* Strengths
* Weaknesses
* Score
* Confidence

---

### Financial Analyst

Evaluates:

* P/E Ratio
* EPS
* Revenue Growth
* Margins
* ROE
* ROA
* Liquidity metrics

Outputs:

* Summary
* Strengths
* Weaknesses
* Score
* Confidence

---

### Risk Analyst

Evaluates:

* Leadership risk
* Competitive risk
* Regulatory risk
* Market volatility
* Operational risk

Outputs:

* Summary
* Strengths
* Weaknesses
* Score
* Confidence

---

### Market Analyst

Evaluates:

* Market positioning
* Industry momentum
* Competitive landscape
* Sector outlook

Outputs:

* Summary
* Strengths
* Weaknesses
* Score
* Confidence

---

### News Analyst

Evaluates:

* Recent news events
* Media sentiment
* Market reactions
* Potential catalysts

Outputs:

* Summary
* Strengths
* Weaknesses
* Score
* Confidence

---

### Investment Committee

Aggregates all analyst outputs and produces:

* Recommendation (`INVEST`, `HOLD`, `PASS`)
* Overall score
* Confidence level
* Final investment reasoning

---

## Dashboard Features

### Company Hero Card

Displays:

* Company logo
* Ticker
* Exchange
* Industry
* Country
* Market capitalization
* IPO date

### Investment Committee Card

Displays:

* Final recommendation
* Overall score
* Confidence
* Investment thesis

### Analyst Radar Chart

Visualizes scores across:

* Business
* Financial
* Risk
* Market
* News
* Valuation

### Analyst Cards

Each analyst card includes:

* Summary
* Strengths
* Weaknesses
* Score
* Confidence

### News Timeline

Displays:

* Recent developments
* Company news
* Publication dates
* Source links

### Sources Section

Shows all external data sources used to generate the report.

### PDF Export

Generate downloadable investment reports as PDF documents.

### Research History

Stores previously generated reports locally for quick access.

### Watchlists

Users can:

* Add companies to watchlists
* Remove companies
* Re-analyze companies instantly
* View previous recommendations
* Track historical scores
* View last analysis timestamp

Watchlists are persisted using MongoDB.

---

## Technology Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Recharts

### Backend

* Next.js API Routes
* Node.js
* TypeScript

### AI Layer

* Google Gemini 2.5 Flash

### Market Data

* Finnhub API

Used for:

* Company Search
* Company Profiles
* Financial Metrics
* Company News

### Database

* MongoDB Atlas
* Mongoose

Collections:

* Reports
* Watchlists

### PDF Generation

* jsPDF
* html2canvas

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd investment-research-agent
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create:

```text
.env.local
```

Add:

```env
GEMINI_API_KEY=your_gemini_key
FINNHUB_API_KEY=your_finnhub_key
MONGODB_URI=your_mongodb_connection_string
```

### Start Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

| Variable          | Description                     |
| ----------------- | ------------------------------- |
| `GEMINI_API_KEY`  | Google Gemini API key           |
| `FINNHUB_API_KEY` | Finnhub API key                 |
| `MONGODB_URI`     | MongoDB Atlas connection string |

---

## Architecture

```text
User Input
     |
     v
Finnhub Company Search
     |
     v
Company Profile + Financial Metrics + News
     |
     v
Research Context
     |
     +-----------------------+
     |                       |
     v                       v
Business Agent         Financial Agent
Risk Agent             Market Agent
News Agent
     |
     v
Committee Agent
     |
     v
Investment Recommendation
     |
     v
Dashboard Rendering
     |
     +-----------------------+
     |                       |
MongoDB Reports      MongoDB Watchlists
```

---

## AI Architecture

AlphaForge follows a **multi-agent architecture** instead of relying on a monolithic prompt.

### Benefits

* Better separation of concerns
* Higher explainability
* Easier prompt tuning
* Improved extensibility
* Closer alignment with real-world investment workflows

---

## Design Decisions and Trade-offs

### 1. Specialized Agents Instead of One Prompt

#### Advantages

* More explainable decisions
* Easier debugging
* Modular architecture

#### Trade-off

* Higher LLM inference costs

---

### 2. Finnhub Instead of Web Scraping

#### Advantages

* Structured financial data
* Reliable APIs
* Faster response times

#### Trade-off

* Free tier limitations for international exchanges

---

### 3. MongoDB for Persistence

#### Advantages

* Flexible schema
* Rapid iteration
* Strong support for nested documents

#### Trade-off

* PostgreSQL may become preferable at scale

---

### 4. Client-side PDF Generation

#### Advantages

* Simple implementation
* No server-side rendering requirements

#### Trade-off

* Very large reports may exceed a single page

---

## Example Recommendations

### Tesla (`TSLA`)

**Recommendation:** `PASS`

Reasoning:

* Excellent business quality
* Strong market positioning
* High valuation
* Elevated leadership and execution risks

---

### Nvidia (`NVDA`)

**Recommendation:** `INVEST`

Reasoning:

* Dominant market position
* Exceptional financial performance
* Strong AI tailwinds
* Attractive long-term outlook

---

### Apple (`AAPL`)

**Recommendation:** `HOLD`

Reasoning:

* Exceptional business fundamentals
* Slower growth trajectory
* Premium valuation limits upside potential

---

## Challenges Encountered

* Gemini API rate limits
* Finnhub free tier restrictions
* MongoDB authentication issues
* Managing parallel AI requests
* Balancing response quality with API cost

---

## Future Improvements

### AI Layer

* LangGraph orchestration
* Dynamic agent routing
* Reflection agents
* Debate-style reasoning agents

### Data Layer

* Multiple financial providers
* Yahoo Finance fallback
* AlphaVantage fallback

### Infrastructure

* Redis caching
* Docker support
* Background jobs
* Queue processing

### Product Features

* Portfolio tracking
* Price alerts
* Scheduled report refresh
* Multi-user support
* Authentication
* Sector analysis
* Comparative analysis

---

## AI Usage

AI tools were extensively used throughout development for:

* System design
* Prompt engineering
* Architecture discussions
* Debugging
* UI design decisions
* Refactoring
* Error diagnosis

The project itself serves as an example of practical AI-assisted software engineering and multi-agent application design.

---

## License

This project is licensed under the MIT License unless otherwise specified.

---

## Conclusion

AlphaForge AI demonstrates how modern LLMs and financial APIs can replicate institutional equity research workflows through a transparent and explainable multi-agent architecture.

The platform prioritizes:

* Explainability
* Modularity
* Extensibility

This foundation enables future expansion into:

* Portfolio intelligence
* Autonomous monitoring
* Personalized investment research
* Agentic financial workflows

AlphaForge is not simply an AI stock picker—it is an experiment in building collaborative AI systems that reason the way professional investment teams do.
