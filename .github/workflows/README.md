# GitHub Actions for Docker Deployment

This repository includes GitHub Actions workflows to build and push Docker images to Docker Hub.

## Setting up GitHub Actions Secrets

Before the workflow can push to Docker Hub, you need to add the following secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:
   - `DOCKER_USERNAME` - Your Docker Hub username
   - `DOCKER_TOKEN` - Your Docker Hub access token (not your password)

## Creating a Docker Hub Access Token

To create a Docker Hub access token:

1. Login to [Docker Hub](https://hub.docker.com)
2. Click on your username in the top-right and select "Account Settings"
3. Navigate to "Security" > "Access Tokens"
4. Click "New Access Token"
5. Give your token a description (e.g., "GitHub Actions")
6. Select the appropriate permissions (at minimum, "Read & Write")
7. Copy the token immediately - you won't be able to see it again!
8. Use this token as the `DOCKER_TOKEN` secret in GitHub
