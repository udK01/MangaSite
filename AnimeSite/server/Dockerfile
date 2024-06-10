# Use the official Node.js image.
FROM node:14

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Set environment variables.
ENV PORT=8080

# Expose the backend port.
EXPOSE 8080

# Start the backend server.
CMD ["node", "server.js"]
