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

### Environment Variables

The application uses environment variables for configuration. You can set these in a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file with your values
nano .env
```

**Key Environment Variables:**

| Variable                     | Description                  | Example                                |
| ---------------------------- | ---------------------------- | -------------------------------------- |
| `IMAGE_TAG`                  | Docker image tag to use      | `latest`, `1.0.0`                      |
| `SPRING_DATASOURCE_URL`      | Database connection URL      | `jdbc:mysql://mysqldb:3306/serie_book` |
| `SPRING_DATASOURCE_USERNAME` | Database username            | `web`                                  |
| `SPRING_DATASOURCE_PASSWORD` | Database password            | `yourpassword`                         |
| `MYSQL_ROOT_PASSWORD`        | MySQL root password          | `rootpassword`                         |
| `HMAC256_KEY`                | Secret key for JWT signing   | `32byteshexstring`                     |
| `REACT_APP_API_URL`          | Backend API URL for frontend | `http://localhost:8081`                |

To deploy with your environment variables:

```bash
# Start with environment variables
docker-compose --env-file .env up -d
```

### Starting the Application with Environment Files

#### Development Environment

```bash
# Start development environment with the default .env file
docker-compose --env-file .env up -d

# Start development environment with a specific environment file
docker-compose --env-file .env.dev up -d

# Start with a specific version tag
IMAGE_TAG=1.0.8 docker-compose --env-file .env up -d

# Start in detached mode (-d) or interactive mode
docker-compose --env-file .env up       # Interactive with logs
docker-compose --env-file .env up -d    # Detached mode (background)
```

#### Production Environment

```bash
# Start production environment with the production environment file
docker-compose -f docker-compose-prod.yml --env-file .env.prod up -d

# Start production with a specific version tag
IMAGE_TAG=1.0.8 docker-compose -f docker-compose-prod.yml --env-file .env.prod up -d
```

#### Stopping the Application

```bash
# Stop development environment
docker-compose down

# Stop production environment
docker-compose -f docker-compose-prod.yml down

# Stop and remove volumes (will delete database data)
docker-compose down -v
```

### Development Environment (Manual Setup)

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
# 1. Create a production .env file
cp .env.example .env.prod
nano .env.prod  # Edit with production values

# 2. Run using the production compose file with environment variables
docker-compose -f docker-compose-prod.yml --env-file .env.prod up -d

# For a specific version (e.g. v1.0.8)
IMAGE_TAG=1.0.8 docker-compose -f docker-compose-prod.yml --env-file .env.prod up -d

# On server
sudo docker-compose -f docker-compose-prod.yml --env-file .env.prod up -d
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

## 🔧 Troubleshooting

### Database Connection Issues

If you encounter database connection issues, try these steps:

```bash
# 1. Check if containers are running
docker ps

# 2. Check the Spring Boot logs
docker logs $(docker ps -qf "name=serie_book_backend")

# 3. Check MySQL logs
docker logs $(docker ps -qf "name=mysqldb")

# 4. Restart the containers with proper waiting for MySQL
docker-compose down
docker-compose -f docker-compose-debug.yml up -d
```