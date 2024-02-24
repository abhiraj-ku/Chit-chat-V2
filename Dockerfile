FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

# Install client dependencies
COPY Client/package*.json client/
RUN npm install --prefix client

# Install server dependencies
COPY server/package*.json server/
RUN npm install --prefix server

# Build client
COPY Client/ client/
RUN npm run build --prefix client

# Copy server code
COPY server/ server/

# Set the user to non-root
USER node

# Command to run the server
CMD ["npm", "start", "--prefix", "server"]

# Expose port 3000
EXPOSE 3000
