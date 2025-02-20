#!/bin/bash

# cd into api folder
cd /api

# git fetch
git fetch && git reset origin/main --hard

# Spin docker containers down to prevent errors
docker compose -f docker-compose.yml down

# Compose docker containers back up
docker compose -f docker-compose.yml up -d --build

echo "API Re-deployed!"

# cd into projects folder
cd /portfolio

# git fetch
git fetch && git reset origin/main --hard

# Spin docker containers down to prevent errors
docker compose -f docker-compose.yml down

# Compose docker containers back up
docker compose -f docker-compose.yml up -d --build

echo "Front-end Re-deployed!"
