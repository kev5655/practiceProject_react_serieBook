# Base image for all environments
FROM node:24-alpine AS build
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

# Accept build argument to set environment
ARG REACT_APP_ENV=dev
ENV REACT_APP_ENV=${REACT_APP_ENV}

# Install dependencies
COPY package.json /app/
COPY package-lock.json* /app/

# Fix dependency issues
RUN npm ci
# Install react-scripts globally
RUN npm install -g react-scripts@5.0.1

# Copy source code
COPY . /app

# Build the application
RUN npm run build

# Production environment with Nginx
FROM nginx:1.29-alpine
# Copy built app
COPY --from=build /app/build /usr/share/nginx/html

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Use different nginx config based on environment
ARG REACT_APP_ENV=dev
ENV REACT_APP_ENV=${REACT_APP_ENV}
ARG REACT_APP_API_URL=http://localhost:8081
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Copy the appropriate nginx config based on environment
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy and set permissions for the entrypoint script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# Install envsubst utility
RUN apk add --no-cache gettext

EXPOSE 3000

# Use the entrypoint script to inject environment variables at runtime
CMD ["/docker-entrypoint.sh"]
