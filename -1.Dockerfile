# --- Stage 1: Build the React Application ---
# Use an official Node.js runtime as a parent image.
# 'alpine' is a lightweight version of Linux, good for smaller image sizes.
FROM node:20-alpine AS build

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's layer caching.
# This step will only be re-run if these files change.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy the rest of the application's source code into the container.
COPY . .

# Build the application for production. This will create a 'dist' folder.
# The 'build' script is defined in your package.json.
RUN npm run build


# --- Stage 2: Serve the Application with Nginx ---
# Use a lightweight Nginx image to serve the static files.
FROM nginx:alpine

# Copy the static build files from the 'build' stage to the Nginx public HTML directory.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to allow incoming traffic to the Nginx server.
EXPOSE 80

# The default command to start Nginx when the container launches.
# 'daemon off;' ensures Nginx runs in the foreground, which is standard practice for containers.
CMD ["nginx", "-g", "daemon off;"]