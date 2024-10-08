# Use the official Node.js image as the base image
FROM node:20-alpine as base

# Set the working directory inside the container
WORKDIR /app


FROM base as builder

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

FROM base as production

# Set the environment
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY assets ./assets
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
