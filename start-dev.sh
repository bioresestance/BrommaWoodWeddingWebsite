#!/usr/bin/env bash

# Name of the tmux session
SESSION_NAME="wedding-website-dev"

# Check if the tmux session already exists
tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? != 0 ]; then
  # Start a new tmux session
  tmux new-session -d -s $SESSION_NAME

  # Split the window into two panes
  tmux split-window -h

  # Select the first pane (left) and run the server
  tmux select-pane -t 0
  tmux send-keys 'cd ./Server && ./setup.sh' C-m

  # Select the second pane (right) and run the client
  tmux select-pane -t 1
  tmux send-keys 'cd ./Client && export VITE_API_BASE_URL=http://localhost:8000 && npm run dev' C-m
fi

# Attach to the tmux session
tmux attach-session -t $SESSION_NAME