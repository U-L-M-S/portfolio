# Use the official Nginx image from the Docker Hub
FROM nginx:latest

# Install git
RUN apt-get update && apt-get install -y git

# Clone the repository
RUN git clone https://github.com/your-username/your-repository.git /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

