#!/bin/sh
# sed JS and CSS only
find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|PLACEHOLDER_BASE_URL|${VITE_API_BASE_URL}|g" '{}' +