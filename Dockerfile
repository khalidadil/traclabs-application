# Meteor 1.3-beta.16 Dockerfile
FROM ubuntu:14.04

# Set environment variables
ENV METEOR_VERSION=1.3-beta.16 \
    NODE_VERSION=0.10.43 \
    NPM_VERSION=2.15.1 \
    METEOR_ALLOW_SUPERUSER=1 \
    METEOR_DISABLE_OPTIMISTIC_CACHING=1 \
    ROOT_URL=http://localhost:3000 \
    PORT=3000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    python \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz"

# Install specific npm version
RUN npm install -g npm@$NPM_VERSION

# Install Meteor
RUN curl -SL "https://warehouse.meteor.com/bootstrap/$METEOR_VERSION" | tar -xzf - -C /usr/local --strip-components=1

# Create app directory
WORKDIR /app

# Copy package.json first for better caching
COPY package.json ./

# Install npm dependencies
RUN npm install --production

# Copy application code
COPY . .

# Build Meteor application
RUN meteor build /tmp/build --directory --server-only --allow-superuser

# Move built application
RUN cp -r /tmp/build/bundle/* /app/ && rm -rf /tmp/build

# Install production dependencies for built app
WORKDIR /app/programs/server
RUN npm install --production

# Return to app root
WORKDIR /app

# Create startup script
RUN echo '#!/bin/bash\n\
export PORT=${PORT:-3000}\n\
export ROOT_URL=${ROOT_URL:-http://localhost:$PORT}\n\
export METEOR_SETTINGS=${METEOR_SETTINGS:-"{}"}\n\
exec node main.js' > start.sh && chmod +x start.sh

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:$PORT/ || exit 1

# Start the application
CMD ["./start.sh"]