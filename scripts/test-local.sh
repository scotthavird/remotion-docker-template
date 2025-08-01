#!/bin/bash

# Test Local Docker Container
# Usage: ./scripts/test-local.sh [title] [subtitle] [content_header] [outro_message]

set -e

# Get the repository name from git
REPO_NAME=$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\/[^/]*\).*/\1/')
REGISTRY="ghcr.io"
IMAGE_NAME="$REGISTRY/$REPO_NAME"

# Default values
TITLE=${1:-"Hello World"}
SUBTITLE=${2:-"Welcome to Remotion"}
CONTENT_HEADER=${3:-"Discover More"}
OUTRO_MESSAGE=${4:-"Thank You!"}

echo "Testing Docker container locally..."
echo "Title: $TITLE"
echo "Subtitle: $SUBTITLE"
echo "Content Header: $CONTENT_HEADER"
echo "Outro Message: $OUTRO_MESSAGE"

# Create output directory
mkdir -p ./test-output

echo "Running container..."
docker run --rm \
  -v $(pwd)/test-output:/usr/src/app/out \
  -e TITLE="$TITLE" \
  -e SUBTITLE="$SUBTITLE" \
  -e CONTENT_HEADER="$CONTENT_HEADER" \
  -e OUTRO_MESSAGE="$OUTRO_MESSAGE" \
  "$IMAGE_NAME:latest"

echo "✅ Video rendered successfully!"
echo "📁 Check the output in ./test-output/"
ls -la ./test-output/ 