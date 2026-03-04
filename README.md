# EECS 4413 E-Commerce Project

An online e-store built with React, FastAPI, PostgreSQL, and Nginx.

## Tech Stack

| Layer          | Technology                  |
|----------------|-----------------------------|
| Frontend       | React + TypeScript (Vite)   |
| Backend        | Python FastAPI              |
| Database       | PostgreSQL 16               |
| Reverse Proxy  | Nginx                       |
| Containerization | Docker & Docker Compose   |

## Project Structure

```
├── frontend/          React SPA (Vite + TypeScript)
├── backend/           FastAPI REST API
├── nginx/             Reverse proxy configuration
├── docker-compose.yml Service orchestration
└── .env.example       Environment variable template
```

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- Node.js 20+ (for local frontend development)
- Python 3.11+ (for local backend development)

### Quick Start (Docker)

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Build and start all services
docker compose up --build

# 3. Visit the app
open http://localhost
```

### Local Development

**Backend:**

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs available at http://localhost:8000/docs

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Dev server at http://localhost:5173

## Architecture

The application follows **MVC + DAO** patterns:

- **Model** — SQLAlchemy ORM models + Pydantic schemas
- **View** — React frontend components
- **Controller** — FastAPI route handlers
- **DAO** — Repository classes abstracting database access
- **Service Layer** — Business logic between controllers and DAOs

## Team

EECS 4413 TOM — Winter 2026
Members: 
Mohammad Omer Khan - 219189729, 
Thor Laski -217279928,
Mame Mor - 218666206,
Amraj Randhawa - 219554963

