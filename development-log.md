
```md
# AlphaForge AI Development Log

## Project Goal

Build an AI Investment Research Agent capable of:

- Taking a company name as input
- Performing company research
- Producing an investment recommendation
- Explaining the reasoning behind the recommendation

The goal was to simulate the workflow of an institutional equity research team rather than relying on a single AI prompt.

---

# Development Philosophy

Instead of asking an LLM:

> "Should I invest in Tesla?"

I wanted to decompose the problem into multiple independent analyses similar to how real investment firms operate.

This led to a multi-agent architecture.

---

# Iteration 1: Single Prompt Approach

Initial idea:

```

Company Name
↓
Single Gemini Prompt
↓
Recommendation

```

Example prompt:

> Analyze Tesla and decide whether I should invest.

### Problems

- Difficult to understand reasoning.
- Financial analysis mixed with business analysis.
- Hard to improve individual parts.
- Limited explainability.

---

# Iteration 2: Multi-Agent Architecture

The system evolved into:

```

Business Agent
Financial Agent
Risk Agent
Market Agent
News Agent
↓
Committee Agent

````

Each agent specialized in a single task.

Benefits:

- Better explainability
- Modular prompts
- Easier debugging
- Closer to real investment workflows

---

# AI Usage During Development

AI tools were used heavily throughout development:

## Architecture Design

AI assisted in:

- Designing the multi-agent workflow
- Choosing agent responsibilities
- Defining shared context structures

---

## Prompt Engineering

Multiple prompt iterations were performed.

### Example:

Initial Financial Agent prompt:

> Analyze the company's financial health.

Improved prompt:

> You are a senior equity research analyst.
>
> Analyze:
>
> - Revenue growth
> - Profitability
> - Margins
> - Capital efficiency
> - Liquidity
> - Valuation concerns
>
> Return:
>
> - Summary
> - Strengths
> - Weaknesses
> - Score (0-10)
> - Confidence (0-100)

This produced significantly more structured and reliable outputs.

---

## Debugging Assistance

AI assisted with debugging:

- MongoDB authentication failures
- Next.js API route issues
- Promise.all failures
- TypeScript errors
- React state synchronization issues
- PDF export problems

---

## UI Iteration

The UI evolved through several stages.

### Version 1

Simple search input and plain text output.

### Version 2

Card-based dashboard layout.

### Version 3

Institutional-style dashboard including:

- Company hero section
- Committee recommendation
- Analyst cards
- Radar chart
- News timeline
- Sources panel
- Watchlist sidebar

---

# Major Technical Decisions

## Decision 1

### Multi-Agent System

Chosen instead of a monolithic prompt.

Advantages:

- Explainability
- Modularity
- Better prompt isolation

Tradeoff:

- Higher LLM cost.

---

## Decision 2

### Finnhub API

Chosen for:

- Company profile data
- Financial metrics
- Company news

Advantages:

- Structured financial data
- Simple API integration

Tradeoff:

- International ticker limitations in free tier.

---

## Decision 3

### MongoDB

Chosen for:

- Watchlists
- Report persistence

Advantages:

- Flexible schema
- Rapid iteration

Tradeoff:

- Less strict structure than relational databases.

---

## Decision 4

### Parallel Agent Execution

Implemented using:

```ts
Promise.allSettled()
````

Advantages:

* Faster responses
* Partial failure recovery

Tradeoff:

* Increased LLM concurrency
* Higher API usage

---

# Challenges Encountered

## Gemini Rate Limits

Gemini free tier limits quickly became a bottleneck.

Initial architecture:

* Business Agent
* Financial Agent
* Risk Agent
* Market Agent
* News Agent
* Committee Agent

Result:

* 6 LLM requests per company analysis.

Future optimization:

* Merge related agents into fewer calls.

---

## MongoDB Authentication

Encountered:

```
MongoServerError:
bad auth : authentication failed
```

Cause:

* Placeholder password remained in connection string.

Resolution:

* Reconfigured Atlas credentials.

---

## Finnhub Limitations

Some international tickers produced:

```
403 Forbidden
```

Examples:

* Samsung Electronics

Planned solution:

* Add Yahoo Finance fallback provider.

---

# Features Added Beyond Requirements

The assignment required:

* Company analysis
* Investment decision

Additional features implemented:

* Multi-agent architecture
* Watchlists
* Research history
* PDF export
* Radar visualization
* News timeline
* Source tracking
* MongoDB persistence

---

# Future Improvements

Given additional time I would implement:

* LangGraph orchestration
* Dynamic agent routing
* Redis caching
* Multiple financial data providers
* Portfolio tracking
* Price alerts
* Scheduled report refresh
* Authentication and user accounts

---

# Final Reflection

The most important insight from this project was that AI systems benefit significantly from decomposition.

Breaking a complex investment decision into specialized agents produced outputs that were more explainable, easier to improve, and more aligned with real-world investment workflows than a single large prompt.

```

---

This document hits exactly what Altuni AI Labs is looking for:

- AI-first development process
- Engineering thinking
- Iterative design
- Prompt engineering
- Trade-off awareness
- Practical use of AI in software development

This is significantly stronger than simply attaching raw chat logs.
```
