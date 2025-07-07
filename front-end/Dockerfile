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

# Use different nginx config based on environment
ARG REACT_APP_ENV=dev
ENV REACT_APP_ENV=${REACT_APP_ENV}
ARG REACT_APP_API_URL=http://localhost:8081
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf
RUN apk add --no-cache gettext

# Copy built app
COPY --from=build /app/build /usr/share/nginx/html
# Copy the appropriate nginx config based on environment
COPY ./nginx/nginx.conf.template \
     /etc/nginx/conf.d/default.conf.template

EXPOSE 3000

CMD ["sh", "-c", \
  "envsubst '${REACT_APP_API_URL}' \
    < /etc/nginx/conf.d/default.conf.template \
    > /etc/nginx/conf.d/default.conf \
   && exec nginx -g 'daemon off;'"]
