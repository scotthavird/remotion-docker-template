#!/bin/bash

# Build and Push Docker Image to GitHub Container Registry
# Usage: ./scripts/build-and-push.sh [tag]

set -e

# Get the repository name from git
REPO_NAME=$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\/[^/]*\).*/\1/')
REGISTRY="ghcr.io"
IMAGE_NAME="$REGISTRY/$REPO_NAME"

# Get tag from argument or use 'latest'
TAG=${1:-latest}

echo "Building Docker image..."
echo "Repository: $REPO_NAME"
echo "Image: $IMAGE_NAME:$TAG"

# Build the image
docker build -t "$IMAGE_NAME:$TAG" .

echo "✅ Docker image built successfully!"

# Check if user wants to push
read -p "Do you want to push the image to GitHub Container Registry? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Pushing image to $IMAGE_NAME:$TAG..."
    
    # Login to GitHub Container Registry
    echo "Please login to GitHub Container Registry..."
    echo "Username: your-github-username"
    echo "Password: use a GitHub Personal Access Token with 'write:packages' permission"
    docker login $REGISTRY
    
    # Push the image
    docker push "$IMAGE_NAME:$TAG"
    
    echo "✅ Image pushed successfully!"
    echo "Image available at: https://github.com/$REPO_NAME/packages"
else
    echo "Image built but not pushed."
    echo "To push later, run: docker push $IMAGE_NAME:$TAG"
fi 