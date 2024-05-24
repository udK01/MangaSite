# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY ../package.json ../package-lock.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image.
COPY server/ .

# Expose the port your app runs on
EXPOSE 8080

# Run the web service on container startup.
CMD ["node", "server.js"]
