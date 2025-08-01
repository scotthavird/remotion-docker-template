FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install --prod

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Expose port (if needed for web applications)
# EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 