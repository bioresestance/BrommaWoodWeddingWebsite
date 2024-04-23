#!/bin/bash

# Install Git and OpenSSH
apt-get update && apt-get install -y git openssh-client

# Set up Git
git config --global core.sshCommand "ssh -o IdentitiesOnly=yes"
git config --global user.email "36652096+bioresestance@users.noreply.github.com"
git config --global user.name "bioresestance"

# Install Python dependencies
pip install -r Server/requirements.txt

# Install Node dependencies
# npm install --prefix frontend/