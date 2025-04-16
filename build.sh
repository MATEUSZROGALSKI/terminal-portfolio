#!/bin/bash
set -e

# Build script for creating a minimal production Docker image
echo "🚀 Starting production build process..."

# Define image name and tag
IMAGE_NAME="portfolio"
IMAGE_TAG="production"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Create optimized Dockerfile for production
cat > Dockerfile.production << 'EOF'
# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Mock MongoDB environment variables for build
ENV MONGODB_URI=mongodb://localhost:27017
ENV MONGODB_DB=portfolio
# Build the application
RUN npm run build

# Stage 3: Runner (minimal production image)
FROM node:22-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set the command to run the optimized application
CMD ["node", "server.js"]
EOF

# Update next.config.js to enable standalone output
echo "📝 Updating Next.js configuration for optimized build..."
if grep -q "output: 'standalone'" next.config.js; then
    echo "✅ Next.js already configured for standalone output."
else
    # Create a backup of the original config
    cp next.config.js next.config.js.bak

    # Update the config to add standalone output
    cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
EOF
    echo "✅ Next.js configuration updated."
fi

# Build the Docker image
echo "🔨 Building optimized Docker image..."
docker build -f Dockerfile.production -t ${IMAGE_NAME}:${IMAGE_TAG} .

# Get image size
IMAGE_SIZE=$(docker images ${IMAGE_NAME}:${IMAGE_TAG} --format "{{.Size}}")
echo "✅ Build complete! Image size: ${IMAGE_SIZE}"

# Provide instructions for running the image
echo ""
echo "📋 To run the image, use:"
echo "docker run -p 3000:3000 ${IMAGE_NAME}:${IMAGE_TAG}"
echo ""
echo "🔍 To inspect the image layers and size details:"
echo "docker history ${IMAGE_NAME}:${IMAGE_TAG}"
