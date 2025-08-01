#!/bin/bash

# Setup GitHub Container Registry and Permissions
# This script helps configure the repository for GitHub Container Registry

set -e

echo "🚀 Setting up GitHub Container Registry for Remotion Docker Template"
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from your repository root"
    exit 1
fi

# Get repository info
REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\).*/\1/')

echo "📋 Repository: $REPO_NAME"
echo ""

echo "🔧 Setup Steps:"
echo ""

echo "1. 📦 Enable GitHub Container Registry:"
echo "   - Go to: https://github.com/$REPO_NAME/settings/packages"
echo "   - Ensure 'Inherit access from source repository' is enabled"
echo ""

echo "2. 🔑 Create Personal Access Token (for local pushing):"
echo "   - Go to: https://github.com/settings/tokens"
echo "   - Click 'Generate new token (classic)'"
echo "   - Select 'write:packages' permission"
echo "   - Copy the token (you'll need it for Docker login)"
echo ""

echo "3. 🐳 Login to GitHub Container Registry:"
echo "   Run: docker login ghcr.io"
echo "   Username: your-github-username"
echo "   Password: your-personal-access-token"
echo ""

echo "4. 🚀 Push to trigger first build:"
echo "   git add ."
echo "   git commit -m 'Add GitHub Actions workflows'"
echo "   git push origin main"
echo ""

echo "5. 📹 Test video rendering:"
echo "   - Go to: https://github.com/$REPO_NAME/actions"
echo "   - Select 'Render Video' workflow"
echo "   - Click 'Run workflow'"
echo ""

echo "✅ Setup complete! Your repository is now configured for:"
echo "   - Automated Docker image builds"
echo "   - GitHub Container Registry publishing"
echo "   - Video rendering in GitHub Actions"
echo "   - Artifact storage and releases"
echo ""

echo "📚 Next steps:"
echo "   - Customize video parameters in the workflow"
echo "   - Set up scheduled rendering if needed"
echo "   - Configure notifications for completed renders" 