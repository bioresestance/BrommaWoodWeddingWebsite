#!/usr/bin/env bash

# Install the dependencies
uv sync

# Start the docker compose file
docker compose -f compose.dev.yaml pull
docker compose -f compose.dev.yaml up -d

uv run uvicorn app.main:app --reload --no-access-log