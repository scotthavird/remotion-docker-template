FROM node:22-bookworm-slim

# Install Chrome dependencies
RUN apt-get update
RUN apt install -y \
  libnss3 \
  libdbus-1-3 \
  libatk1.0-0 \
  libgbm-dev \
  libasound2 \
  libxrandr2 \
  libxkbcommon-dev \
  libxfixes3 \
  libxcomposite1 \
  libxdamage1 \
  libatk-bridge2.0-0 \
  libpango-1.0-0 \
  libcairo2 \
  libcups2

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package.json ./

# Use npm with legacy peer deps to resolve dependency conflicts
RUN npm install --legacy-peer-deps

# Copy source code after dependencies are installed
COPY src ./src
COPY tsconfig.json ./
COPY remotion.config.ts ./

# Install Chrome Headless Shell
RUN npx remotion browser ensure

# Copy render script
COPY render.mjs render.mjs

# Create output directory with proper permissions
RUN mkdir -p /usr/src/app/out && chmod 777 /usr/src/app/out

# Create non-root user (Debian syntax)
RUN groupadd -r nodejs --gid=1001
RUN useradd -r -g nodejs --uid=1001 --home-dir=/usr/src/app --shell=/bin/bash nodejs

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Run the render script
CMD ["node", "render.mjs"] 