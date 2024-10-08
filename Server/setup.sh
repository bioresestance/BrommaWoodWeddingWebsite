#!/bin/fish

# Create a virtual environment
python3 -m venv env

# Activate the virtual environment
source env/bin/activate.fish

# Install the requirements
pip3 install -r requirements.txt

# Start the docker compose file
docker compose pull -f compose.dev.yml
docker compose up -d -f compose.dev.yml

uvicorn app.main:app --reload