# Remotion Docker Template

A dockerized Remotion template for creating animated videos. Generates a 15-second "Hello World" animation with atomic design components.

📖 **[Read the complete developer guide](https://www.scotthavird.com/blog/remotion-docker-template)** - Learn about building scalable video generation pipelines with Remotion, Docker, and GitHub Actions.

## Quick Start

### Prerequisites
- Docker & Docker Compose

### 1. Clone Repository
```bash
git clone https://github.com/scotthavird/remotion-docker-template
cd remotion-docker-template
```

### 2. Development Mode
```bash
# Start Remotion Studio with hot reload
docker-compose up remotion-dev

# Open http://localhost:3000
```

### 3. Render Video
```bash
# Generate video
docker-compose up remotion-render

# Output: ./out/HelloWorld.mp4
```

### Local Development (Alternative)
```bash
pnpm install
pnpm dev    # Start studio
pnpm render # Render video
```

## GitHub Actions & Container Registry

### Quick Setup (2 minutes)
1. **Enable Container Registry**: Settings → Packages → "Inherit access from source repository"
2. **Push to main**: `git push origin main` (triggers first build)
3. **Use Actions**: Go to Actions tab → "Render Video" → "Run workflow"

### Automated Workflows
1. **Build & Publish**: Pushes Docker image to `ghcr.io/{username}/{repository}` on main branch
2. **Render Video**: Manual video generation with customizable parameters

### Usage
1. Go to **Actions** tab → **"Render Video"** 
2. Click **"Run workflow"** 
3. Customize parameters (title, subtitle, etc.)
4. Download from artifacts or releases

### Container Registry Setup
- Enable in Settings → Packages
- Create PAT with `write:packages` permission for local pushing

## What's Included

- **Components**: Atomic design (atoms → molecules → organisms)  
- **Docker**: Development and render containers
- **GitHub Actions**: Automated building and rendering
- **Visual Editing**: Real-time prop editing in Remotion Studio
- **TypeScript**: Full type safety

## Scripts
- `./scripts/build-and-push.sh` - Build/push Docker image
- `./scripts/test-local.sh` - Test container locally

## Cursor Rules

This project includes Cursor rules to enhance AI-assisted development:

- **Project Structure** (`.cursor/rules/project-structure.mdc`) - Overview of the codebase architecture
- **Remotion Components** (`.cursor/rules/remotion-components.mdc`) - Component development patterns and atomic design
- **GitHub Actions** (`.cursor/rules/github-actions.mdc`) - Workflow development and automation patterns
- **Docker Development** (`.cursor/rules/docker-development.mdc`) - Container development and deployment patterns

These rules help Cursor understand the project structure, coding patterns, and development workflows for better AI assistance.

**Built with [Remotion](https://remotion.dev) 🎬**
