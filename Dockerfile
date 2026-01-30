# Base image
FROM node:25-alpine

# Set working directory
WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/

# Install server deps
RUN cd server && npm install

# Copy client package files
COPY client/package*.json ./client/

# Install client deps
RUN cd client && npm install

# Copy all source code
COPY . .

# Build React app
RUN cd client && npm run build

# Setting environment variable
ENV NODE_ENV=production

# Expose port
EXPOSE 5000

# Start Express server
CMD ["node", "server/server.js"]