# Backend — Environment variables

This document describes how to provide environment variables for local development and production deployments.

## Overview

Create a `.env` file in the `backend/` directory that contains all environment variables the application needs. Spring
will resolve values referenced in `application-prod.yml` (for production) from the environment. Keep secrets out
of source control.

### Development example

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Then edit `.env` with your actual configuration values.

## PostgreSQL Database

Use the provided Docker Compose setup to run PostgreSQL locally before starting the application.

- Compose file location: `./docker-compose.yml`
- Service name: `postgres`
- Exposed port: `5433` (container `5432` → host `5433`)
- Default credentials and DB (match `application-dev.yml`):
  - Database: `health-app-db`
  - Username: `dev-user`
  - Password: `dev-password`

Prerequisites: Docker Desktop installed and running.

Start the database (from repository root):

```bash
docker compose up -d
```

Stop/clean up:
- Stop service: `docker compose stop postgres`
- Stop and remove: `docker compose down`
- Remove containers and persistent volume: `docker compose down -v` (this deletes local DB data)

## Flyway Database Migrations

Schema changes are managed with Flyway. Migrations are applied automatically at application startup.

- Migration directory: `backend/src/main/resources/db/migration`
- File naming convention: `V{version}__{description}.sql` (e.g., `V2__add_user_index.sql`)
  - Use an incremented integer `version` (1, 2, 3, …)
  - Use lowercase, underscore-separated `description`
- Existing baseline: `V1__create_users_table.sql`

When to create a migration:
- Any change to the database schema
- Data corrections that must run once per environment

How to add a new migration:
1. Determine the next version number (e.g., if latest is `V3`, create `V4__...`).
2. Create a new `.sql` file in `backend/src/main/resources/db/migration` following the naming convention.
3. Add the required SQL statements (DDL/DML). **Avoid modifying already-applied migration files.**
4. Ensure the local PostgreSQL service is running (see "PostgreSQL Database" above).
5. Start the application; Flyway will apply pending migrations automatically.

## Gemini API Configuration

The application uses Google's Gemini API for AI-powered health recommendations.

### Obtaining a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file as `GEMINI_API_KEY`

### Gemini Environment Variables

Configure the following variables in your `.env` file:

- `GEMINI_API_KEY` — Your Google AI Studio API key (required)
- `GEMINI_API_VERSION` — API version to use (default: `v1beta`)
- `GEMINI_MODEL` — Model name (default: `gemini-2.0-flash`)
- `GEMINI_TEMPERATURE` — Controls randomness, 0.0-1.0 (default: `0.2`)
- `GEMINI_TOP_P` — Nucleus sampling parameter (default: `0.95`)
- `GEMINI_MAX_OUTPUT_TOKENS` — Maximum response length (default: `2048`)
- `GEMINI_TIMEOUT_MS` — Request timeout in milliseconds (default: `30000`)
- `GEMINI_SYSTEM_INSTRUCTION` — System prompt for health advisor behavior

See `.env.example` for a complete configuration template.

**Note**: Keep your API key secure and never commit it to version control.

## Loading the `.env` locally (macOS / zsh)

To load variables from `.env` into your current shell session before running the backend:

1. In `zsh`:

```bash
source backend/.env
```

2. Start the PostgreSQL database (from repo root):

```bash
docker compose up -d postgres
```

3. Then run the application (from repo root):

```bash
cd backend
./mvnw spring-boot:run
```
