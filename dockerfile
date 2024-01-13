FROM node

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV VITE_APP_API_URL='http://localhost:5000/'

# Copy package.json (and potentially other configuration files)
COPY package.json .

# Install dependencies using pnpm
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm i vite

# Copy local code to the container
COPY . .

# Expose the specified port
EXPOSE $PORT

# Command to run your application
CMD ["pnpm", "start"]


