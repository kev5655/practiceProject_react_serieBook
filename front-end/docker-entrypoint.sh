#!/bin/sh

# Generate runtime environment configuration
echo "Generating runtime environment configuration..."

# Create a temporary file with environment variables substituted
envsubst < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp
# Move the temporary file back to the original location
mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf

# Create an environment variables script that will be injected into index.html
cat > /usr/share/nginx/html/env-config.js << EOF
window.API_URL = '${REACT_APP_API_URL}';
EOF

echo "Starting Nginx..."
exec nginx -g 'daemon off;'
