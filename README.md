# RapidRoude — Global Trade Graph & Supply Chain Risk Analysis Platform

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-blue.svg" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-green.svg" />
  <img src="https://img.shields.io/badge/React-18-61DAFB.svg" />
  <img src="https://img.shields.io/badge/C++17-Algorithms-orange.svg" />
  <img src="https://img.shields.io/badge/TailwindCSS-v3-38BDF8.svg" />
</p>

## Overview

RapidRoude is a graph-driven global trade analysis platform designed to model and simulate international cargo movement through real-world seaports and airports.

The system helps logistics analysts, risk managers, and supply chain planners identify critical trade chokepoints, analyze operational risk, simulate disruptions, and generate optimized alternative routes using graph algorithms and risk-aware pathfinding.

The project combines:

- **Python + FastAPI** for backend APIs and graph orchestration
- **C++17** for high-performance graph algorithms
- **React 18 + Cytoscape.js** for interactive network visualization
- **Tailwind CSS** for modern UI styling

---

## Live Demo

🌐 **Project Link:**  
[RapidRoude Live Demo](https://rapidroude.lovable.app?utm_source=chatgpt.com)

---

# Core Features

## Global Trade Graph

- Models international trade routes as a weighted graph
- Uses:
  - **Seaports** identified by **UN/LOCODE**
  - **Airports** identified by **IATA**
- Edge weights include:
  - Transit cost
  - Estimated time
  - Traffic volume

---

## Critical Infrastructure Detection

Identifies vulnerable nodes and routes using graph theory algorithms:

- Betweenness Centrality
- Degree Centrality
- Bridge Detection
- Articulation Point Analysis

This helps detect:

- Major logistics chokepoints
- Single points of failure
- Fragile trade corridors

---

## Operational Risk Scoring

Each node and route receives a composite risk score based on:

- Congestion exposure
- Geopolitical instability
- Weather vulnerability
- Network dependency

Risk scores allow planners to compare resilient vs. high-risk routes.

---

## Disruption Simulation & Re-routing

Users can:

- Mark ports or airports as disrupted
- Simulate route failures
- Generate optimized fallback routes

Algorithms used:

- Dijkstra’s Shortest Path
- Greedy Route Recovery
- Weighted Multi-factor Path Selection

---

## Blockchain-style Audit Logging

RapidRoude includes a lightweight conceptual blockchain-inspired architecture for:

- Tamper-evident route decision tracking
- Immutable logistics audit history
- Compliance and operational transparency

> Note: The blockchain component exists at the architectural/documentation level only and is not implemented as a runtime system.

---

# Tech Stack

## Backend

| Technology | Purpose |
|---|---|
| Python 3.11+ | Backend orchestration |
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| NetworkX | Graph construction & analysis |
| Pydantic | Validation & schemas |

---

## High Performance Algorithms

| Technology | Purpose |
|---|---|
| C++17 | Performance-critical graph algorithms |
| pybind11 / ctypes | Python ↔ C++ interoperability |

Implemented algorithms include:

- Dijkstra’s Algorithm
- Betweenness Centrality
- Articulation Point Detection

---

## Frontend

| Technology | Purpose |
|---|---|
| React 18 | SPA frontend |
| Tailwind CSS v3 | Styling |
| Cytoscape.js | Graph visualization |
| Recharts | Risk analytics charts |
| Axios | API communication |
| React Query | Server state management |

---

# System Architecture

```text
Frontend (React + Cytoscape)
        │
        ▼
REST API (/api/v1/)
        │
        ▼
FastAPI Backend
        │
 ┌──────┴──────┐
 ▼             ▼
Python Graph   C++ Algorithms
Logic          (shared libraries)



