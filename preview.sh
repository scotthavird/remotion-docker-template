#!/bin/bash

# Remotion Docker Template - Preview Script
# Opens the generated video with the default system video player

VIDEO_FILE="./out/HelloWorld.mp4"

if [ -f "$VIDEO_FILE" ]; then
    echo "🎬 Opening video: $VIDEO_FILE"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$VIDEO_FILE"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open "$VIDEO_FILE"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        # Windows
        start "$VIDEO_FILE"
    else
        echo "⚠️  Please open $VIDEO_FILE manually with your video player"
    fi
else
    echo "❌ Video file not found: $VIDEO_FILE"
    echo "💡 Run 'docker compose up remotion-render' to generate the video"
fi 