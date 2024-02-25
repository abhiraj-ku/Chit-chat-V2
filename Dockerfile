FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files for both client and server
COPY Client/package*.json Client/
COPY server/package*.json server/

# Install client dependencies
RUN npm install --prefix Client

# Install server dependencies
RUN npm install --prefix server

# Copy all the files from the client directory
COPY Client/ Client/

# Build the client
RUN npm run build --prefix Client

# Copy all the files from the server directory
COPY server/ server/

# Expose port 5173 for the frontend
EXPOSE 5173

# Expose port 3000 for the backend (assuming it's already configured to run on port 3000)
EXPOSE 3000

# Command to run both frontend and backend servers
CMD ["npm", "run", "start", "--prefix", "server"]
