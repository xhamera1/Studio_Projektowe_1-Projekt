# Backend — Environment variables

This document describes how to provide environment variables for local development and production deployments.

## Overview

Create a `.env` file in the `backend/` directory that contains all environment variables the application needs. Spring
will resolve values referenced in `application-prod.properties` (for production) from the environment. Keep secrets out
of source control.

### Development example

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Then edit `.env` with your actual configuration values.

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

2. Then run the application (from repo root):

```bash
cd backend
./mvnw spring-boot:run
```

## Security

- Never commit secrets (JWT keys, DB passwords) to the repository.
- Rotate JWT secret keys if they are accidentally exposed.
