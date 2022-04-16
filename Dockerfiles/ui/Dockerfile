# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default files
RUN rm -rf ./*

# Copy the rest of the source code
COPY dist/ .

# Expose the UI port (optional)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
