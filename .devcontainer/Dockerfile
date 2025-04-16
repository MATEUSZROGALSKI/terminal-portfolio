FROM node:22

# Set working directory
WORKDIR /workspace

# Install common development tools and dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git procps lsb-release \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g npm@latest next@latest

# Set permissions
RUN mkdir -p /home/node/.vscode-server/extensions \
    && chown -R node:node /home/node

# Set bash as default shell
ENV SHELL=/bin/bash

# Switch to non-root user
USER node

# Keep container running
CMD ["sleep", "infinity"] 