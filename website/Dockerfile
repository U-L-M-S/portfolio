# Use the official Nginx image from the Docker Hub
FROM nginx:latest

# Copy website content to the nginx html directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

