##################
## FIRST STAGE  ##
##################

FROM --platform=linux/amd64 node:16 AS builder

WORKDIR /app

# Copy the package info into the Docker image
COPY package.json package-lock.json ./

# Install the node modules
RUN npm install

# Copy the rest of the source code
COPY . .

# Check for a VITE_API_URL build arg (this is if you want to check the api that the frontend calls - useful for development).
ARG VITE_API_URL

# Build the React app
RUN npm run build

##################
## SECOND STAGE ##
##################

FROM --platform=linux/amd64 nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default files
RUN rm -rf ./*

COPY --from=builder /app/dist/ ./

# Expose the UI port (optional)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
