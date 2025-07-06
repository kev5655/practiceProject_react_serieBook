# Base image for all environments
FROM node:14-alpine3.16 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Accept build argument to set environment
ARG REACT_APP_ENV=dev
ENV REACT_APP_ENV=${REACT_APP_ENV}

# Install dependencies
COPY package.json /app/package.json
COPY package-lock.json* /app/package-lock.json*
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

# Copy source code
COPY . /app

# Build the application
RUN npm run build

# Production environment with Nginx
FROM nginx:1.16.0-alpine
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
