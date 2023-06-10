# Choose a base image
FROM node:18

# Set working directory
WORKDIR /backend

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the listening port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
