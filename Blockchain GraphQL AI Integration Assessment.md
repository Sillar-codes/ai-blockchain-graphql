# Test Assessment Document: Blockchain + GraphQL + AI Integration (with Claude Sonnet API)

## 1. Overview

Build a system that:

- Independently ingests Ethereum mainnet transactions from the last 6 months into a local Neo4j database using Python and Infura provider.
- Uses Claude Sonnet API in the Express backend to parse natural language user prompts into GraphQL queries with Retrieval-Augmented Generation (RAG).
- Executes GraphQL queries on Neo4j to analyze relationships between Ethereum addresses.
- Frontend built with React, TypeScript, and TailwindCSS.
- Backend built with Express and TypeScript.
- Includes unit testing and Github CI/CD pipeline.

---

## 2. Technical Requirements

### 2.1 Blockchain Data Ingestion (Python)

Implement a standalone Python service/script to:

- Connect to Ethereum mainnet via Infura provider.
- Fetch and save all transactions from the last 6 months.
- Store the transactions and addresses in a local Neo4j instance as nodes and relationships.
- Ensure the Python ingestion service can run independently.

### 2.2 AI-Powered Natural Language to GraphQL (Claude Sonnet API)

- Use Claude Sonnet API as the LLM model in the Express backend to parse user prompts.
- Integrate Retrieval-Augmented Generation (RAG) for improved parsing accuracy.
- Input: Natural language prompt (e.g., "Are addresses 0xA and 0xC related?" - If there are transaction from 0xA to 0xB and transaction from 0xB to 0xC, we can say "0xA and 0xC are related with each other".)
- Output: Valid GraphQL query for Neo4j.

### 2.3 GraphQL Query Processing (Express + TypeScript)

- Express backend accepts and executes GraphQL queries on Neo4j.
- Support queries to determine relationships or paths between Ethereum addresses.
- Define GraphQL schema accordingly.

---

## 3. System Architecture

- **Blockchain Data Ingestion:** Independent Python service/script that connects to Ethereum mainnet via Infura and updates Neo4j.
- **Frontend:** React + TypeScript + TailwindCSS web app for user input and results display.
- **Backend:** Express + TypeScript server integrating:
  - Claude Sonnet API client for natural language prompt parsing.
  - GraphQL query execution on Neo4j.
- **Database:** Neo4j storing Ethereum transaction graph.
- **Blockchain:** Ethereum mainnet node via Infura provider.

---

## 4. Tasks

### Task 1: Blockchain Data Ingestion (Python)

- Develop an independent Python service to ingest Ethereum mainnet transactions within the last 6 months using Infura.
- Store data in Neo4j with appropriate graph schema.
- Provide instructions for running and scheduling the ingestion service.

### Task 2: AI Natural Language to GraphQL with Claude Sonnet API (Express + TypeScript)

- Integrate Claude Sonnet API for prompt parsing within the Express backend.
- Implement RAG techniques for accuracy.
- Provide sample prompts and expected GraphQL outputs.

### Task 3: GraphQL Query Execution (Express + TypeScript)

- Define GraphQL schema and resolvers.
- Support relationship queries between Ethereum addresses.

### Task 4: Frontend Implementation (React + TypeScript + TailwindCSS)

- Build a React web app for user interaction and displaying query results.
- Ensure responsive UI using TailwindCSS.

### Task 5: Testing

- Unit tests for Express backend modules (AI parsing, GraphQL execution).
- Unit tests and integration tests for React frontend.

### Task 6: CI/CD Pipeline

- Set up Github Actions pipeline automating build, test, and deployment for Express backend, and React frontend.

---

## 5. Evaluation Criteria

- Completeness and correctness of Python blockchain ingestion service (mainnet via Infura).
- Effective integration and use of Claude Sonnet API for AI parsing.
- Correctness and performance of GraphQL queries.
- Frontend usability and responsiveness (React + TailwindCSS).
- Quality and coverage of tests (backend, frontend).
- CI/CD pipeline robustness.

---

## 6. Deliverables

- Python ingestion service code with README and instructions.
- Express + TypeScript backend codebase.
- React + TypeScript + TailwindCSS frontend codebase.
- Unit and integration tests for all components.
- CI/CD configuration.
- Sample prompts and GraphQL queries.

---

## 7. Additional Notes

- Specify Ethereum mainnet and Infura provider.
- Provide Claude Sonnet API credentials and usage instructions.
- Neo4j version and connection details.
- Guidelines for running Python ingestion service alongside Express backend and React frontend.

---

## User Prompt Examples

- Are addresses 0xA1b2... and 0xC3d4... directly connected by any transaction in the last 6 months?
- Are addresses 0xD5b1... and 0x52e0... related with each other?
- Show me all addresses that have sent ETH to 0xB5e6... in the past 3 months.
- Is there a transaction path from 0xF7a8... to 0xD9c0... within the last 6 months?
- What is the shortest path of transactions between 0x1234... and 0x5678...?
- List all transactions involving 0xE2f3... greater than 10 ETH in the last month.
- How many transactions did 0xA1b2... initiate in June 2025?
- Which addresses interacted with 0xB5e6... more than five times in the last 6 months?
- Who are the top 10 most active senders to 0xC3d4...?
- Find all addresses that are two hops away from 0xA1b2...
- Show the transaction graph for 0xF7a8... over the last 6 months.
- Show all transactions between 0xA1b2... and 0xC3d4... from May to July 2025.
- List addresses that received ETH from 0xB5e6... during September 2025.
