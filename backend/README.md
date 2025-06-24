# Backend Structure

## Overview
This backend uses Express and is now organized using best practices for scalability and maintainability. All API endpoints remain unchanged.

## Structure

- `server.js` — Main entry point, sets up Express and mounts routes.
- `routes/` — Route definitions for each API endpoint.
- `controllers/` — Business logic for each endpoint.
- `utils/` — Shared configuration and utility functions.

## Adding New Endpoints
1. Create a new controller in `controllers/`.
2. Add a new route in `routes/` that uses the controller.
3. Mount the new route in `server.js`.

## Existing Endpoints
- `POST /api/search` — Search OpenSearch.
- `GET /api/fields` — Get all available fields for top* indices.

## Configuration
- Edit `utils/config.js` to change OpenSearch connection details. 