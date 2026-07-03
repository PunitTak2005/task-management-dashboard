# Dockerfile
# Multi-stage build for Next.js app

# ---- Builder Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (including devDeps for building)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source files
COPY . .

# Generate Prisma client and build the app
RUN npx prisma generate
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

# Expose port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
