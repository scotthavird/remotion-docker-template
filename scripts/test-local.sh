#!/bin/bash
# Test the Docker render container locally.
#
# Usage:
#   ./scripts/test-local.sh [composition_id] [title] [subtitle] [content_header] [outro_message]
#
# Examples:
#   ./scripts/test-local.sh
#   ./scripts/test-local.sh TransitionsDemo
#   ./scripts/test-local.sh CaptionsDemo
#   ./scripts/test-local.sh HelloWorld "Custom Title" "Custom Subtitle"
#
# Override transitions/captions inputs via env:
#   SCENE_ONE_TEXT=A SCENE_TWO_TEXT=B SCENE_THREE_TEXT=C ./scripts/test-local.sh TransitionsDemo
#   SRT_PATH=captions/my.srt ./scripts/test-local.sh CaptionsDemo
set -e

REPO_NAME=$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\/[^/]*\).*/\1/' | sed 's/\.git$//')
REGISTRY="ghcr.io"
IMAGE_NAME="$REGISTRY/$REPO_NAME"

COMPOSITION_ID="${1:-HelloWorld}"
TITLE="${2:-Hello World}"
SUBTITLE="${3:-Welcome to Remotion}"
CONTENT_HEADER="${4:-Discover More}"
OUTRO_MESSAGE="${5:-Thank You!}"

echo "Testing Docker container locally"
echo "  Composition: $COMPOSITION_ID"
echo "  Title:       $TITLE"
echo "  Subtitle:    $SUBTITLE"

mkdir -p ./test-output

docker run --rm \
  -v "$(pwd)/test-output:/usr/src/app/out" \
  -v "$(pwd)/public:/usr/src/app/public" \
  -e COMPOSITION_ID="$COMPOSITION_ID" \
  -e TITLE="$TITLE" \
  -e SUBTITLE="$SUBTITLE" \
  -e CONTENT_HEADER="$CONTENT_HEADER" \
  -e OUTRO_MESSAGE="$OUTRO_MESSAGE" \
  -e SCENE_ONE_TEXT="${SCENE_ONE_TEXT:-Welcome}" \
  -e SCENE_TWO_TEXT="${SCENE_TWO_TEXT:-Built with Remotion}" \
  -e SCENE_THREE_TEXT="${SCENE_THREE_TEXT:-Render Anywhere}" \
  -e SRT_PATH="${SRT_PATH:-captions/sample.srt}" \
  "$IMAGE_NAME:latest"

echo "Render complete. Output:"
ls -la ./test-output/
