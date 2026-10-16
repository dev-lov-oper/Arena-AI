# ==============================================================================
# Production Dockerfile for Arena AI (Vite React + Express Node.js + SQLite)
# Node.js 22 is required for built-in node:sqlite (DatabaseSync)
# ==============================================================================

FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies for Vite build)
RUN npm ci

# Copy full source tree
COPY . .

# Build production bundle to /app/dist
RUN npm run build

# Prune devDependencies to reduce image size
RUN npm prune --omit=dev

# ------------------------------------------------------------------------------
# Production Runner Image
# ------------------------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV DATA_DIR=/data
ENV DB_PATH=/data/arena.sqlite

# Create persistent storage directory for SQLite database
RUN mkdir -p /data && chown -R node:node /data /app

# Copy production node_modules from builder
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/server.js ./server.js

# Switch to non-root node user for security
USER node

# Expose internal port
EXPOSE 3001

# Volume for database persistence
VOLUME ["/data"]

# Healthcheck to ensure server and SQLite are operational
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:3001/api/health || exit 1

CMD ["node", "server.js"]
