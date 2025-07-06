#!/bin/sh

# Generate runtime environment configuration
echo "Generating runtime environment configuration..."

# Replace environment variables in runtime-env.js by updating the file directly
envsubst < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

echo "Starting Nginx..."
exec nginx -g 'daemon off;'
