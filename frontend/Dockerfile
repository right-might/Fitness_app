# Stage 1: Build Angular Application
FROM node:20.11.0-alpine3.18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project to the container
COPY . .

# Build the Angular app for production
RUN npm run build --base-href=/ --prod

RUN npm prune --production

# Stage 2: Serve Angular Application with NGINX
FROM nginx:1.21.5-alpine

# Copy built Angular application from previous stage
COPY --from=builder /app/dist/inm5151/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
