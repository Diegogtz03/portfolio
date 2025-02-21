# Use the official Bun image
FROM oven/bun:1

# Set working directory
# WORKDIR /app

# Copy package files
COPY package.json .
COPY bun.lockb .

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN bun run build

# Start the application
CMD ["bun", "run", "start"]

# Expose the port the app runs on
EXPOSE 3200