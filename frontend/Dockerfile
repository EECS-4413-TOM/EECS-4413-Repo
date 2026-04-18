# Optional: standalone frontend image (output under /app/dist).
# Production uses the multi-stage build in ../nginx/Dockerfile.

FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build
