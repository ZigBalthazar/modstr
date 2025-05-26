# Base stage with npm setup
FROM node:23.11.1-slim AS base
WORKDIR /app

# Production dependencies stage
FROM base AS prod-deps
COPY package.json package-lock.json ./
# Install only production dependencies
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev --ignore-scripts

# Build stage - install all dependencies and build
FROM base AS build
COPY package.json package-lock.json ./
# Install all dependencies (including dev dependencies)
RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts
COPY . .
RUN npm run build

# Final stage - combine production dependencies and build output
FROM node:23.11.1-alpine AS runner
WORKDIR /app
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

# Use the node user from the image
USER node

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["node", "dist/index.js"]
