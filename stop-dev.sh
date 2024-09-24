#!/bin/bash

# Name of the tmux session
SESSION_NAME="wedding-website-dev"

# Kill the tmux session
tmux kill-session -t $SESSION_NAME