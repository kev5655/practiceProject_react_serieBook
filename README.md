# 📺 Serie Book

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/kevin5655/serie-book/docker-build-push.yml?branch=main)
![Docker Image Version](https://img.shields.io/docker/v/kevin5655/seriebook-app-server?label=Docker%20Image)

## 📝 Description

Serie Book is a full-stack application built with Java Spring Boot and React. It allows users to track TV series they've watched, with the data stored in a MySQL database.

Each user can:
- Create a personal account
- Save and manage their series collection
- Stay logged in via JSON Web Token authentication

## ⚠️ Prerequisites

Before you begin, ensure you have the following:

- Java 11+ installed
- Node.js and npm installed
- MySQL database server
- Docker and Docker Compose (for containerized deployment)

## 🔐 Security Configuration

> **IMPORTANT**: For the project to work properly, you need to:
> - Configure security settings
> - Adjust the application.properties files in the Spring Backend
> - For security configuration details, please contact the repository owner

## 🚀 Installation & Setup

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd ./front-end

# Install dependencies
npm install
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd ./back-end

# Build the project
./mvnw clean install
```

## 🏃 Running Locally

### Running the Backend

```bash
# Navigate to backend directory
cd ./back-end

# Update Spring profile in application.properties
# spring.profiles.active=dev

# Run the Spring Boot application
./mvnw spring-boot:run
```

### Running the Frontend

```bash
# Navigate to frontend directory
cd ./front-end

# Start the development server
npm start
```

## 🐳 Docker Deployment

### Development Environment

```bash
# 1. Set Spring profile to dev in application.properties
# spring.profiles.active=dev

# 2. Package the Java application
cd ./back-end
mvn package -DskipTests=true

# 3. Start the Docker containers
cd ..
docker-compose up --build

# One-liner for build and start
mvn clean package -DskipTests=true && docker-compose up --build

# On server
sudo docker-compose up --build
```

### Production Environment

```bash
# 1. Set Spring profile to prod in application.properties
# spring.profiles.active=prod

# 2. Package the Java application
cd ./back-end
mvn package -DskipTests=true

# 3. Build and run with production configuration
cd ..
docker-compose -f docker-compose-prod.yml up --build

# 4. Tag and push images to Docker Hub (if needed)
docker tag <image-id> kevin5655/seriebook-app-client:1.0.0
docker tag <image-id> kevin5655/seriebook-app-server:1.0.0
docker push kevin5655/seriebook-app-client:1.0.0
docker push kevin5655/seriebook-app-server:1.0.0

# On server
sudo docker-compose -f docker-compose-prod.yml up --build
```

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

- Pushes to `main`: Build and deploy to Docker Hub with the `latest` tag
- New releases: Build and deploy with the release version number as tag

## 📚 Technologies

- **Backend**: Java Spring Boot, Spring Security, JPA/Hibernate
- **Frontend**: React, Redux, Material-UI
- **Database**: MySQL
- **DevOps**: Docker, GitHub Actions
- **Authentication**: JWT (JSON Web Tokens)