#!/bin/bash

# Status Check for Remotion Docker Template
# Shows current setup and available workflows

set -e

echo "🔍 Remotion Docker Template Status"
echo "=================================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository"
    exit 1
fi

# Get repository info
REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\).*/\1/')

echo "📋 Repository: $REPO_NAME"
echo ""

# Check for GitHub Actions workflows
echo "📋 GitHub Actions Workflows:"
if [ -d ".github/workflows" ]; then
    echo "✅ .github/workflows/ directory exists"
    
    workflows=($(ls .github/workflows/*.yml 2>/dev/null || echo ""))
    if [ ${#workflows[@]} -gt 0 ]; then
        echo "✅ Found ${#workflows[@]} workflow(s):"
        for workflow in "${workflows[@]}"; do
            echo "   - $(basename $workflow)"
        done
    else
        echo "❌ No workflow files found"
    fi
else
    echo "❌ .github/workflows/ directory not found"
fi
echo ""

# Check for Dockerfile
echo "🐳 Docker Setup:"
if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile exists"
else
    echo "❌ Dockerfile not found"
fi

if [ -f "render.mjs" ]; then
    echo "✅ render.mjs exists"
else
    echo "❌ render.mjs not found"
fi
echo ""

# Check for scripts
echo "📜 Available Scripts:"
scripts=($(ls scripts/*.sh 2>/dev/null || echo ""))
if [ ${#scripts[@]} -gt 0 ]; then
    echo "✅ Found ${#scripts[@]} script(s):"
    for script in "${scripts[@]}"; do
        echo "   - $(basename $script)"
    done
else
    echo "❌ No scripts found in scripts/ directory"
fi
echo ""

# Check Docker image
echo "🐳 Docker Image Status:"
REGISTRY="ghcr.io"
IMAGE_NAME="$REGISTRY/$REPO_NAME"

if docker images | grep -q "$IMAGE_NAME"; then
    echo "✅ Local Docker image exists: $IMAGE_NAME"
    docker images | grep "$IMAGE_NAME"
else
    echo "❌ Local Docker image not found: $IMAGE_NAME"
    echo "   Run: ./scripts/build-and-push.sh"
fi
echo ""

# Check GitHub Container Registry
echo "📦 GitHub Container Registry:"
echo "   Registry URL: https://github.com/$REPO_NAME/packages"
echo "   Image: $IMAGE_NAME"
echo ""

# Show next steps
echo "🚀 Next Steps:"
echo ""

if [ ! -d ".github/workflows" ] || [ ${#workflows[@]} -eq 0 ]; then
    echo "1. 📋 Set up GitHub Actions workflows:"
    echo "   - Copy .github/workflows/ files to your repository"
    echo "   - Push to trigger first build"
fi

echo "2. 🐳 Build and push Docker image:"
echo "   ./scripts/build-and-push.sh"

echo "3. 🧪 Test locally:"
echo "   ./scripts/test-local.sh"

echo "4. 📹 Render video in GitHub Actions:"
echo "   - Go to: https://github.com/$REPO_NAME/actions"
echo "   - Select 'Render Video' workflow"
echo "   - Click 'Run workflow'"

echo "5. 📚 Read documentation:"
echo "   - docs/GITHUB_ACTIONS_SETUP.md"
echo "   - README.md"

echo ""
echo "✅ Setup complete! Your repository is ready for automated video rendering." 