# node-docker-template

Bare bones dockerized starter for Node.js applications using pnpm.

## Features

- Node.js 18 Alpine-based Docker container
- pnpm package manager for faster, more efficient dependency management
- Environment variable configuration
- Docker Compose setup for easy development
- Non-root user for security
- Hot reload with nodemon in development

## Prerequisites

- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [pnpm](https://pnpm.io/installation) (for local development)

## Quick Start

1. **Clone and navigate to the project:**
   ```bash
   cd node-docker-template
   ```

2. **Copy the environment example file:**
   ```bash
   cp env.example .env
   ```

3. **Configure your environment variables in `.env`:**
   ```bash
   # Application Configuration
   APP_NAME=My App
   PORT=3000
   
   # Node.js Configuration
   NODE_ENV=development
   ```

4. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

## Development

### Local Development with pnpm

1. **Install pnpm (if not already installed):**
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run in development mode:**
   ```bash
   pnpm run dev
   ```

4. **Run in production mode:**
   ```bash
   pnpm start
   ```

### Docker Development

1. **Build the image:**
   ```bash
   docker build -t node-docker-template .
   ```

2. **Run the container:**
   ```bash
   docker run --env-file .env node-docker-template
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `APP_NAME` | Application name | No | World |
| `PORT` | Application port | No | 3000 |
| `NODE_ENV` | Node.js environment | No | development |

## Project Structure

```
node-docker-template/
├── src/
│   └── index.js          # Main application file
├── package.json          # Node.js dependencies and scripts
├── pnpm-lock.yaml        # pnpm lockfile (auto-generated)
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── env.example          # Environment variables example
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Why pnpm?

- **Faster installations** - Up to 2x faster than npm
- **Disk space efficient** - Uses hard links and symlinks to save space
- **Strict dependency resolution** - Prevents phantom dependencies
- **Better monorepo support** - Built-in workspace features

## Customization

This template provides a minimal foundation that can be easily extended:

1. **Add your application logic** to `src/index.js`
2. **Add dependencies** with `pnpm add <package>`
3. **Add dev dependencies** with `pnpm add -D <package>`
4. **Modify the Dockerfile** for specific requirements
5. **Update environment variables** as needed

## Common Commands

```bash
# Install dependencies
pnpm install

# Add a dependency
pnpm add express

# Add a dev dependency
pnpm add -D nodemon

# Run scripts
pnpm start
pnpm dev

# Build and run with Docker
docker-compose up --build

# Build Docker image only
docker build -t node-docker-template .
```

## Security

- Uses non-root user in Docker container
- Environment variables for configuration
- Alpine Linux base image for smaller attack surface
- Production-ready configuration

## License

MIT
