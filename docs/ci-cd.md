# CI/CD Workflow

This document explains the CI/CD workflow for the terminal portfolio website.

## Overview

The project uses GitHub Actions for continuous integration and continuous deployment. There are two main workflows:

1. **PR Build Validation** - Runs on pull requests to the `master` branch
2. **Docker Build and Push** - Runs on pushes to the `master` branch and when tags are created

## PR Build Validation

The PR Build Validation workflow (`pr-build.yml`) runs whenever a pull request is created or updated against the `master` branch. It performs the following steps:

1. **Lint and Test**:

   - Checks out the code
   - Sets up Node.js
   - Installs dependencies
   - Runs linting

2. **Build**:
   - Builds the Docker image to ensure it can be built successfully
   - Does not push the image to any registry

This workflow ensures that all code changes meet the project's quality standards and can be built successfully before being merged into the `master` branch.

## Docker Build and Push

The Docker Build and Push workflow (`docker-build-push.yml`) runs whenever changes are pushed to the `master` branch or when a tag is created. It performs the following steps:

1. **Build and Push**:
   - Checks out the code
   - Sets up Docker Buildx
   - Logs in to the GitHub Container Registry (GHCR)
   - Builds the Docker image
   - Pushes the image to GHCR with appropriate tags

### Docker Image Tags

The Docker images are tagged with:

- `latest` - For the most recent build from the `master` branch
- `sha-<commit>` - Tagged with the short commit SHA for version tracking
- `v*` - When a tag is created (e.g., `v1.0.0`)

### GitHub Container Registry

The Docker images are pushed to GitHub Container Registry (GHCR) with the repository name converted to lowercase for compatibility. The images can be pulled using:

```bash
docker pull ghcr.io/mateuszrogalski/terminal-portfolio:latest
# or
docker pull ghcr.io/mateuszrogalski/terminal-portfolio:sha-abc1234
# or
docker pull ghcr.io/mateuszrogalski/terminal-portfolio:v1.0.0
```

## Workflow Files

- `.github/workflows/pr-build.yml` - PR Build Validation workflow
- `.github/workflows/docker-build-push.yml` - Docker Build and Push workflow
