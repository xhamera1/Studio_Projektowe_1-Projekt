# Backend — Environment variables

This document describes how to provide environment variables for local development and production deployments.

## Overview

Create a `.env` file in the `backend/` directory that contains all environment variables the application needs. Spring
will resolve values referenced in `application-prod.properties` (for production) from the environment. Keep secrets out
of source control.

### Development example

```
PORT=8080
DATABASE_URL=jdbc:h2:mem:healthappdb
DATABASE_USERNAME=sa
DATABASE_PASSWORD=
CORS_ALLOWED_ORIGINS=http://localhost:5173
SECURITY_JWT_SECRET_KEY=replace_with_a_secure_random_value
SECURITY_JWT_EXPIRATION_TIME=1075200000
```

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
