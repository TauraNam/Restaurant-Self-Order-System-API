# Base image
FROM node:20

# Set working directory
WORKDIR /src

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expose backend port
EXPOSE 8080

# Start server
CMD ["npm", "run", "dev"]
