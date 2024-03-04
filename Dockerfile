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


# Command to run both frontend and backend servers
CMD ["npm", "run", "start", "--prefix", "server"]

EXPOSE 9000