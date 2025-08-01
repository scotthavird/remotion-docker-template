# Remotion Docker Template

A dockerized Remotion template for creating animated videos. Generates a 15-second "Hello World" animation with atomic design components.

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

### Automated Workflows
1. **Build & Publish**: Pushes Docker image to `ghcr.io/{username}/{repository}` on main branch
2. **Render Video**: Manual or daily scheduled video generation

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

**Built with [Remotion](https://remotion.dev) 🎬**
