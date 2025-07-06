# Base image for all environments
FROM node:16-alpine AS build
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

# Accept build argument to set environment
ARG REACT_APP_ENV=dev
ENV REACT_APP_ENV=${REACT_APP_ENV}

# Install dependencies
COPY package.json /app/
COPY package-lock.json* /app/

# Fix dependency issues
RUN npm install --legacy-peer-deps
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

# Copy the appropriate nginx config based on environment
COPY ./nginx/nginx-${REACT_APP_ENV}.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
