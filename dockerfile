FROM node

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV VITE_APP_API_URL='http://localhost:5000/'
# Copy package.json 
COPY package.json .
# Copy local code to the container
COPY . .
# Install dependencies using pnpm
RUN npm i -g pnpm
RUN npm install

# Expose the specified port
EXPOSE $PORT

# Command to run your application
CMD ["pnpm", "start"]

