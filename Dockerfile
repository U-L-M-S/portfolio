# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the contents of your website directory into the Nginx HTML directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
