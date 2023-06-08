# Use the official Node.js 20 Alpine base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the entire project directory to the container
COPY . .

# Expose the desired port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
