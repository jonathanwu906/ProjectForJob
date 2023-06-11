# Choose a base image
FROM node:18 as build

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

FROM nginx
COPY --from=build /frontend/dist /usr/share/nginx/html