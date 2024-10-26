FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create a smaller production image

FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --omit=dev




# # Set default environment variables for dynamic configuration
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE ${PORT}

CMD ["node", "dist/main"]