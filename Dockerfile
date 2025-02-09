# Base image
FROM node:20

# Set working directory
WORKDIR ./

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Expose backend port
EXPOSE 3000

# Start server
CMD ["npm", "run", "dev"]
