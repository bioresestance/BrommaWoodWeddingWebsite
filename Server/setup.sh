#!/bin/bash

# Create a virtual environment
python3 -m venv env

# Activate the virtual environment
# Check if the shell is Fish or Bash
if [ "$SHELL" = "/usr/bin/fish" ]; then
    source env/bin/activate.fish
else
    source env/bin/activate
fi

# Install the requirements
pip3 install -r requirements.txt