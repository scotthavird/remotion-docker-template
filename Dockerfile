FROM node:22-bookworm-slim

# Chrome dependencies for headless rendering (per Remotion's Docker docs)
RUN apt-get update && apt-get install -y \
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
  libcups2 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY src ./src
COPY public ./public
COPY tsconfig.json ./
COPY remotion.config.ts ./

RUN npx remotion browser ensure

COPY render.mjs render.mjs

RUN mkdir -p /usr/src/app/out && chmod 777 /usr/src/app/out

RUN groupadd -r nodejs --gid=1001 \
  && useradd -r -g nodejs --uid=1001 --home-dir=/usr/src/app --shell=/bin/bash nodejs \
  && chown -R nodejs:nodejs /usr/src/app
USER nodejs

CMD ["node", "render.mjs"]
