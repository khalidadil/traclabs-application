# Legacy Meteor 1.3-beta.6 Dockerfile
# Uses archived Meteor installation
FROM ubuntu:14.04

# Set environment variables
ENV METEOR_VERSION=1.3-beta.6 \
    NODE_VERSION=0.10.40 \
    NPM_VERSION=2.14.1 \
    METEOR_ALLOW_SUPERUSER=1 \
    ROOT_URL=http://localhost:3000 \
    PORT=3000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    python \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (compatible with Meteor 1.3-beta.6)
RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz"

# Install specific npm version
RUN npm install -g npm@$NPM_VERSION

# Install Meteor using the universal installer and then downgrade
RUN curl https://install.meteor.com/ | sh

# Add Meteor to PATH  
ENV PATH="/root/.meteor:$PATH"

# Try to switch to the specific version (may not work for very old betas)
RUN meteor update --release $METEOR_VERSION || \
    (echo "WARNING: Meteor 1.3-beta.6 not available, using closest stable version" && \
     meteor update --release 1.3.5.1)

WORKDIR /app

# Copy package.json first for better caching
COPY package.json ./

# Install npm dependencies with legacy flags for old npm
RUN npm install --production --legacy-peer-deps || npm install --production

# Copy application code
COPY . .

# Build application with error handling
RUN if [ -f "/usr/local/meteor/bin/meteor" ]; then \
    meteor build /tmp/build --directory --server-only --allow-superuser || \
    (echo "Build failed, attempting with --unsafe-perm" && \
     meteor build /tmp/build --directory --server-only --allow-superuser --unsafe-perm); \
    else \
    echo "ERROR: Meteor not found. Cannot build application."; \
    exit 1; \
    fi

# Move built application
RUN if [ -d "/tmp/build/bundle" ]; then \
    cp -r /tmp/build/bundle/* /app/ && rm -rf /tmp/build; \
    else \
    echo "ERROR: Build output not found"; \
    exit 1; \
    fi

# Install production dependencies for built app
WORKDIR /app/programs/server
RUN npm install --production --legacy-peer-deps || npm install --production

# Return to app root
WORKDIR /app

# Create startup script
RUN echo '#!/bin/bash\n\
export PORT=${PORT:-3000}\n\
export ROOT_URL=${ROOT_URL:-http://localhost:$PORT}\n\
export METEOR_SETTINGS=${METEOR_SETTINGS:-"{}"}\n\
echo "Starting Meteor app..."\n\
echo "ROOT_URL: $ROOT_URL"\n\
echo "PORT: $PORT"\n\
exec node main.js' > start.sh && chmod +x start.sh

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:$PORT/ || exit 1

# Start the application
CMD ["./start.sh"]