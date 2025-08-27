# Update to match your Playwright version
FROM mcr.microsoft.com/playwright:v1.55.0-noble-amd64

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

EXPOSE 3000

CMD ["node", "server/server.js"]
